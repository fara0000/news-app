import React, { useState } from 'react'
import {
    Text, View, TextInput,
    TouchableOpacity, ScrollView, ActivityIndicator, Alert
} from 'react-native'
import { styles } from './styles'
import { useNavigation, useTheme } from '@react-navigation/native'
import * as yup from 'yup';
import Icon from "react-native-vector-icons/dist/Ionicons";
import { Formik } from 'formik';
import { showSnackbar } from '../../../Utils/Snackbar'
import { signupUser } from '../../../EndPoints/Auth'
import { connect } from 'react-redux'
import * as authActions from '../../../redux/Actions/authActions';
import PropTypes from 'prop-types';


const signInValidationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Name is required'),
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email is required'),
    password: yup
        .string()
        .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
        .matches(/\d/, 'Password must have a number')
        .matches(
            /[!@#$%^&*()\-_"=+{}; :,<.>]/,
            'Password must have a special character',
        )
        .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
        .required('Password is required'),
});




const Register = ({ ...props }) => {
    const navigation = useNavigation()
    const [showSpinner, setShowSpinner] = useState(false);
    const { colors: { background, card, text, primary, secondary }, dark } = useTheme();
    const { updateUserLogin, user, isloggedIn } = props;

    const [showPassword, setShowPassword] = useState(true);


    return (
        <View style={styles(background, text).loginMain}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles().headerContainer}>
                    <Text style={styles(background, text).welcomeText}>
                        Create Account,
                    </Text>
                    <Text style={styles().signInText}>
                        Sign up to get started
                    </Text>
                </View>

                <View style={styles().formContainer}>
                    <Formik
                        validationSchema={signInValidationSchema}
                        initialValues={{
                            name: '',
                            email: '',
                            password: ''
                        }}
                        onSubmit={async (values) => {
                            setShowSpinner(true)

                            try {
                                const user = await signupUser(values)
                                // updateUserLogin(user, true)
                                setShowSpinner(false)
                                Alert.alert(
                                    " ",
                                    user.msg,
                                    [
                                        {
                                            text: 'Ok',
                                            // onPress: () => navigation.navigate('Login')
                                        }
                                    ]
                                )
                            } catch (error) {
                                setShowSpinner(false)

                                console.log("Error: ", error.response)

                                showSnackbar(error.response.data.msg, 'ERROR')
                            }
                        }}>
                        {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (
                            <>
                                <View style={styles().inputContainer}>
                                    <View style={styles().wrapper}>

                                        <TextInput
                                            style={styles(background, text, primary, dark, card).input}
                                            name="name"
                                            onChangeText={handleChange('name')}
                                            placeholder="Enter Name"
                                            placeholderTextColor={text}
                                        />

                                        {(errors.name && touched.name) &&
                                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                                        }

                                    </View>

                                    <View style={styles().wrapper}>
                                        <TextInput
                                            style={styles(background, text).input}
                                            name="email"
                                            keyboardType="email-address"
                                            onChangeText={handleChange('email')}
                                            placeholder="Enter Email"
                                            placeholderTextColor={text}
                                        />

                                        {(errors.email && touched.email) &&
                                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                        }

                                    </View>

                                    <View style={styles().wrapper}>
                                        <View
                                            style={[styles(background, text, primary, dark, card).input]}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ width: '90%' }}>
                                                    <TextInput
                                                        name="password"
                                                        secureTextEntry={showPassword}
                                                        onChangeText={handleChange('password')}
                                                        style={{ color: text }}
                                                        ref={(input) => { passRef = input; }}
                                                        placeholder="Enter Password"
                                                        placeholderTextColor={text}
                                                    />
                                                </View>

                                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
                                                    setShowPassword(prevState => !prevState);
                                                    // !passRef.focus() && passRef.focus();
                                                }} >
                                                    <Icon
                                                        name={showPassword ? "key-outline" : "key"}
                                                        size={20}
                                                        color={text}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {(errors.password && touched.password) &&
                                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                        }
                                    </View>

                                </View>

                                <View style={styles().btnContainer}>
                                    <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: dark ? card : secondary, height: 50, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#fff', marginRight: 5 }}>
                                            Register
                                        </Text>
                                        {showSpinner && (<ActivityIndicator color={text} />)}

                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>


                </View>

                <View style={styles().footerContainer}>
                    <Text style={styles(background, text).newUserText}>
                        I am already  a member.
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles(background, text, primary, dark).signText}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    )
}


Register.propTypes = {
    updateUserLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    isloggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isloggedIn: state.auth.isloggedIn
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateUserLogin: (user, isloggedIn) => dispatch(authActions.updateUserLogin(user, isloggedIn)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);
