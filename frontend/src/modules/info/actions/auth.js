import {BrowserRouter, Link} from 'react-router-dom';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    USER,
} from '../constants/index';


import {BACKEND_SERVER_URL, BACKEND_API} from "../config";


export function loginUserSuccess(token, type, name, status) {
    localStorage.setItem('token', token);
    localStorage.setItem('type', type);
    localStorage.setItem('name', name);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token: token,
            user_type: type,
            status: status,
            name: name,
        },
    };
}

export function loginUserFailure(error) {
    localStorage.removeItem('token');
    return {
        type: LOGIN_USER_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}


export function loginUserRequest() {
    return {
        type: LOGIN_USER_REQUEST,
    };
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER,
    };
}

export function logoutAndRedirect() {
    return (dispatch) => {
        dispatch(logout());
    };
}


function get_token(username, password) {
    let data = {};
    data.username = username;
    data.password = password;
    return postRes(BACKEND_API.get_token, data);
}


export function login(username, password, type) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        get_token(username, password)
            .then(response => {
                try {
                    getRes(BACKEND_API.get_user, response.token)
                        .then((data) => {
                            let json = JSON.parse(data);
                            let user_type = json[0].user_type;
                            if (USER[type] !== user_type) {
                                dispatch(loginUserFailure({
                                    response: {
                                        status: 403,
                                        statusText: '用户类型错误',
                                    },
                                }));
                            } else {
                                let id_number = json[0].id_number;
                                let name = json[0].name;
                                let cut_id_number = id_number.substr(id_number.length - 6);
                                if (cut_id_number === password) {
                                    dispatch(loginUserSuccess(response.token, user_type, name, 200));
                                } else {
                                    dispatch(loginUserSuccess(response.token, user_type, name, 201));
                                }
                            }
                        })
                        .catch(() => {
                            dispatch(loginUserFailure({
                                response: {
                                    status: 403,
                                    statusText: '用户名或密码错误',
                                },
                            }));
                        });
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 500,
                            statusText: '服务器无响应',
                        },
                    }));
                }
            })
            .catch(() => {
                dispatch(loginUserFailure({
                    response: {
                        status: 500,
                        statusText: '服务器无响应',
                    },
                }));
            });
    };
}

export function getRes(resource, token = localStorage.getItem('token')) {
    let opts = {
        method: 'GET',
        headers: {
            Authorization: 'JWT ' + token,
            'Content-Type': 'application/json'
        },
    };
    let url = `${BACKEND_SERVER_URL}${resource}`;
    return fetch(url, opts)
        .then((response) => response.json())
        .catch((e) => console.log(e));
}

export function postRes(resource, data) {
    return fetch(`${BACKEND_SERVER_URL}${resource}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => (response.json()))
        .catch((e) => console.log(e));
}