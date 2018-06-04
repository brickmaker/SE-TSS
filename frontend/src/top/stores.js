import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';
import thunk from "redux-thunk";

import {forumReducer} from '../modules/forum/reducers';
import {scoreReducer} from "../modules/scorem/reducers";

const rootReducer = combineReducers({
    score: scoreReducer,
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

