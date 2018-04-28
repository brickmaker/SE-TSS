import {ROOT_URL} from "../../configs/config"

export const GET_COURSE_INFO = 'get_course_info'
export const GOT_COURSE_INFO = 'got_course_info'

export const getCourseInfo = (collegeId, courseId) => dispatch => {
    fetchCourseInfo(collegeId, courseId)
        .then((data) => {
            dispatch({
                type: GOT_COURSE_INFO,
                courseInfo: data
            })
        })
}

function fetchCourseInfo(collegeId, courseId) {
    return fetch(`${ROOT_URL}/api/forum/course?collegeid=${collegeId}&courseid=${courseId}`)
        .then((response) => (response.json()))
}
