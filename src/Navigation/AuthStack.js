import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/User/Login'
import Register from '../screens/User/Register'
import CategoryList from '../screens/CategoryList';
import NewsDetails from '../screens/NewsDetails';
import OnboardingScreen from '../screens/User/Onboarding';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from './tabs';
import SplashScreen from '../screens/User/SplashScreen';

const AuthStack = ({...props}) => {
    const Stack = createStackNavigator();

    const { onboardingStatus } = props;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={onboardingStatus ? 'Splash' : 'Onboarding'}>
            <Stack.Screen name="Splash" component={SplashScreen} />

            <Stack.Screen name="Onboarding" component={OnboardingScreen} />

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />

            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="CategoryList" component={CategoryList} />
            <Stack.Screen name="NewsDetails" component={NewsDetails} />
            
        </Stack.Navigator>

    )
}


AuthStack.propTypes = {
    onboardingStatus: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
    return {
        onboardingStatus: state.auth.onboardingStatus
    }
}
const mapDispatchToProps = (dispatch) => ({
   
});




export default connect(mapStateToProps, mapDispatchToProps)(AuthStack);