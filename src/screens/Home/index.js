import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  BackHandler,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";
import Header from "../../components/Header/Header";
import NewsListItem from "../../components/NewsCard/NewsListItem";
import Sliders from "../../components/Sliders/Sliders";
import { connect } from "react-redux";
import * as newsActions from "../../redux/Actions/newsActions";
import PropTypes from "prop-types";
import { useNavigation, useTheme } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import Loader from "../../components/Loader/Spinner";
import { styles } from './styles';


const Home = ({ ...props }) => {
  const { colors: { card, text, primary, background }, dark } = useTheme();

  const { fetchAllNews, newsList, loading, hasMoreAllNews, fetchNewsForSlider,
    sliderNews, isLoadingSliderNews } = props;

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);


  useEffect(() => {
    fetchNews();
    fetchNewsForSlider();

    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const fetchNews = (limit = 6) => {
    fetchAllNews(page, limit);
    setPage((prevPage) => prevPage + 1);
  };

  const renderFooter = () => {
    return hasMoreAllNews ? (
      <View>
        <ActivityIndicator color="#FFB400" size="small" />
      </View>
    ) : null;
  };

  const _renderHeader = () => {
    return (
      <View>
        <Sliders
          style={styles().slider}
          data={sliderNews}
          navigation={navigation}
        />

        <View style={styles().trending_section}>
          <View style={styles().trending_header}>
            <Text style={styles(text, dark).trending_title}>Trending</Text>
            <View style={styles(text, dark).arrow_background}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CategoryList")}
              >
                <Icon name="chevron-forward" size={20} color={dark ? primary : "#fff"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const _renderItems = () => {
    if (newsList && newsList.length)
      return (
        <FlatList
          contentContainerStyle={{ paddingBottom: moderateScale(50), }}
          data={newsList}
          keyExtractor={(item, index) => item._id.toString() + index}
          maxToRenderPerBatch={4}
          onEndReachedThreshold={0.01}
          initialNumToRender={4}
          onEndReached={() => {
            hasMoreAllNews && fetchNews();
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (<View style={{ paddingHorizontal: moderateScale(10) }}>
              <NewsListItem item={item} />
            </View>)
          }}
          windowSize={6}
          ListHeaderComponent={_renderHeader}
        />
      );
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setTimeout(() => {
      fetchAllNews();
    }, 2000);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: background }}>
      <Header title="Feed" />
      <View style={{ flex: 1 }}>
        {isLoadingSliderNews && loading ? (<Loader />) : (_renderItems())}

      </View>
    </View>
  );
};


Home.prototype = {
  fetchAllNews: PropTypes.func.isRequired,
  newsList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  hasMoreAllNews: PropTypes.bool.isRequired,
  fetchNewsForSlider: PropTypes.func.isRequired,
  sliderNews: PropTypes.array.isRequired,
  isLoadingSliderNews: PropTypes.bool.isRequired
}


const mapStateToProps = (state) => {
  return {
    newsList: state.news.newsList,
    loading: state.news.loading,
    hasMoreAllNews: state.news.hasMoreAllNews,

    sliderNews: state.news.sliderNews,
    isLoadingSliderNews: state.news.isLoadingSliderNews,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllNews: (pageNo, limit) =>
    dispatch(newsActions.fetchAllNews(pageNo, limit)),
  fetchNewsForSlider: () => dispatch(newsActions.fetchNewsForSlider()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
