import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from "../../../constants/index";

export const styles = (background, text, primary, dark, card) =>
  EStyleSheet.create({
    loginMain: {
        flex: 1,
        paddingLeft: moderateScale(20),
        paddingRight: moderateScale(20),
        backgroundColor: background
    },
    headerContainer: {
        height:Dimensions.get('window').height/4,justifyContent:'center',
    },
    welcomeText: {
        fontSize: moderateScale(30),
        fontWeight: 'bold',
        color: text
    },
    signInText: {
        color: COLORS.lightGray5,
        fontSize: moderateScale(15),
        letterSpacing: 0.5,
        fontWeight: 'bold'
    },
    formContainer: {
        flex: 4,
        justifyContent: 'center'
    },
    inputContainer: {

    },
    input: {
        height: moderateScale(55),
        color: text,
        borderWidth: moderateScale(1),
        borderColor: COLORS.lightGray5,
        borderRadius: moderateScale(8),
        paddingHorizontal: moderateScale(10),
        fontWeight: 'bold',
    },
    wrapper: {
        marginTop: moderateScale(30)
    },
    labelWrapper: {
        zIndex: 10,
        position: 'absolute',
        left: moderateScale(20),
        top: moderateScale(-9),
        backgroundColor: background,
        paddingHorizontal: moderateScale(8),
    },
    label: {
        color: COLORS.lightGray5,
        fontSize: 12
    },
    btnContainer: {
        marginTop: '10%',
    },
    loginBtn: {
        height: moderateScale(50),
    },

    fogotPasswordContainer: {
        alignItems: 'flex-end',
        paddingHorizontal: moderateScale(10),
        marginTop: moderateScale(5)
    },
    forgotPasswordText: {
        fontSize: 12
    },
    footerContainer: {
        height:Dimensions.get('window').height/5,justifyContent:'center',alignItems: 'center', flexDirection: 'column'

    },
    footerContainerInner: {
        flexDirection: 'row'
    },
    signText: {
        marginLeft: moderateScale(5),
        color: dark ? text : primary,
        fontWeight: 'bold',
        fontSize: moderateScale(15)
    },
    newUserText: {
        fontSize: moderateScale(13), color: dark ? text : primary
    }

  });
