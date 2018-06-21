import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import thunk from "redux-thunk";
import {persistStore} from 'redux-persist';

import {infoReducer} from '../modules/info/reducers';
import {forumReducer} from '../modules/forum/reducers';
import {scoreReducer} from "../modules/scorem/reducers";
import {xkxtReducer} from '../modules/xkxt/reducers';


const rootReducer = combineReducers({
    info : infoReducer,
    xkxt: xkxtReducer,
    forum: forumReducer,
    score: scoreReducer,
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

