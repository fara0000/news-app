import { getAllNews, getNewsByCategory, getNewsByRelated, getNewsDetailsById, getSliderNews, 
    addComment, getUploadedNews, addNewsToFav, getFavNews,getLastNewsApi } from '../../EndPoints/News';
import { ADD_COMMENT, ADD_TO_FAV, FETCH_FAV_NEWS_USER, FETCH_LAST_NEWSES_LIST, 
    FETCH_NEWS, FETCH_NEWS_BY_CATEGORY, FETCH_NEWS_DETAILS, FETCH_RELATED_NEWS, 
    FETCH_SLIDER_NEWS, FETCH_UPLOADED_NEWS_USER, UPDATE_NEWS_DETAIL } from '../Constants/news.constants';

export const fetchAllNews = (pageNo, limit = 0) => {
    return {
        type: FETCH_NEWS,
        promise: getAllNews(pageNo, limit),
        reset:limit === 0 ? true : false
    }
};


export const fetchNewsDetails = (newsId) => {
    return {
        type: FETCH_NEWS_DETAILS,
        promise: getNewsDetailsById(newsId)
    }
};

export const fetchNewsByCategory = (catId) => {
    return {
        type: FETCH_NEWS_BY_CATEGORY,
        promise: getNewsByCategory(catId)
    }
};


export const fetchNewsForSlider = () => {
    return {
        type: FETCH_SLIDER_NEWS,
        promise: getSliderNews()
    }
};

export const fetchNewsByRelated = (catId) => {
    return {
        type: FETCH_RELATED_NEWS,
        promise: getNewsByRelated(catId)
    }
};


export const updateNewsDetails = (newsDetails) => {
    return {
        type: UPDATE_NEWS_DETAIL,
        newsDetails: newsDetails,
    };
};


export const addCommentToNews = (newsId, comment) => {
    return {
        type: ADD_COMMENT,
        promise: addComment(newsId, comment),
    };
};

export const fetchUploadedNews = (pageNo, limit) => {
    return {
        type: FETCH_UPLOADED_NEWS_USER,
        promise: getUploadedNews(pageNo, limit)
    }
};

export const addToFav = (newsId) => {
    return {
        type: ADD_TO_FAV,
        promise: addNewsToFav(newsId)
    }
};


export const fetchFavNews = () => {
    return {
        type: FETCH_FAV_NEWS_USER,
        promise: getFavNews()
    }
};


export const fetchLast24News = () => {
    return {
        type: FETCH_LAST_NEWSES_LIST,
        promise: getLastNewsApi()
    }
};

