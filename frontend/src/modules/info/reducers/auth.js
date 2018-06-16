import jwtDecode from 'jwt-decode';

import { createReducer } from '../utils/misc';
import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
} from '../constants/index';

const initialState = {
    token: null,
    username: null,
    type: null,
    isAuthenticated: false,
    isAuthenticating: false,
    status: null,
    statusText: null,
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state) =>
        Object.assign({}, state, {
            isAuthenticating: true,
            statusText: null,
        }),
    [LOGIN_USER_SUCCESS]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: true,
            token: payload.token,
            username: jwtDecode(payload.token).username,
            status: payload.status,
            type: payload.type,
            statusText: '成功登录',
        }),
    [LOGIN_USER_FAILURE]: (state, payload) =>
        Object.assign({}, state, {
            isAuthenticating: false,
            isAuthenticated: false,
            token: null,
            username: null,
            type: null,
            statusText: `登录失败: ${payload.status} ${payload.statusText}`,
        }),
    [LOGOUT_USER]: (state) =>
        Object.assign({}, state, {
            isAuthenticated: false,
            token: null,
            username: null,
            type: null,
            statusText: '成功注销',
        }),
});
