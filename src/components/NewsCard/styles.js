import EStyleSheet from "react-native-extended-stylesheet";
import { moderateScale, scale } from "react-native-size-matters";
import { COLORS } from "../../constants";

export const styles = (card, dark) =>
  EStyleSheet.create({
    main_container: {
        backgroundColor: dark ? card :'#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.22,
    
        elevation: 3,
        flexDirection: 'row',
        marginBottom: 15,
        // marginRight: 10
      },
      image: {
        height: 140,
        width: '40%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
      },
      news_content_section: {
          paddingStart: 15,
          paddingRight: 15,
          width: '60%',
          justifyContent: 'center'
      },
      news_details: {
          flexDirection: 'row',
          justifyContent: 'space-between',
      },
      category_container: {
         
      }
  });
