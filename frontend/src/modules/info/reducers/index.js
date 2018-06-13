import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';

export const infoReducer = combineReducers({
    routing: routerReducer,
    auth: auth,
});



