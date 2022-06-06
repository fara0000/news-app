import { ToastAndroid } from "react-native";
import Snackbar from "react-native-snackbar";

export const showSnackbar = (msg, type = 'INFO') => {
    Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: type == 'ERROR' ? '#f00' : '#000',
    });
}

export const showToast = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
        msg, ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
    );
};
