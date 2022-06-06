
import axios from 'axios';


// Get all categories
export const getAllCategories = () => {
    const url = 'category/getAllCat';
    return axios.get(url)
        .then(response => response.data);
}




// // Get a single news
// export const getNewsDetailsById = (newsId) => {
//     const url = `news/getById/${newsId}`;
//     return axios.get(url)
//         .then(response => response.data);
// }