import React from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
// import { useNavigation } from '@react-navigation/native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const SmallNewsCard = ({data, index, ...props}) => {

  // const navigation = useNavigation();
  return (
    <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center'}} onPress={() =>  {
      console.log(props)
      props.updateNewsDetails(data)
    }}>
      <Image
        style={{width: 140, height: 100, borderRadius: 15}}
        source={{uri: data.urlToImage}}
      />
      <Text
        style={{
          color: '#d3d3d3',
          fontSize: 12,
          textAlign: 'center',
          marginTop: 5,
        }}>
       {data.title}
      </Text>
    </TouchableOpacity>
  );
};

export default SmallNewsCard;
