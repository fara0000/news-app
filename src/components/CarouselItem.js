import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import Category from "./Category";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const CarouselCardItem = ({ ...props }) => {
  const { item, index, navigation } = props;

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("NewsDetails", { newsId: item._id })}
    >
      <View style={styles.container} key={index}>
        <ImageBackground source={{ uri: item.urlToImage }} style={styles.image}>
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              height: "100%",
              paddingLeft: 15,
              paddingRight: 15,
              justifyContent: "center",
            }}
          >
            <View style={{ width: "25%" }}>
              <Category category={item.category} />
            </View>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.body}>
              {item.title}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
  },
  image: {
    height: 200,
  },
  body: {
    color: "#222",
    fontSize: 20,
    marginTop: 10,
    color: "#fff",
    fontWeight: "700",
  },
});

export default CarouselCardItem;
