import EStyleSheet from 'react-native-extended-stylesheet';
import { moderateScale, scale, } from 'react-native-size-matters';

export const styles = (headerBackground, text, dark) => EStyleSheet.create({
    mainContainer: {
        height: 60,
        backgroundColor: headerBackground || 'transparent',
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15
    },
    headerTitle: {
        // alignSelf: 'center',
        fontWeight: '700',
        fontSize: 18,
        color: dark ? text : '#182952',
        marginLeft: 10
    }
},);