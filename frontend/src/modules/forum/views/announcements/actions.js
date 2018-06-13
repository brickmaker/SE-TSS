import axios from 'axios';
import { ROOT_URL, DEBUG } from '../../configs/config';
import { Title } from '@material-ui/icons/es';
import { withAuthHeader } from '../../utils/api';

export const ANNCS_REQUEST = "anncs_request";
export const ANNCS_SUCCESS = "anncs_success";
export const ANNCS_FAILURE = "anncs_failure";

export function getAnncs(uid, collegeId, courseId, teacherId, nextPageNum, pageSize) {
    return (dispatch, getState) => {
        const { isFetching } = getState().forum.annc;
        if (isFetching)
            return;
        dispatch({ type: ANNCS_REQUEST });
        var params = {};
        if (!DEBUG) {
            if (uid) {
                params["user_wise"] = uid;
            }
            else {
                if (collegeId)
                    params["collegeid"] = collegeId;
                if (courseId)
                    params["courseid"] = courseId;
                if (teacherId)
                    params["teacherid"] = teacherId;
            };
            params["pagenum"] = nextPageNum;
            params["pagesize"] = pageSize;
        }
        // console.log("params", params, collegeId);

        axios.get(`${ROOT_URL}/api/forum/announcements`, {
            params,
            headers: withAuthHeader(),
        })
            .then((response) => {
                console.log("anncs", response.data[0]);
                dispatch({
                    type: ANNCS_SUCCESS,
                    anncs: response.data["anncs"],
                    anncNum: response.data["anncNum"],
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


export const SET_HASFINISHED = "set_hasfinished";
export const setHasFinished = (hasFinished) => {
    return ({
        type: SET_HASFINISHED,
        hasFinished: hasFinished,
    });
}



export const NEWANNC_REQUEST = "newannc_request";
export const NEWANNC_SUCCESS = "newannc_success";
export const NEWANNC_FAILURE = "newannc_failure";
export const postAnnc = (uid, title, content, collegeid, courseid, teacherid) => {
    console.log("post", title, content, collegeid, courseid, teacherid);
    return (dispatch, getState) => {
        const { isPosting } = getState().forum.annc;
        if (isPosting)
            return;
        dispatch({
            type: NEWANNC_REQUEST,
        })
        axios.post(`${ROOT_URL}/api/forum/announcements`, {
            uid,
            title,
            content,
            path: {
                collegeid,
                courseid,
                teacherid,
            }
        })
            .then((response) => {
                dispatch({
                    type: NEWANNC_SUCCESS,
                });
            })
            .catch((errors) => {
                dispatch({
                    type: NEWANNC_FAILURE,
                    errors: errors,
                });
            })
    }
}

export const SECTIONNAMES_SUCCESS = "sectionnames_success";
export const SECTIONNAMES_FAILURE = "sectionnames_failure";
export const getSectionNames = (sectionids) => {
    return (dispatch, getState) => {
        axios.get(`${ROOT_URL}/api/forum/sectionnames`, {
            params: {
                sectionids,
            },
            headers: withAuthHeader(),
        })
            .then((response) => {
                dispatch({
                    type: SECTIONNAMES_SUCCESS,
                    sectionNames: response.data,
                });
            })
            .catch((errors) => {
                dispatch({
                    type: SECTIONNAMES_FAILURE,
                    errors: errors,
                });
            })
    }
}