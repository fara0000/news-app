import { HeaderBackButton } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {ImageBackground,Text,TouchableOpacity,View,useWindowDimensions,ScrollView,
  TextInput,Button,Share } from "react-native";
import Category from "../../components/Category";
import HeaderWithBack from "../../components/HeaderWithBack/HeaderWithBack";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/dist/Ionicons";
import HTML from "react-native-render-html";
import RelatedSliders from "../../components/Sliders/RelatedSlider";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as newsActions from "../../redux/Actions/newsActions";
import moment from "moment";
import Loader from "../../components/Loader/Spinner";
import Comment from "../../components/Comment/Comment";
import { showSnackbar, showToast } from "../../Utils/Snackbar";
import { checkFavNewsExists } from "../../EndPoints/News";
import { useTheme } from "@react-navigation/native";
import { scale } from "react-native-size-matters";

const htmlContentData = `
<h2>Content not added</h2>
`;

const NewsDetails = ({ ...props }) => {
  const [showSlider, setShowSlider] = useState(false);
  const contentWidth = useWindowDimensions().width;
  const { newsId } = props.route.params;
  const [displayCommentBox, setDisplayCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showFav, setShowFav] = useState(false);

  const {colors: {card, text, secondary}, dark} = useTheme();

  const { fetchNewsDetails, newsDetails, isLoadingDetails, fetchNewsByRelated, isLoadingNewsByRelated, 
    newsListByRelated, user, addCommentToNews, isLoadingAddComment, commentData, 
    updateNewsDetails, addToFav, isLoadingAddToFav, favData, isloggedIn } = props;

  useEffect(() => {
    fetchNewsDetails(newsId);
  }, [commentData]);

  useEffect(() => {
    checkNewsAddedInFav();
  }, [favData]);

  const addComment = () => {
    if (!isloggedIn) {
      showToast("Please login to put a comment.");
      return;
    }

    console.log("hello");
    console.log("newComment", newComment);

    if (!newComment.length >= 1) {
      showSnackbar("Comment must not be empty");
      return;
    }
    addCommentToNews(newsDetails._id, newComment);

    setNewComment("");
  };

  const checkNewsAddedInFav = () => {
    checkFavNewsExists(newsId)
      .then((res) => {
        console.log("res", res);

        console.log("res.status", res.exists);

        setShowFav(res.exists);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Find this App On News App",
        message: newsDetails && newsDetails.title,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  const addToFavorite = () => {
    if (!isloggedIn) {
      showToast("Please login to add in your favorite list.");
      return;
    }

    addToFav(newsDetails._id);
    showSnackbar(favData.msg);
  };

  const renderHeader = () => {
    return (
      <View style={styles().overlay}>
        <ImageBackground
          source={{ uri: newsDetails && newsDetails.urlToImage }}
          imageStyle={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
          style={styles().headerContainer}
        >
          <View style={styles().child}>
            <HeaderWithBack arrowColor="#fff" navigate="Home" />

            <View style={styles().headDataContainer}>
              <View style={styles().readContainer}>
                <Icon
                  style={styles().readContainerIcon}
                  name="document"
                  size={20}
                  color="#fff"
                />

                <Text style={styles().readContainerText}>
                  {newsDetails ? newsDetails.timeToRead : ".."}
                </Text>
              </View>

              <View style={styles().categoryBtnContainer}>
                <Category category={newsDetails && newsDetails.category} />
              </View>

              <View style={styles().titleContainer}>
                <Text style={styles().titleContainerText}>
                  {newsDetails && newsDetails.title}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles().headerActionContainer}>
          <View style={styles().headerActionContainerLeft}>
            <View style={styles().headerActionContainerLeftEyeIcon}>
              <Icon name="eye" size={18} color="#000" />
              <Text style={styles().headerActionContainerLeftViewText}>
                {newsDetails && newsDetails.views}
              </Text>
              <Text style={styles().headerActionContainerLeftDateText}>
                {newsDetails &&
                  moment(newsDetails.addedAt).format("D MMM YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles().headerActionContainerRight}>
            <TouchableOpacity
              style={styles().headerActionContainerRightShareBtn}
              onPress={onShare}
            >
              <Icon
                style={{ alignSelf: "center" }}
                name="share-outline"
                size={25}
                color="#000"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles().headerActionContainerRightFavBtn}
              onPress={addToFavorite}
            >
              <Icon
                style={{ alignSelf: "center" }}
                name={showFav ? "heart" : "heart-outline"}
                size={25}
                color="#f00"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return isLoadingDetails ? (
    <Loader visible={isLoadingDetails} />
  ) : (
    <View style={styles().mainContainer}>
      <ScrollView contentContainerStyle={{ marginBottom: 200 }}>
        {renderHeader()}
        <View style={{ paddingHorizontal: scale(10), marginTop: 30}}>
          <HTML
            source={{
              html: (newsDetails && newsDetails.content) || htmlContentData,
            }}
            tagsStyles={{
              p: {color: text, textAlign: 'justify', marginTop: scale(10)},
              span: {color: text},
              h1: {color: text, marginVertical: scale(10), textAlign: 'justify'},
              h2: {color: text, marginVertical: scale(10), textAlign: 'justify'},
              h3: {color: text, marginVertical: scale(10), textAlign: 'justify'},
              h4: {color: text, marginVertical: scale(10), textAlign: 'justify'},
              h5: {color: text, marginVertical: scale(10), textAlign: 'justify'},
              h6: {color: text, marginVertical: scale(10), textAlign: 'justify'},
            }}
            contentWidth={contentWidth}
          />
        </View>

        <View style={styles().commentContainer}>
          <Text style={{ fontSize: 20, color: text }}>
            Comments
          </Text>
          <View style={{ marginTop: scale(15) }}>
            {newsDetails &&
            newsDetails.comments &&
            newsDetails.comments.length ? (
              newsDetails.comments.map((news) => (
                <View style={{ marginTop: scale(10) }} key={news._id}>
                  <Comment comment={news} />
                </View>
              ))
            ) : (
              <Text>Empty</Text>
            )}
          </View>

          <View style={{ marginTop: 30 }}>
            <TouchableOpacity
              onPress={() => setDisplayCommentBox(!displayCommentBox)}
            >
              {!displayCommentBox ? (
                <Text
                  style={{
                    textAlign: "right",
                    color: dark ? text : '#182952',
                    fontWeight: "700",
                  }}
                >
                  Add a Comment
                </Text>
              ) : (
                <Text
                  style={{
                    textAlign: "right",
                    color: "#f00",
                    fontWeight: "700",
                  }}
                >
                  Cancel
                </Text>
              )}
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => setDisplayCommentBox(false)}>
              <Text style={{textAlign: 'right', color: COLORS.secondary, fontWeight: '700'}}>Cancel</Text>
            </TouchableOpacity> */}
          </View>

          {displayCommentBox && (
            <View>
              <View style={styles().textAreaContainer}>
                <TextInput
                  style={styles(text).textArea}
                  underlineColorAndroid="transparent"
                  placeholder="Type something"
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                  value={newComment}
                  onChangeText={(value) => setNewComment(value)}
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <Button onPress={addComment} title="comment" />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          height: showSlider ? 250 : 70,
          width: "100%",
          backgroundColor: dark ? card : secondary,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: "8%",
            paddingRight: "8%",
            paddingTop: "5%",
          }}
        >
          <Text
            style={{
              color: "#fff",
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Related
          </Text>

          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              fetchNewsByRelated(newsDetails && newsDetails.category._id);

              setShowSlider(!showSlider);
            }}
          >
            <Icon name="caret-down-circle" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {(newsListByRelated && newsListByRelated.length && showSlider) && (
          <View
            style={{ paddingLeft: "2%", marginRight: "2%", marginTop: "5%" }}
          >
            {isLoadingNewsByRelated ? (
              <Loader />
            ) : (
              <RelatedSliders {...props} />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

NewsDetails.propTypes = {
  fetchNewsDetails: PropTypes.func.isRequired,
  isLoadingDetails: PropTypes.bool.isRequired,
  newsdetails: PropTypes.object,
  newsListByRelated: PropTypes.array,
  isLoadingNewsByRelated: PropTypes.bool.isRequired,
  fetchNewsByRelated: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  addCommentToNews: PropTypes.func.isRequired,
  isLoadingAddComment: PropTypes.bool.isRequired,
  commentData: PropTypes.object,
  updateNewsDetails: PropTypes.func.isRequired,
  isLoadingAddToFav: PropTypes.bool.isRequired,
  addToFav: PropTypes.func.isRequired,
  favData: PropTypes.object.isRequired,
  isloggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    newsDetails: state.news.newsDetails,
    isLoadingDetails: state.news.isLoadingDetails,
    newsListByRelated: state.news.newsListByRelated,
    isLoadingNewsByRelated: state.news.isLoadingNewsByRelated,
    user: state.auth.user,
    isloggedIn: state.auth.isloggedIn,
    isLoadingAddComment: state.news.isLoadingAddComment,
    commentData: state.news.commentData,
    isLoadingAddToFav: state.news.isLoadingAddToFav,
    favData: state.news.favData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNewsDetails: (newsId) => dispatch(newsActions.fetchNewsDetails(newsId)),
  fetchNewsByRelated: (newsId) =>
    dispatch(newsActions.fetchNewsByRelated(newsId)),
  addCommentToNews: (newsId, comment) =>
    dispatch(newsActions.addCommentToNews(newsId, comment)),
  updateNewsDetails: (news) => dispatch(newsActions.updateNewsDetails(news)),
  addToFav: (newsId) => dispatch(newsActions.addToFav(newsId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetails);
