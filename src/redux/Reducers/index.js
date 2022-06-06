import { persistCombineReducers } from 'redux-persist';
import Config from '../../Config/default'
import AsyncStorage from '@react-native-community/async-storage';
import newsReducer from './newsReducers';
import categoryReducer from './categoryReducers';
import authReducer from './authReducers';
import { USER_LOGOUT } from '../Constants';


const config = {
    key: Config.appStorageKey,
    storage:AsyncStorage,
    // blacklist: [
    //     'news',
    // ],
    whitelist: ['auth']

};


const appReducer =  persistCombineReducers(config, {
    news: newsReducer,
    category: categoryReducer,
    auth: authReducer
});


const rootReducer = (state, action) => {
    console.log("action", action)
    console.log("state", state)
    if (action.type === USER_LOGOUT) {
        state.newsList = [];
        state = undefined;
    }
    
    return appReducer(state, action);
}

export default rootReducer;