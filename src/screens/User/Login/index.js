import React, { useState } from 'react'
import {
    Text, View, TextInput,TouchableOpacity, ScrollView,
     Image, ActivityIndicator, Alert
} from 'react-native'
import { styles } from './styles'
import { COLORS } from '../../../constants/index'
import { useNavigation } from '@react-navigation/native'
import * as yup from 'yup';
import { useTheme } from "@react-navigation/native";
import { Formik, Field } from 'formik';
import { showSnackbar } from '../../../Utils/Snackbar'
import { loginUser } from '../../../EndPoints/Auth'
import { connect } from 'react-redux'
import * as authActions from '../../../redux/Actions/authActions';
import PropTypes from 'prop-types';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { setAxiosConfig } from '../../../Utils/Axios/setAxios'
import Icon from "react-native-vector-icons/dist/Ionicons";


const signInValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter valid email')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
});

const Login = ({ ...props }) => {
    const navigation = useNavigation();
    const [showSpinner, setShowSpinner] = useState(false);
    const { updateUserLogin, user, isloggedIn } = props;
    const [googleLoader, setGoogleLoader] = useState(false)
    const [showPassword, setShowPassword] = useState(true);

    const { colors: { background, card, text, primary, secondary }, dark } = useTheme();
    const onGoogleButtonPress = async () => {
        try {
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            console.log("idToken", idToken)
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            console.log("googleCredential", googleCredential)
            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);

        } catch (error) {
            console.log(error.response);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert('Cancelled', 'INFO');
                setGoogleLoader(false);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert('In progress', 'INFO');
                setGoogleLoader(false);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert('Play services not available or outdated', 'ERR');
                setGoogleLoader(false);
            } else {
                Alert('Something went wrong , please try again', 'INFO');
                setGoogleLoader(false);
            }
        }
    }




    return (
        <View style={styles(background).loginMain}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles().headerContainer}>
                    <Text style={styles(background, text).welcomeText}>
                        Welcome,
                    </Text>
                    <Text style={styles().signInText}>
                        Sign in to access more features.
                    </Text>
                </View>

                <View style={styles().formContainer}>
                    <Formik
                        validationSchema={signInValidationSchema}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={async (values) => {
                            setShowSpinner(true)

                            try {
                                const user = await loginUser(values)
                                updateUserLogin(user, true)
                                setShowSpinner(false)
                                setAxiosConfig(user, true);
                                navigation.replace('Home');
                            } catch (error) {
                                setShowSpinner(false)

                                console.log("Error", error.response)
                                showSnackbar(error.response.data.msg, 'ERROR')
                            }
                        }}>
                        {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (
                            <>
                                <View style={styles().inputContainer}>
                                    <View style={styles().wrapper}>

                                        <TextInput
                                            style={styles(background, text, primary, dark, card).input}
                                            name="email"
                                            keyboardType="email-address"
                                            onChangeText={handleChange('email')}
                                            placeholderTextColor={text}
                                            placeholder="Enter Email"
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
                                                        style={{color: text}}
                                                        ref={(input) => { passRef = input; }}
                                                        placeholder="Enter Password"
                                                        placeholderTextColor={text}
                                                    />
                                                </View>

                                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {
                                                    setShowPassword(prevState => !prevState);
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


                                    <View style={styles().fogotPasswordContainer}>
                                        <Text style={styles().forgotPasswordText}>
                                            Forgot Password
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles().btnContainer}>
                                    <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: dark ? card : secondary, height: 50, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#fff', marginRight: 5 }}>
                                            Login
                                        </Text>
                                        {showSpinner && (<ActivityIndicator color={text} />)}

                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={onGoogleButtonPress} style={{ backgroundColor: COLORS.lightGray2, height: 50, borderRadius: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                                        <Image source={require('../../../assets/google_icon.png')} style={{ width: 20, height: 20, resizeMode: 'cover', alignSelf: 'center' }} />
                                        <Text style={{ color: '#000', fontWeight: 'bold', alignSelf: 'center', marginLeft: 15 }}>
                                            Sign in with Google
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>
                </View>

                <View style={styles().footerContainer}>
                    <View style={styles().footerContainerInner}>
                        <Text style={styles(background, text, primary, dark).newUserText}>
                            I am new user,
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles(background, text, primary, dark).signText}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text style={{ color: COLORS.lightGray5 }}>
                                Skip
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

Login.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

