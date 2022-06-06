import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_TO_FAV_FAILURE, ADD_TO_FAV_REQUEST, ADD_TO_FAV_SUCCESS, FETCH_FAV_NEWS_USER_FAILURE, FETCH_FAV_NEWS_USER_REQUEST, FETCH_FAV_NEWS_USER_SUCCESS, FETCH_LAST_NEWSES_LIST, FETCH_LAST_NEWSES_LIST_REQUEST, FETCH_LAST_NEWSES_LIST_SUCCESS, FETCH_NEWS_BY_CATEGORY_FAILURE, FETCH_NEWS_BY_CATEGORY_REQUEST, 
    FETCH_NEWS_BY_CATEGORY_SUCCESS, FETCH_NEWS_DETAILS_FAILURE, 
    FETCH_NEWS_DETAILS_REQUEST, FETCH_NEWS_DETAILS_SUCCESS, 
    FETCH_NEWS_FAILURE, FETCH_NEWS_REQUEST, FETCH_NEWS_SUCCESS, FETCH_RELATED_NEWS_FAILURE, FETCH_RELATED_NEWS_REQUEST, FETCH_RELATED_NEWS_SUCCESS, FETCH_SLIDER_NEWS_FAILURE, FETCH_SLIDER_NEWS_REQUEST, FETCH_SLIDER_NEWS_SUCCESS,
    FETCH_UPLOADED_NEWS_USER_FAILURE,
    FETCH_UPLOADED_NEWS_USER_REQUEST,
    FETCH_UPLOADED_NEWS_USER_SUCCESS,
    UPDATE_NEWS_DETAIL
} from "../Constants/news.constants";

const initialState = {
    newsList: [],
    newsDetails: {},
    newsListByCategory: [],
    hasMoreAllNews: false,
    sliderNews: [],
    isLoadingFetchUploadNews: false,
    uploadedNewsList: [],
    hasMoreUploadedNews: false,
    isLoadingAddToFav: false,
    isLoadingNewsFav: false,
    newsListByFav: [],
    favData: {},
    isLoadingNewsLast: false,
    newsListLast24: [],
    // newsListByRelated: []
}

const newsReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case FETCH_NEWS_REQUEST:
            return { ...state, loading: true }
        case FETCH_NEWS_SUCCESS:
            {
                 const {data =[],count, reset} =  action.response;
                 
                 console.log("datttttt********* length", state.newsList.length)
                 console.log("datttttt", state.newsList)
                 console.log("countcount", data.length)
                 let hasMore  = true;
                 if(state.newsList.length >= count) {
                     console.log("comingggggggg")
                    hasMore = false;
                 }       

                 console.log("hasMore", hasMore)

                 if(action.reset)
                     return {...state,newsList:data,hasMoreAllNews:hasMore}; 
                 else 
                    return {...state,newsList:[...state.newsList,...data],loading: false, hasMoreAllNews:hasMore};
            }
        case FETCH_NEWS_FAILURE:
            return { ...state, loading: false }


        // Slider News
        case FETCH_SLIDER_NEWS_REQUEST:
            return { ...state, isLoadingSliderNews: true }
        case FETCH_SLIDER_NEWS_SUCCESS:
            return { ...state, sliderNews: action.response.data, isLoadingSliderNews: false }
        case FETCH_SLIDER_NEWS_FAILURE:
            return { ...state, isLoadingSliderNews: false }

        
            
        case FETCH_NEWS_DETAILS_REQUEST:
            return { ...state, isLoadingDetails: true }
        case FETCH_NEWS_DETAILS_SUCCESS:
            return { ...state, newsDetails: action.response.data, isLoadingDetails: false }
        case FETCH_NEWS_DETAILS_FAILURE:
            return { ...state, isLoadingDetails: false }


        // fetch by related id
        case FETCH_RELATED_NEWS_REQUEST:
                return { ...state, isLoadingNewsByRelated: true }
        case FETCH_RELATED_NEWS_SUCCESS:
                return { ...state, newsListByRelated: action.response.data, isLoadingNewsByRelated: false }
        case FETCH_RELATED_NEWS_FAILURE:
                return { ...state, isLoadingNewsByRelated: false }

        // fetch by cat id
        case FETCH_NEWS_BY_CATEGORY_REQUEST:
            return { ...state, isLoadingNewsByCat: true }
        case FETCH_NEWS_BY_CATEGORY_SUCCESS:
            return { ...state, newsListByCategory: action.response.data, isLoadingNewsByCat: false }
        case FETCH_NEWS_BY_CATEGORY_FAILURE:
            return { ...state, isLoadingNewsByCat: false }
        


        case UPDATE_NEWS_DETAIL: {
            // initialState.newsDetails = action.newsDetails;
            return { ...state, newsDetails: action.newsDetails };
        }


        // Add Comment
        case ADD_COMMENT_REQUEST:
            return { ...state, isLoadingAddComment: true }
        case ADD_COMMENT_SUCCESS:
            return { ...state, commentData: action.response.data, isLoadingAddComment: false }
        case ADD_COMMENT_FAILURE:
            return { ...state, isLoadingAddComment: false }



        // fetch news uploaded by user
        case FETCH_UPLOADED_NEWS_USER_REQUEST:
            return { ...state, isLoadingFetchUploadNews: true }
        case FETCH_UPLOADED_NEWS_USER_SUCCESS:
           {
          
                const {data =[],count} =  action.response;
                
                let hasMore  = true;
                if(!data.length)
                    hasMore = false;
                if(action.reset)
                    return {...state,uploadedNewsList:data,hasMoreUploadedNews:hasMore}; 
                else
                    return {...state,uploadedNewsList:[...state.uploadedNewsList,...data],isLoadingFetchUploadNews: false, hasMoreAllNews:hasMore};
               // return { ...state, newsList: action.response.data, loading: false, hasMoreAllNews:hasMore }
           
           }
        case FETCH_UPLOADED_NEWS_USER_FAILURE:
            return { ...state, isLoadingFetchUploadNews: false }
              
            
        // Add Comment
        case ADD_TO_FAV_REQUEST:
            return { ...state, isLoadingAddToFav: true }
        case ADD_TO_FAV_SUCCESS:
            return { ...state, favData: action.response, isLoadingAddToFav: false }
        case ADD_TO_FAV_FAILURE:
            return { ...state, isLoadingAddToFav: false }
        




        // fetch favorite news
        case FETCH_FAV_NEWS_USER_REQUEST:
            return { ...state, isLoadingNewsFav: true }
        case FETCH_FAV_NEWS_USER_SUCCESS:
            return { ...state, newsListByFav: action.response.data, isLoadingNewsFav: false }
        case FETCH_FAV_NEWS_USER_FAILURE:
            return { ...state, isLoadingNewsFav: false }


        // fetch last 24 news
        case FETCH_LAST_NEWSES_LIST_REQUEST:
            return { ...state, isLoadingNewsLast: true }
        case FETCH_LAST_NEWSES_LIST_SUCCESS:
            return { ...state, newsListLast24: action.response.data, isLoadingNewsLast: false }
        case FETCH_NEWS_BY_CATEGORY_FAILURE:
            return { ...state, isLoadingNewsLast: false }


        default:
            return state;
    }
}




export default newsReducer;