import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale, scale } from "react-native-size-matters";
import { COLORS } from "../../constants";

export const styles = (text) =>
  EStyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    child: {
      flex: 1,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    headerContainer: {
      resizeMode: "cover",
      height: 250,
      //   borderBottomRightRadius: 20,
      //   borderBottomLeftRadius: 20,
    },
    headDataContainer: {
      flex: 1,
      flexDirection: "column",
    },
    centerData: {
      alignSelf: "center",
    },
    readContainer: {
      alignSelf: "center",
      flexDirection: "row",
    },
    readContainerIcon: {
      alignSelf: "center",
      alignSelf: "center",
      fontSize: moderateScale(15),
    },
    readContainerText: {
      color: "#fff",
      fontSize: moderateScale(15),
      marginLeft: 5,
      alignSelf: "center",
      fontWeight: "bold",
    },
    categoryBtnContainer: {
      alignSelf: "center",
      marginTop: 10,
    },
    titleContainer: {
      alignSelf: "center",
      marginTop: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    titleContainerText: {
      color: "#fff",
      textAlign: "center",
      fontSize: moderateScale(18),
      fontWeight: "700",
    },
    headerActionContainer: {
      flexDirection: "row",
      width: "100%",
      backgroundColor: "transparent",
      height: 60,
      justifyContent: "center",
      position: "absolute",
      top: "88%",
    },
    headerActionContainerLeft: {
      width: "60%",
      alignSelf: "center",
      paddingTop: "5%",
    },
    headerActionContainerLeftEyeIcon: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    headerActionContainerLeftViewText: {
      fontWeight: "bold",
      marginLeft: 2,
      fontSize: 13,
      alignSelf: "center",
    },
    headerActionContainerLeftDateText: {
      fontSize: 10,
      marginLeft: 5,
      alignSelf: "center",
    },
    headerActionContainerRight: {
      flexDirection: "row",
      alignSelf: "center",
    },
    headerActionContainerRightShareBtn: {
      width: 40,
      height: 40,
      elevation: 5,
      backgroundColor: "#fff",
      borderRadius: 40,
      justifyContent: "center",
      marginRight: 10,
    },
    headerActionContainerRightFavBtn: {
      width: 40,
      height: 40,
      elevation: 5,
      backgroundColor: "#fff",
      borderRadius: 40,
      justifyContent: "center",
    },
    commentContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 20,
      marginBottom: 70,
    },

    textAreaContainer: {
      borderColor: COLORS.lightGray5,
      borderWidth: 1,
      padding: 5,
      marginTop: 20,
      borderRadius: 5,
    },
    textArea: {
      height: 100,
      justifyContent: "flex-start",
      color: text
    },
  });
