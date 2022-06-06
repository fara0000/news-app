import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView, TouchableOpacity, RefreshControl, FlatList, ActivityIndicator, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Header from '../../components/Header/Header';
import NewsListItem from '../../components/NewsCard/NewsListItem';
import Sliders from '../../components/Sliders/Sliders';
import { connect } from 'react-redux';
import * as newsActions from '../../redux/Actions/newsActions';
import PropTypes from 'prop-types';
import { useNavigation, useTheme } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import { getAllNews } from '../../EndPoints/News';
import Loader from '../../components/Loader/Spinner';

const Favorite = ({ ...props }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const propTypes = {
    fetchFavNews: PropTypes.func.isRequired,
    isLoadingNewsFav: PropTypes.bool.isRequired,
    newsListByFav: PropTypes.array.isRequired,
    isloggedIn: PropTypes.bool.isRequired
  }

  const { fetchFavNews, newsListByFav, isLoadingNewsFav, isloggedIn } = props;

  const {colors: {text}} = useTheme();

  useEffect(() => {
    fetchFavoriteNews();
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchFavoriteNews();
    });
    return unsubscribe;
  }, []);



  const fetchFavoriteNews = () => {
    fetchFavNews();
  }

  console.log("isLoadingNewsFav", isLoadingNewsFav)
  console.log("newsListByFav", newsListByFav)



  const _renderItems = () => {
    if (newsListByFav && newsListByFav.length)
      return (
        <FlatList
          contentContainerStyle={{ paddingBottom: moderateScale(50), paddingHorizontal: moderateScale(10), marginTop: moderateScale(20) }}
          data={newsListByFav}
          keyExtractor={(item, index) => item._id.toString() + index}

          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <NewsListItem item={item.news} />
          )}
          windowSize={6}
        />

      )

  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchFavNews()
    }, 2000)
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Favorites" />
      {
      isloggedIn ?  isLoadingNewsFav ? (<Loader visible={isLoadingNewsFav} />) : _renderItems() : 
      
      (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{alignSelf: 'center', color: text}}>Please login</Text>
        </View>
      )
        
      }

    </View>
  );
};



const mapStateToProps = (state) => {
  return {
    newsListByFav: state.news.newsListByFav,
    isLoadingNewsFav: state.news.isLoadingNewsFav,
    user: state.auth.user,
    isloggedIn: state.auth.isloggedIn,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchFavNews: () => dispatch(newsActions.fetchFavNews()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
