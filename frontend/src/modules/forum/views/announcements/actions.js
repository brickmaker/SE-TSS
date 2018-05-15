import axios from 'axios';
import { ROOT_URL } from '../../configs/config';

export const ANNCS_REQUEST = "anncs_request";
export const ANNCS_SUCCESS = "anncs_success";
export const ANNCS_FAILURE = "anncs_failure";

export function getAnncs(uid, collegeId, courseId, teacherId, nextPageNum, pageSize) {
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (isFetching)
            return;
        dispatch({ type: ANNCS_REQUEST });
        var params = {};
        if (uid) {
            params["uid"] = uid;
        }
        else {
            if (collegeId)
                params["collegeId"] = collegeId;
            if (courseId)
                params["courseId"] = courseId;
            if (teacherId)
                params["teacherId"] = teacherId;
        };
        console.log("params", params, collegeId);

        axios.get(`${ROOT_URL}/api/forum/announcements`, {
            //TODO:
            // params
        })
            .then((response) => {
                console.log("anncs", response.data[0]);
                dispatch({
                    type: ANNCS_SUCCESS,
                    //TODO:
                    anncs: response.data[0]["anncs"],
                    anncNum: response.data[0]["anncNum"],
                })
            })
            .catch((errors) => {
                dispatch({
                    type: ANNCS_FAILURE,
                    errors: errors,
                })
            })
    }
}


export const SET_EDITING = "set_editing";
export function setEditing(isEditing){
    return ({
        type: SET_EDITING,
        isEditing: isEditing,
    });
}


export const SET_PAGENUM = 'set_pagenum';
export function setPageNum(pageNum){
    return ({
        type: SET_PAGENUM,
        pageNum: pageNum,
    });
}