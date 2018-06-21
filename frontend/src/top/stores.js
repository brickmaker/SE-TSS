import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import thunk from "redux-thunk";
import {persistStore} from 'redux-persist';

import {infoReducer} from '../modules/info/reducers';

import {forumReducer} from '../modules/forum/reducers';
import {xkxtReducer} from '../modules/xkxt/reducers';
import {onlineTestingReducer} from "../modules/onlineTesting/reducers";


const rootReducer = combineReducers({
    info : infoReducer,
    xkxt: xkxtReducer,
    forum: forumReducer,
    online_testing: onlineTestingReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var store;
store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

persistStore(store);

export default store;

