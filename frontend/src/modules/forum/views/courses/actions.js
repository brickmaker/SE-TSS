import {DEBUG, ROOT_URL} from "../../configs/config"
import {withAuthHeader} from "../../utils/api"

export const GET_COURSES_INFO = 'get_courses_info';
export const GOT_COURSES_INFO = 'got_courses_info';
export const GET_COURSES = 'get_courses';
export const GOT_COURSES = 'got_courses';

export const getCoursesInfo = (collegeId) => {
    return (dispatch, getState) => {
        fetchCoursesInfo(collegeId)
            .then((data) => {
                dispatch({
                    type: GOT_COURSES_INFO,
                    info: data
                })
                dispatch(getCourses(collegeId, getState().forum.courses.currPage))
            })
    }
};

export const getCourses = (collegeId, pageId) => {
    return dispatch => {
        fetchCourses(collegeId, pageId)
            .then((data) => {
                dispatch({
                    type: GOT_COURSES,
                    currPage: pageId,
                    courses: data
                })
            })
    }
}

function fetchCoursesInfo(collegeId) {
    return fetch(`${ROOT_URL}/api/forum/courses_info?collegeid=${collegeId}`, {
        headers: withAuthHeader()
    })
        .then((response) => (response.json()))
}

function fetchCourses(collegeId, pageId) {
    return fetch(`${ROOT_URL}/api/forum/courses${DEBUG ? '' : `?collegeid=${collegeId}&pageid=${pageId}`}`, {
        headers: withAuthHeader()
    })
        .then((response) => (response.json()))
}
