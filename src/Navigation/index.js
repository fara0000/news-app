import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import AuthStack from './AuthStack';
import axios from "axios";
import Config from "@Config/default";


const RootNavigation = ({ ...props }) => {
    const propTypes = {
        updateUserLogin: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        isloggedIn: PropTypes.bool.isRequired,
      };
    
      const { BASE_PATH } = Config;
    
      const { updateUserLogin, user, isloggedIn, appTheme } = props;
    
      console.log("appTheme", appTheme);
      const setUrlConfig = () => {
        console.log("called setUrlConfig");
        axios.defaults.baseURL = BASE_PATH;
      };
    
      useEffect(() => {
        setUrlConfig();
      }, []);
    
      const MyLightTheme = {
        ...DefaultTheme,
        dark: false,
        colors: {
          ...DefaultTheme.colors,
          primary: "#062743",
          secondary: "#182952"
        },
      };
    
      const MyDarkTheme = {
        ...DarkTheme,
        dark: true,
        colors: {
          ...DarkTheme.colors,
          primary: "#062743",
          secondary: "#182952",
          card: '#1f1f1f'
        },
      };
    
      return (
        <NavigationContainer theme={appTheme ? MyDarkTheme : MyLightTheme}>
          {/* {
                    isloggedIn ? <UserStack /> : <AuthStack />
                } */}
          <AuthStack />
        </NavigationContainer>
      );
    };
    
    const styles = StyleSheet.create({});
    const mapStateToProps = (state) => {
      return {
        user: state.auth.user,
        isloggedIn: state.auth.isloggedIn,
        appTheme: state.auth.appTheme,
      };
    };
    
export default connect(mapStateToProps)(RootNavigation);
