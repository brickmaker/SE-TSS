/* eslint camelcase: 0 */

import axios from 'axios';

const tokenConfig = (token) => ({
    headers: {
        'Authorization': 'JWT '+token, // eslint-disable-line quote-props
    },
});

export function validate_token(token) {
    return axios.post('/api/is_token_valid', {
        token,
    });
}

export function get_github_access() {
    window.open(
        '/github-login',
        '_blank' // <- This is what makes it open in a new window.
    );
}

export function create_user(username,id, password, user_type) {
    return axios.post('/api/create_user', {
        username,
        id,
        password,
        user_type
    });
}


export function create_lesson(id, name, credit, capacity, classroom, assessment, state, token){
    return axios.put('/api/course/1',[tokenConfig(token),{
        id, name, credit, capacity, classroom, assessment, state
    }]);
}
export function process_lesson(id, name, credit, capacity, classroom, assessment, state){
    return axios.put('/api/course/1',{
        id, name, credit, capacity, classroom, assessment, state
    });
}
export function get_token(username, password) {
    return axios.post('/api/get_token', {
        username,
        password,
    });
}

export function has_github_token(token) {
    return axios.get('/api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
    return axios.get('/api/user', tokenConfig(token));
}
