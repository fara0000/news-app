import { HeaderBackButton } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { useNavigation, useTheme } from "@react-navigation/native";

import { styles } from "./styles";
const HeaderWithBack = (props) => {
  const navigation = useNavigation();
  const {colors: {text}, dark} = useTheme();
  const { headerBackground, navigate, headerText } = props;
  return (
    <View style={styles(headerBackground).mainContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
        <Icon
          name="arrow-back"
          size={25}
          color={text}
        />
      </TouchableOpacity>

      <Text style={styles(headerBackground, text, dark).headerTitle}>{props.title}</Text>
    </View>
  );
};

export default HeaderWithBack;
