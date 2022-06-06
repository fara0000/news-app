
import { getAllCategories } from "../../EndPoints/Category";
import { FETCH_CATEGORY } from "../Constants/category.constants";

export const fetchAllCategories = () => {
    return {
        type: FETCH_CATEGORY,
        promise: getAllCategories()
    }
};

