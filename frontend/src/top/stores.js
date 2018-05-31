import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import thunk from "redux-thunk";

import {forumReducer} from '../modules/forum/reducers';

const rootReducer = combineReducers({
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

