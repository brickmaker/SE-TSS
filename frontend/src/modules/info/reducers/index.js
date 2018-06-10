import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import data from './data';

export const infoReducer = combineReducers({
    routing: routerReducer,
    /* your reducers */
    auth: auth,
    data : data,
});



