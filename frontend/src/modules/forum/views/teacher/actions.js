import {ROOT_URL} from "../../configs/config"

export const GET_TEACHER_INFO = 'get_teacher_info'
export const GOT_TEACHER_INFO = 'got_teacher_info'

export const getTeacherInfo = (collegeId, courseId, teacherId) => dispatch => {
    fetchTeacherInfo(collegeId, courseId, teacherId)
        .then((data) => {
            dispatch({
                type: GOT_TEACHER_INFO,
                teacherInfo: data
            })
        })
}

function fetchTeacherInfo(collegeId, courseId, teacherId) {
    return fetch(`${ROOT_URL}/api/forum/teacher?collegeid=${collegeId}&courseid=${courseId}&teacherid=${teacherId}`)
        .then((response) => (response.json()))
}
