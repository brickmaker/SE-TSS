import {DEBUG, ROOT_URL} from "../../configs/config"

export const GET_TEACHER_INFO = 'get_teacher_info'
export const GOT_TEACHER_INFO = 'got_teacher_info'
export const GET_TEACHER_POSTS = 'get_teacher_posts'
export const GOT_TEACHER_POSTS = 'got_teacher_posts'

export const getTeacherInfo = (collegeId, courseId, teacherId) => (dispatch, getState) => {
    fetchTeacherInfo(collegeId, courseId, teacherId)
        .then((data) => {
            dispatch({
                type: GOT_TEACHER_INFO,
                teacherInfo: data
            })
            dispatch(getPosts(collegeId, courseId, teacherId, getState().forum.teacher.currPage))
        })
}

export const getPosts = (collegeId, courseId, teacherId, pageId) => dispatch => {
    fetchPosts(collegeId, courseId, teacherId, pageId)
        .then((data) => {
            dispatch({
                type: GOT_TEACHER_POSTS,
                currPage: pageId,
                posts: data.data
            })
        })
}

function fetchTeacherInfo(collegeId, courseId, teacherId) {
    return fetch(`${ROOT_URL}/api/forum/teacher?collegeid=${collegeId}&courseid=${courseId}&teacherid=${teacherId}`)
        .then((response) => (response.json()))
}

function fetchPosts(collegeId, courseId, teacherId, pageId) {
    return fetch(`${ROOT_URL}/api/forum/teacher_posts${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}&teacherid=${teacherId}&pageid=${pageId}`}`)
        .then((response) => (response.json()))
}
