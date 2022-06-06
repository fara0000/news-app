import { useTheme } from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
const Header = (props) => {
  const {colors: {text, primary, card}, dark} = useTheme();
  return (
    <View style={styles(text,card,dark,primary).main_container}>
      <Text style={styles(text,card,dark,primary).header_title}>{props.title}</Text>
    </View>
  );
};

export default Header;