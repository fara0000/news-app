import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale, scale } from "react-native-size-matters";
import { COLORS } from "../../constants";

export const styles = (text,background, dark) =>
  EStyleSheet.create({
    spinnerTextStyle: {
        color: '#000',
        fontSize: 15
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: background
      },
  });
