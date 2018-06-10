import {BrowserRouter} from 'react-router-dom';

import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGOUT_USER,
    USER,
} from '../constants/index';

import {parseJSON} from '../utils/misc';
import {
    get_token,
} from '../utils/http_functions';

export function loginUserSuccess(token, type, status) {
    localStorage.setItem('token', token);
    localStorage.setItem('type', type);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token,
            user_type: type,
            status: status,
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
        BrowserRouter.push('/');
    };
}

export function redirectToRoute(route) {
    return () => {
        BrowserRouter.push(route);
    };
}


export function loginUser(username, password, type) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return get_token(username, password)
            .then(parseJSON)
            .then(response => {
                try {
                    fetch('/api/user',{
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT '+ response.token,
                            'Content-Type': 'application/json'
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            var json =  JSON.parse(data);
                            var user_type = json[0].user_type;
                            if (USER[type] !== user_type) {
                                dispatch(loginUserFailure({
                                    response: {
                                        status: 403,
                                        statusText: '用户类型错误',
                                    },
                                }));
                            } else {
                                var id_number = json[0].id_number;
                                var cut_id_number = id_number.substr(id_number.length-6);
                                localStorage.setItem('userName',username);
                                if (cut_id_number === password) {
                                    dispatch(loginUserSuccess(response.token, user_type, 200));
                                } else {
                                    dispatch(loginUserSuccess(response.token, user_type, 201));
                                }
                                BrowserRouter.push('/main');
                            }
                        })
                        .catch((e) => {
                            dispatch(loginUserFailure({
                                response: {
                                    status: 500,
                                    statusText: '获取信息失败',
                                },
                            }));
                            BrowserRouter.push("/login");
                        });
                } catch (e) {
                    alert(e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: '身份验证失效',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure({
                    response: {
                        status: 403,
                        statusText: '用户名或密码错误',
                    },
                }));
            });
    };
    return true;

}