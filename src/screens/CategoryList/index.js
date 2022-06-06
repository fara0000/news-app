import React, { useEffect, useState } from "react";
import { ScrollView,Text,TouchableOpacity,View} from "react-native";
import HeaderWithBack from "../../components/HeaderWithBack/HeaderWithBack";
import NewsListItem from "../../components/NewsCard/NewsListItem";
import { styles } from "./styles";
import * as categoryActions from "../../redux/Actions/categoryActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Config from "@Config/default";
import LinearGradient from "react-native-linear-gradient";
import * as newsActions from "../../redux/Actions/newsActions";
import Loader from "../../components/Loader/Spinner";
import { useTheme } from "@react-navigation/native";

const CategoryList = ({ ...props }) => {
  const [tabValue, setTabValue] = useState({});
  const { gradientColors } = Config;
  const {colors: {card,text}, dark} = useTheme();

  const {fetchAllCategories,categoryList,isAllCatloading,fetchNewsByCategory,
    newsListByCategory,isLoadingNewsByCat,
  } = props;

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (categoryList.length && !isAllCatloading) {
      setTabValue(addColor()[0]);
    }
    console.log(tabValue);
  }, [isAllCatloading]);

  useEffect(() => {
    fetchNewsByCategory(tabValue && tabValue._id);
  }, [tabValue]);

  const getLinerGradientColor = (index) => {
    return gradientColors[index % 13];
  };

  const addColor = () => {
    const data = categoryList.map((each, index) => {
      let obj = { ...each, ...getLinerGradientColor(index) };
      return obj;
    });
    return data;
  };

  const renderTab = () => {
    return (
      <ScrollView
        horizontal
        style={{ marginTop: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {addColor().map((item, index) => (
          <TouchableOpacity
            style={{ height: 60, justifyContent: "center", marginTop: 10 }}
            onPress={() => {
              // setTabValue({});
              setTabValue(item);
              fetchNewsByCategory(item._id);
            }}
            key={item._id}
          >
            <LinearGradient
              colors={[item.c1, item.c2]}
              style={styles().slider_main}
            >
              <Text style={styles().slider_text}>{item.category_name} </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderWithBack
        title="Categories"
        navigate="Home"
        headerBackground={card}
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles().main_container}>
          {renderTab()}

          <View style={styles().category_container}>
            <Text style={styles(text, dark).trending_title}>
              {tabValue && tabValue.category_name}
            </Text>

            {!isLoadingNewsByCat ? (
              <View style={styles().inner_category_container}>
                {newsListByCategory.length > 0 ? 
                (
                  newsListByCategory.map((item) => (
                    <NewsListItem key={item._id} item={item} />
                  ))
                ) : (
                  <Text style={{color: text}}>Empty</Text>
                )}
              </View>
            ) : (
              <Loader visible={isLoadingNewsByCat} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

CategoryList.propTypes = {
  fetchAllCategories: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  isAllCatloading: PropTypes.bool.isRequired,
  fetchNewsByCategory: PropTypes.func.isRequired,
  newsListByCategory: PropTypes.array.isRequired,
  isLoadingNewsByCat: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    categoryList: state.category.categoryList,
    isAllCatloading: state.category.isAllCatloading,
    newsListByCategory: state.news.newsListByCategory,
    isLoadingNewsByCat: state.news.isLoadingNewsByCat,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchAllCategories: () => dispatch(categoryActions.fetchAllCategories()),
  fetchNewsByCategory: (catId) =>
    dispatch(newsActions.fetchNewsByCategory(catId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
