import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale, scale } from "react-native-size-matters";

export const styles = (card, text, primary, dark) =>
  EStyleSheet.create({
    main_container: {
      flexDirection: "column",
      flex: 1,
    },
    profile_section: {
      backgroundColor: dark ? card : '#fff',
      paddingTop: 20,
      paddingBottom: 20,
    },
    background_container: {
      height: moderateScale(160),
    },
    image_circle_container: {
      marginTop: 20,
    },
    image_container: {
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
    },
    profile_details_container: {
      marginTop: 10,
    },
    user_name_text: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      marginTop: moderateScale(10),
      color: text,
    },
    login_btn_container: {
      marginLeft: 20,
      marginRight: 20,
      backgroundColor: dark ? card : primary,
      marginTop: 20,
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
      elevation: 2,
    },
    login_btn_text: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 16,
      color: dark ? primary : "#fff",
    },
    option_container: {

      height: 50,
      marginTop: 10,
      paddingHorizontal: 20,
      justifyContent: "center",
      borderBottomColor: "#cccccc",
      borderBottomWidth: 0.54,
    },
    inner_op_container: {
      flexDirection: "row", justifyContent: "space-between"
    },
    inner_op_text: {
      fontWeight: "600",
      fontSize: 16,
      marginLeft: 10,
      color: text,
    }
  });
