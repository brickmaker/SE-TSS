import { REQUEST_USERINFO, USERINFO_SUCCESS, USERINFO_FAILURE, POSTUSERINFO, POSTUSERINFO_SUCCESS, POSTUSERINFO_FAILURE, SET_FINISHED } from "./actions";

const initialState = {
    userInfo: {},
    isFetching: false,
    errors: {},
    isPosting: false,
    hasFinished: false,
    hasSucceded: false,
}

export const usercenterReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_USERINFO:
            return (Object.assign({}, state, {
                isFetching: true,
            }));
        case USERINFO_SUCCESS:
            return (Object.assign({}, state, {
                userInfo: action.userInfo,
                isFetching: false,
            }));
        case USERINFO_FAILURE:
            return (Object.assign({}, state, {
                userInfo: {},
                errors: action.errors,
                isFetching: false,
            }));
        case POSTUSERINFO:
            return (Object.assign({}, state, {
                isPosting: true,
            }));
        case POSTUSERINFO_SUCCESS:
            return (Object.assign({}, state, {
                isPosting: false,
                hasFinished: true,
                hasSucceded: true,
            }));
        case POSTUSERINFO_FAILURE:
            return (Object.assign({}, state, {
                isPosting: false,
                hasFinished: true,
                hasSucceded: false,
            }));
        case SET_FINISHED:
            return (Object.assign({}, state, {
                hasFinished: action.finished,
            }));
        default: return state;
    }
}