import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Category from '../Category';
import { useNavigation, useTheme } from '@react-navigation/native';
import moment from 'moment';
import {styles} from './styles';

const NewsListItem = ({item}) => {
  const navigation = useNavigation();
  const {colors: {text, card}, dark} = useTheme();
  const navigateHome = () => {
    return navigation.navigate('NewsDetails');
  };

  return (
    <TouchableOpacity style={styles(card, dark).main_container} onPress={() => navigation.navigate('NewsDetails', {newsId: item._id})}>
      
        <Image
          source={{ uri: item.urlToImage }}
          resizeMode="cover"
          style={styles().image}
        />

        <View style={styles().news_content_section}>
            <View>
                <View style={styles().news_details}>
                    <View style={styles().category_container}>
                        <Category category={item.category} />
                    </View>

                    <Text style={{color: '#9eacb6'}}>
                        {/* {item.addedAt} */}
                        {moment(item.addedAt).format('HH:mm')}

                    </Text>
                </View>

                <Text numberOfLines={3} ellipsizeMode='tail' style={{marginTop: 5, fontSize: 18, marginRight: 10, marginBottom: 2, color: text}}>
                    {item.title}
                </Text>

                {/* <View style={styles().news_details}>
                    <View style={styles().category_container}>
                    <Text style={{color: '#9eacb6', marginBottom: 2, fontSize: 12}}>
                        -  {item.addedBy && item.addedBy.name}
                    </Text>
                    </View>

                
                </View> */}


            </View>
        </View>
      </TouchableOpacity>
    
  );
};


export default NewsListItem;
