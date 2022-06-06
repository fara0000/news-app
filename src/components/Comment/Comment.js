import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { COLORS } from "../../constants";
import { styles } from "./styles";

const Comment = ({ comment }) => {
  const {colors: {text}} = useTheme();
  return (
    <View style={{ width: "100%" }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{}}>
          <Image
            source={require("../../assets/user.png")}
            style={{ height: 35, width: 35 }}
          />
        </View>

        <View style={{ marginLeft: 10, paddingRight: 50 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 13, color: text }}>
              {comment.user.name}
            </Text>

            <Text style={{ textAlign: "justify", fontSize: 10, color: text }}>
              {comment.comment}
            </Text>
          </View>

          {/* <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              width: "40%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity>
                <Icon name="heart-outline" size={20} color="#000" />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 2,
                  color: COLORS.lightGray5,
                }}
              >
                312
              </Text>
            </View>
            <Text>-</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 14, fontWeight: "600" }}>Reply</Text>
            </TouchableOpacity>
          </View> */}

        
        </View>
      </View>

    </View>
  );
};

export default Comment;
