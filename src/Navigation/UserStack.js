import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './tabs';
import CategoryList from '../screens/CategoryList/CategoryList';
import NewsDetails from '../screens/NewsDetails/NewsDetails';
import SplashScreen from '../screens/User/SplashScreen/SplashScreen';

const UserStack = () => {
    const Stack = createStackNavigator();


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'Splash'}>
            <Stack.Screen name="Home" component={Tabs}  />

            <Stack.Screen name="Splash" component={SplashScreen} />

            <Stack.Screen name="CategoryList" component={CategoryList} />
            <Stack.Screen name="NewsDetails" component={NewsDetails} />

            
        </Stack.Navigator>

    )
}


export default UserStack