import React, { useEffect, useState } from "react";
import { View, Image, StatusBar } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAxiosConfig } from "../../../Utils/Axios/setAxios";
import { useNavigation, useTheme } from "@react-navigation/native";
import { styles } from './styles';

const SplashScreen = ({ ...props }) => {
  const { appTheme } = props;
  const { colors: { background, primary }, dark } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();
  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    StatusBar.setBackgroundColor(appTheme ? background : primary);
    setTimeout(function () {
      Hide_Splash_Screen();

      navigation.replace("Home");
    }, 3000);

    return () => {
      const {  user, isloggedIn } = props;
      if (isloggedIn) {
        console.log("yes ur logged in");
        setAxiosConfig(user, true);
      }
    }
  }, []);


  const renderSplash = () => {
    return (
      <View style={styles().SplashScreen_RootView}>
        <View style={styles().SplashScreen_ChildView}>
          {dark ? (<Image
            source={require("../../../assets/splash_icon_light.png")}
            style={{ width: 150, height: 150, resizeMode: "contain" }}
          />) : <Image
            source={require("../../../assets/splash_icon_dark.png")}
            style={{ width: 150, height: 150, resizeMode: "contain" }}
          />}
        </View>
      </View>
    )
  }


  return (
    <View style={styles(background).MainContainer}>
      {isVisible === true ? renderSplash() : null}
    </View>
  );

}


const propTypes = {
  updateUserLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  isloggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isloggedIn: state.auth.isloggedIn,
    appTheme: state.auth.appTheme,
  };
};

export default connect(mapStateToProps)(SplashScreen);
