import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux';

import {forumReducer} from '../modules/forum/reducers';
import {scoreReducer} from "../modules/scorem/reducers";

const rootReducer = combineReducers({
    score: scoreReducer,
    forum: forumReducer
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

