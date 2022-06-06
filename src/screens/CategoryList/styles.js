import EStyleSheet from 'react-native-extended-stylesheet';
import {moderateScale, scale} from 'react-native-size-matters';

export const styles = (text, dark) => EStyleSheet.create({
    main_container: {
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1
      },
      slider_main: {
        height: 50,
        // width: 100,
        paddingLeft: 20,      
        paddingRight: 20,
        marginRight: 15,
        // backgroundColor: '#f00',
        justifyContent: 'center',
        borderRadius: 20,
        elevation: 5,
      },
      slider_text: {
        // paddingTop: 10,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700'
      },
      trending_title: {
        color: dark ? text : '#182952',
        fontWeight: '700',
        fontSize: 20,
      },
      category_container: {
          marginTop: 30,
          flex: 1,
          justifyContent: 'center',
      },
      inner_category_container: {
        marginTop: 10,
      },
})