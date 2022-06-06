import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale, scale } from "react-native-size-matters";
import { COLORS } from "../../constants";

export const styles = (text, dark) =>
  EStyleSheet.create({
      slider: {},
      trending_section: {
        paddingHorizontal: moderateScale(15),
        marginTop: 20,
        marginBottom: 20,
      },
      trending_header: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      trending_title: {
        color: dark ? text : "#182952",
        fontWeight: "700",
        fontSize: 20,
      },
      arrow_background: {
        backgroundColor: dark ? '#fff' : "#182952",
        width: 30,
        height: 30,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
      },
      news_item: {
        // marginTop: 20,
        // flex: 2
      },
  });
