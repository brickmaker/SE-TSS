import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import thunk from "redux-thunk";

import {forumReducer} from '../modules/forum/reducers';
import {xkxtReducer} from '../modules/xkxt/reducers';

const rootReducer = combineReducers({
    xkxt: xkxtReducer,
    forum: forumReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;

