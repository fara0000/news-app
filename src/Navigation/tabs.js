import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { Home, Account, Favorite, Notification } from '../screens';
import { SIZES, COLORS } from '../constants';
import { useTheme } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const {colors: {text, primary}, dark} = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        // activeBackgroundColor: '#8BC540',
        // inactiveBackgroundColor: '#349746',
        activeTintColor: dark ? text : primary, // tab text color
        inactiveTintColor: "#9ea9b3",
        tabStyle: {
          paddingTop: 10,
        },
        style: {
          height: 58,
        },
        labelPosition: 'below-icon',
        labelStyle: {
          marginTop: 5,
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{

          tabBarIcon: ({ size, color }) => (
            <Icon name="home-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorite}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="heart-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="notifications-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="person-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
