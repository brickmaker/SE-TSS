import {browserHistory} from 'react-router';

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
    create_user,
    data_about_user
} from '../utils/http_functions';
import {GET_USER_SUCCESS} from "../constants";


export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: LOGIN_USER_SUCCESS,
        payload: {
            token,
        },
    };
}


export function getUserSuccess(response) {
    localStorage.setItem('userName', response.name);
    return {
        type: GET_USER_SUCCESS,
        payload: {
            userName: response.name,
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
        browserHistory.push('/');
    };
}

export function redirectToRoute(route) {
    return () => {
        browserHistory.push(route);
    };
}


export function loginUser(username, password, type) {
    return function (dispatch) {
        dispatch(loginUserRequest());
        return get_token(username, password)
            .then(parseJSON)
            .then(response => {
                try {
                    dispatch(loginUserSuccess(response.token));
                    fetch('/api/user',{
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT '+ response.token,
                            'Content-Type': 'application/json'
                        },
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            var json =  JSON.parse(data);//转换为json对象
                            var user_type = json[0].user_type;
                            console.log(user_type);
                            console.log(USER[user_type]);
                            if (USER[type] != user_type) {
                                dispatch(loginUserFailure({
                                    response: {
                                        status: 403,
                                        statusText: 'Type Error',
                                    },
                                }));
                            } else {
                                dispatch(getUserSuccess(json[0]));
                                browserHistory.push('/main');
                                // if (user_type == "1") {
                                //     browserHistory.push('/student');
                                // } else if (user_type == "2") {
                                //     browserHistory.push('/teacher');
                                // } else if (user_type == "3") {
                                //     browserHistory.push('/staff');
                                // } else if (user_type == "4") {
                                //     browserHistory.push('/admin');
                                // }
                            }
                        })
                        .catch((e) => {
                            alert("身份验证失效，请重新登录");
                            browserHistory.push("/login");
                        });
                } catch (e) {
                    alert(e);
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token',
                        },
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure({
                    response: {
                        status: 403,
                        statusText: 'Invalid username or password',
                    },
                }));
            });


    };

}