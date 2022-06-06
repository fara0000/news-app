import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, ActivityIndicator } from "react-native";
import {styles} from './styles';

const Loader = ({ visible }) => {
  const {colors: {dark, background, text}} = useTheme();
  return (
    <View style={styles(text,background, dark).container}>
      <ActivityIndicator
        visible={visible}
        textContent={"Loading..."}
        textStyle={styles().spinnerTextStyle}
        animation="fade"
        overlayColor="rgba(0, 0, 0, 0.75)"
        size="small"
        color={text}
      />
    </View>
  );
};

export default Loader;
