import axios from 'axios';
import {ROOT_URL} from '../../configs/config';

export const REQUEST_USERINFO = "request_userinfo";
export const USERINFO_SUCCESS = "userinfo_success";
export const USERINFO_FAILURE = "userinfo_failure";
export const requestUserInfo = (uid)=>{
    return (dispatch, getState) =>{
        const {isFetching} = getState().forum.usercenter;
        if(isFetching){
            return;
        }
        dispatch({
            type: requestUserInfo,
        });

        axios.get(`${ROOT_URL}/api/forum/userinfo`, {
            params:{
                uid: uid,
            }
        })
        .then((response)=>{
            dispatch({
                type: USERINFO_SUCCESS,
                userInfo: response.data,
            })
        })
        .catch((errors)=>{
            dispatch({
                type: USERINFO_FAILURE,
                errors: errors,
            })
        })
    }
}

export const POSTUSERINFO = "postuserinfo";
export const POSTUSERINFO_SUCCESS = "postuserinfo_success";
export const POSTUSERINFO_FAILURE = "postuserinfo_failure";
export const postUserInfo = (uid, newUsername, newSignature, imageFile)=>{
    return (dispatch, getState) => {
        const {isPosting} = getState().forum.usercenter;
        if(isPosting){
            return;
        }
        dispatch({type: postUserInfo});
        let body = {};
        body["uid"] = uid;
        body["username"] = newUsername;
        body["signature"] = newSignature;
        if(imageFile){
            body["imagefile"] = imageFile;
        }
        console.log(body);
        axios.post(`${ROOT_URL}/api/forum/userinfo`,body)
        .then((response)=>{
            dispatch({
                type: POSTUSERINFO_SUCCESS,
            });
        })
        .catch((errors)=>{
            dispatch({
                type: POSTUSERINFO_FAILURE,
            });
        })
    }
}

export const SET_FINISHED = "set_finished";
export const setFinished = (finished)=>{
    return ({
        type: SET_FINISHED,
        finished: finished,
    });
}