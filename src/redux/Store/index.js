import { createStore,compose,applyMiddleware } from 'redux'; 
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import promiseMiddleware from '../Middleware/APICalls';
import rootReducer from '../Reducers';

let Middlewares = [thunk, promiseMiddleware];

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
  });
  
const reduxStore = createStore(
    rootReducer,
    composeEnhancers(
    compose(
        applyMiddleware(...Middlewares),
    ))
);
export default reduxStore;