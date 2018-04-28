import {ROOT_URL} from "../../configs/config"

export const GET_COURSES = 'get_courses';
export const GOT_COURSES = 'got_courses';

export const getCourses = (collegeId) => {
    return dispatch => {
        fetchCourses(collegeId)
            .then((data) => {
                dispatch({
                    type: GOT_COURSES,
                    courses: data
                })
            })
    }
};

function fetchCourses(collegeId) {
    return fetch(`${ROOT_URL}/api/forum/courses?collegeid=${collegeId}`)
        .then((response) => (response.json()))
}
