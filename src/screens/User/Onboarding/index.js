import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import AppIntroSlider from "react-native-app-intro-slider";
import Ion from "react-native-vector-icons/dist/Ionicons";
import { connect } from "react-redux";
import * as authActions from "../../../redux/Actions/authActions";
import PropTypes from "prop-types";

const OnboardingScreen = ({ ...props }) => {
  const navigation = useNavigation();

  // const getPageIndex = (pageIndex1) => {
  //   setPageIndex(pageIndex1);
  // };

  const { updateOnboarding, onboardingStatus } = props;

  const slides = [
    {
      key: "slide1",
      image: require("../../../assets/onboarding/frontal_home.png"),
      title: "Welcome to news app.  fef   rg  v fefe",
      text:
        "It would be a bad user experience if you had to go through the onboarding.",
    },
    {
      key: "slide2",
      image: require("../../../assets/onboarding/doodle_reading.png"),
      title: "Read News",
      text:
        "It would be a bad user experience if you had to go through the onboarding.",
    },
    {
      key: "slide3",
      image: require("../../../assets/onboarding/stting_on_floor.png"),
      title: "Read At Any Time",
      text: "Beautiful, isn't it?",
    },
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={styles(item.key).slide}>
        <View style={styles().titleContainer}>
          <Text style={styles().title}>{item.title}</Text>
        </View>

        <View style={styles().imageContainer}>
          <Image source={item.image} style={styles().image} />
        </View>
        <View style={styles().textContainer}>
          <Text style={styles().text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles().buttonCircle}>
        <Ion
          name="arrow-forward-outline"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles().buttonCircle}>
        <Ion name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={styles().skipView}>
        <Text style={styles().skipTextColor}>Skip</Text>
      </View>
    );
  };

  const _onEndReached = () => {
    updateOnboarding(true);
    navigation.replace("Login");
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={_renderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      onDone={_onEndReached}
      onSkip={_onEndReached}
      dotClickEnabled={true}
      showSkipButton={true}
    />
  );
};

OnboardingScreen.propTypes = {
  updateOnboarding: PropTypes.func.isRequired,
  onboardingStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    onboardingStatus: state.auth.onboardingStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateOnboarding: (status) => dispatch(authActions.updateOnboarding(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);
