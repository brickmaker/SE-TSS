import {DEBUG, ROOT_URL} from "../../configs/config"
import {withAuthHeader} from "../../utils/api"

export const GET_TEACHER_INFO = 'get_teacher_info'
export const GOT_TEACHER_INFO = 'got_teacher_info'
export const GET_TEACHER_POSTS = 'get_teacher_posts'
export const GOT_TEACHER_POSTS = 'got_teacher_posts'
export const CHECKED_SUBSCRIBED = 'checked_teacher_subscribed'
export const SUBSCRIBE_COURSE = 'subscribe_teacher'
export const UNSUBSCRIBE_COURSE = 'unsubscribe_teacher'
export const POSTING = 'teacher_posting'
export const POST_SUCCESS = 'teacher_post_success'
export const POST_FAIL = 'teacher_post_fail'
export const CLOSE_DIALOG = 'close_teacher_dialog'

export const newPost = (uid, collegeId, courseId, teacherId, title, content, fileId) => (dispatch, getState) => {
    dispatch({
        type: POSTING
    })
    fetch(
        `${ROOT_URL}/api/forum/teacher_newpost`,
        {
            method: 'POST',
            headers: withAuthHeader(),
            body: JSON.stringify({
                collegeId: collegeId,
                courseId: courseId,
                teacherId: teacherId,
                title: title,
                content: content,
                fileId: fileId
            })
        }
    )
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            // todo: post test
            dispatch({
                type: POST_SUCCESS
            })
            dispatch(getPosts(collegeId, courseId, teacherId, getState().forum.teacher.currPage))
            // todo: fail check
        })
}

export const subscribe = (uid, collegeId, courseId, teacherId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/teacher_subscribe${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}&teacherid=${teacherId}`}`, {
        headers: withAuthHeader()
    })
        .then(res => res.json())
        .then((data) => {
            dispatch({
                type: SUBSCRIBE_COURSE,
                subscribed: data.subscribed
            })
        })
}

export const unsubscribe = (uid, collegeId, courseId, teacherId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/teacher_unsubscribe${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}&teacherid=${teacherId}`}`, {
        headers: withAuthHeader()
    })
        .then(res => res.json())
        .then((data) => {
            dispatch({
                type: UNSUBSCRIBE_COURSE,
                subscribed: data.subscribed
            })
        })
}

export const checkSubscribed = (uid, collegeId, courseId, teacherId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/teacher_subscribed${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}&teacherid=${teacherId}`}`, {
        headers: withAuthHeader()
    })
        .then(res => res.json())
        .then((data) => {
            dispatch({
                type: CHECKED_SUBSCRIBED,
                subscribed: data.subscribed
            })
        })
}
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
    return fetch(`${ROOT_URL}/api/forum/teacher?collegeid=${collegeId}&courseid=${courseId}&teacherid=${teacherId}`, {
        headers: withAuthHeader()
    })
        .then((response) => (response.json()))
}

function fetchPosts(collegeId, courseId, teacherId, pageId) {
    return fetch(`${ROOT_URL}/api/forum/teacher_posts${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}&teacherid=${teacherId}&pageid=${pageId}`}`, {
        headers: withAuthHeader()
    })
        .then((response) => (response.json()))
}
