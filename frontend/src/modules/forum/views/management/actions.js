import axios from 'axios';
import { ROOT_URL } from '../../configs/config';

export const FORUMINFO_REQUEST = 'foruminfo_request';
export const FORUMINFO_SUCCESS = 'foruminfo_success';
export const FORUMINFO_FAILURE = 'foruminfo_failure';

export const getForumInfo = () => {
    return (dispatch, getState) => {
        const { isFetchingInfo } = getState();
        if (isFetchingInfo)
            return;
        dispatch({ type: FORUMINFO_REQUEST });
        axios.get(`${ROOT_URL}/api/forum/info`)
            .then((response) => {
                console.log('foruminfo_success', response);
                dispatch({
                    type: FORUMINFO_SUCCESS,
                    info: response.data
                })
            })
            .catch((errors) => {
                dispatch({
                    type: FORUMINFO_FAILURE,
                    errors: errors,
                })
            })
    }
}

export const USERSTATES_REQUEST = 'userstatus_request';
export const USERSTATES_SUCCESS = 'userstatus_success';
export const USERSTATES_FAILURE = 'userstatus_failure';
export const getUserStates = (username) => {
    return (dispatch, getState) => {
        const { isFetchingUserStates } = getState();
        if (isFetchingUserStates)
            return;
        dispatch({
            type: USERSTATES_REQUEST,
        });
        axios.get(`${ROOT_URL}/api/forum/userstates`, {
            params: {
                //TODO: correct params
                // username: username,
            }
        })
            .then((response) => {
                console.log('userstates_success', response);
                dispatch({
                    type: USERSTATES_SUCCESS,
                    userStates: response.data,
                });
            })
            .catch((errors) => {
                dispatch({
                    type: USERSTATES_REQUEST,
                    errors: errors,
                })
            })
    }
}


export const HOTPOSTS_REQUEST = 'hotposts_request';
export const HOTPOSTS_SUCCESS = 'hotposts_success';
export const HOTPOSTS_FAILURE = 'hotposts_failure';

export const getHotPosts = (collegeid, courseid, teacherid, time, timeType) => {
    return (dispatch, getState) => {
        const { isFetchingHotPosts } = getState();
        console.log("gethotposts");
        if (isFetchingHotPosts)
            return;
        dispatch({
            type: HOTPOSTS_REQUEST,
        })
        axios.get(`${ROOT_URL}/api/forum/hotposts`, {
            params: {
                collegeid,
                courseid,
                teacherid,
                time,
                timeType,
            }
        })
            .then((response) => {
                console.log("hotpost_success", response);
                dispatch({
                    type: HOTPOSTS_SUCCESS,
                    hotPosts: response.data,
                })
            })
            .catch((errors) => {
                dispatch({
                    type: HOTPOSTS_FAILURE,
                    errors: errors,
                })
            })
    }
}

export const COLLEGES_SUCCESS = 'colleges_success';
export const COLLEGES_FAILURE = 'colleges_failure';
export const getColleges = () => {
    return (dispatch, getState) => {
        axios.get(`${ROOT_URL}/api/forum/colleges`)
            .then((response) => {
                var collegeItems = new Array();
                for (var colleges in response.data) {
                    // console.log(colleges, response.data[colleges]);
                    collegeItems = collegeItems.concat(response.data[colleges]);
                }
                dispatch({
                    type: COLLEGES_SUCCESS,
                    collegeItems: collegeItems,
                });
            })
            .catch((errors) => {
                dispatch({
                    type: COLLEGES_FAILURE,
                    errors: errors,
                });
            })
    }
}

export const COURSES_SUCCESS = 'courses_success';
export const COURSES_FAILURE = 'courses_failure';
export const getCourses = (collegeid) => {
    console.log("getcourses", collegeid);
    return (dispatch, getState) => {
        axios.get(`${ROOT_URL}/api/forum/courses`, {
            params: {
                collegeid: collegeid,
            }
        })
            .then((response) => {
                dispatch({
                    type: COURSES_SUCCESS,
                    courseItems: response.data,
                })
            })
            .catch((errors) => {
                dispatch({
                    type: COURSES_FAILURE,
                    courseItems: undefined,
                })
            })
    }
}

export const TEACHERLIST_SUCCESS = "teacherlist_success";
export const TEACHERLIST_FAILURE = "teacherlist_failure";

export const getTeachers = (collegeid, courseid) => {
    return (dispatch, getState) => {
        axios.get(`${ROOT_URL}/api/forum/teacher_list`, {
            params: {
                collegeid: collegeid,
                courseid: courseid,
            }
        })
            .then((response) => {
                dispatch({
                    type: TEACHERLIST_SUCCESS,
                    teacherItems: response.data,
                });
            })
            .catch((errors) => {
                dispatch({
                    type: TEACHERLIST_FAILURE,
                    teacherItems: undefined,
                })
            })
    }
}

export const SET_TIMETYPE = 'set_timetype';
export const setTimeType = (timeType) => {
    return ({
        type: SET_TIMETYPE,
        timeType: timeType,
    })
}

export const SET_TIME = 'set_time';
export const setTime = (time) => {
    return ({
        type: SET_TIME,
        time: time,
    })
}
