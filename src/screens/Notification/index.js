import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import { COLORS } from "../../constants";
import * as newsActions from "../../redux/Actions/newsActions";
import Icon from "react-native-vector-icons/dist/Ionicons";
import moment from "moment";
import Loader from "../../components/Loader/Spinner";
import { useTheme } from "@react-navigation/native";

const Notification = ({ ...props }) => {
  const { newsListLast24, isLoadingNewsLast, fetchLast24News } = props;
  const {colors: {text}} = useTheme();


  useEffect(() => {
    fetchLast24News();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "column",
          marginTop: 10,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          paddingVertical: 5,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold", color: COLORS.secondary }}>
            <Icon name="notifications"></Icon>
            New News Added!
          </Text>
          <Text style={{ color: COLORS.secondary }}>
            {moment(item.addedAt).format("D MMM YYYY")}
          </Text>
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{ marginTop: 10, color: COLORS.lightGray5 }}
        >
          {item.title}
        </Text>
      </View>
    );
  };

  if (isLoadingNewsLast) {
    return (
      <Loader visible={true} />
      // <Text>Loading</Text>
    );
  }

  // if(!newsListLast24.length && !isLoadingNewsLast) {
  //   return <Text style={{color: '#f00'}}>Empty</Text>;
  // }

  return (
    <View style={{ flex: 1 }}>
      <Header title="Notifications" />
      {!newsListLast24.length && !isLoadingNewsLast ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ alignSelf: "center", color: text }}>No notifications.</Text>
        </View>
      ) : (
        <FlatList
          data={newsListLast24}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingTop: 10 }}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    newsListLast24: state.news.newsListLast24,
    isLoadingNewsLast: state.news.isLoadingNewsLast,
    user: state.auth.user,
    isloggedIn: state.auth.isloggedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchLast24News: () => dispatch(newsActions.fetchLast24News()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);