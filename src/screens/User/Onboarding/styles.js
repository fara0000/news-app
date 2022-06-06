import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale, scale } from "react-native-size-matters";
import { COLORS } from "../../../constants/index";

export const styles = (key) =>
  EStyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(0, 0, 0, .2)",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    slide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:
        key == "slide1" ? "#ffffff" : key == "slide2" ? "#ffffff" : "#ffffff",
    },
    titleContainer: {
      flex: 1,
      justifyContent: "flex-end",
      paddingStart: "8%",
      paddingRight: "8%",
    },
    title: {
      color: COLORS.secondary,
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
    },
    imageContainer: {
      flex: 3,
      justifyContent: "center",
    },
    image: {
      width: 300,
      height: 300,
      resizeMode: "contain",
    },
    textContainer: {
      flex: 1,
      justifyContent: "flex-start",
      paddingStart: "8%",
      paddingRight: "8%",
    },

    text: {
      textAlign: "center",
      fontWeight: "bold",
    },
    skipTextColor: {
      color: COLORS.primary,
      fontWeight: "bold",
    },
    skipView: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
  });
