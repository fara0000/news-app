import { FETCH_CATEGORY_FAILURE, FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS } from "../Constants/category.constants";


const initialState = {
    categoryList: []
}

const categoryReducer = (state = initialState, action) => {
    const { type } = action;
    
    switch (type) {
        case FETCH_CATEGORY_REQUEST:
            return { ...state, isAllCatloading: true }
        case FETCH_CATEGORY_SUCCESS:
            return { ...state, categoryList: action.response.data, isAllCatloading: false }
        case FETCH_CATEGORY_FAILURE:
            return { ...state, isAllCatloading: false }
        default:
            return state;
    }
}



export default categoryReducer;