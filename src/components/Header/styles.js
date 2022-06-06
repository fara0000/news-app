import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale, scale } from "react-native-size-matters";
import { COLORS } from "../../constants";

export const styles = (text,card,dark,primary) =>
  EStyleSheet.create({
    main_container: {
        height: 60,
        backgroundColor: dark ? card : '#fff',
        justifyContent: 'center',
    },
    header_title: {
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: 18,
        color:dark ? text : primary
    }
  });
