import axios from 'axios';


// Get all news
export const getAllNews = (pageNo, limit) => {
    const url = `news/getAllNews/${pageNo}/${limit}`;
    return axios.get(url)
        .then(response => {
            console.log("getAllNews", response)
            return response.data;
        });
}


// Get a single news
export const getNewsDetailsById = (newsId) => {
    const url = `news/getById/${newsId}`;
    return axios.get(url)
        .then(response => {
            console.log("getNewsDetailsById", response)
            return response.data;
        });
}


// Get a news by category
export const getNewsByCategory = (catId) => {
    const url = `news/getByCategory/${catId}/1/10`;
    return axios.get(url)
        .then(response => response.data);
}


// Get a slider news
export const getSliderNews = () => {
    const url = `news/getAllNews/slider`;
    return axios.get(url)
        .then(response => response.data);
}


// Get related new by cat id
export const getNewsByRelated = (catId) => {
    const url = `news/getrelatedNews/${catId}`;

    return axios.get(url)
        .then(response => response.data);
}

// Add comment
export const addComment = (newsId, comment) => {
    const url = `news/add/comment/onNews`;

    const body = {
        "newsId": newsId,
        "comment": comment
    }
    console.log(body)
    return axios.put(url, body)
        .then(response => {
            console.log(response)
            return response.data
        }).catch(err => console.log(err.response))
}


// Get uploaded news
export const getUploadedNews = (pageNo, limit) => {
    const url = `news/getAllNews/me/${pageNo}/${limit}`;
    return axios.get(url)
        .then(response => response.data);
}


// Add news to favorite
export const addNewsToFav = (newsId) => {
    const url = `users/addToFav/${newsId}`;
    return axios.put(url)
        .then(response => {
            console.log("ressponse", response)
            return response.data;
        }).catch(err => console.log(err.response))
}


// Get fav news
export const getFavNews = () => {
    const url = `users/getFavOfUser/all`;
    return axios.get(url)
        .then(response => {
            console.log("response", response)
            return response.data;
        });
}


// Check News exists or not
export const checkFavNewsExists = (newsId) => {
    const url = `users/checkExists/fav/${newsId}`;
    return axios.get(url)
        .then(response => {
            console.log("response", response)

            return response.data;
        });
}


// Get last 24 news
export const getLastNewsApi = () => {
    const url = `news/getNews/by/today`;
    return axios.get(url)
        .then(response => {
            console.log("response", response)
            return response.data;
        });
}