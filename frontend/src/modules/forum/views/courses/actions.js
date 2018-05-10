import {ROOT_URL} from "../../configs/config"

export const GET_COURSES_INFO = 'get_courses_info';
export const GOT_COURSES_INFO = 'got_courses_info';

export const getCoursesInfo = (collegeId) => {
    return dispatch => {
        fetchCoursesInfo(collegeId)
            .then((data) => {
                dispatch({
                    type: GOT_COURSES_INFO,
                    info: data
                })
            })
    }
};

function fetchCoursesInfo(collegeId) {
    return fetch(`${ROOT_URL}/api/forum/courses_info?collegeid=${collegeId}`)
        .then((response) => (response.json()))
}
