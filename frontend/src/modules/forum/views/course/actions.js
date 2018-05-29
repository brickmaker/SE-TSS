import {DEBUG, ROOT_URL} from "../../configs/config"

export const GET_COURSE_INFO = 'get_course_info'
export const GOT_COURSE_INFO = 'got_course_info'
export const GET_COURSE_POSTS = 'get_course_posts'
export const GOT_COURSE_POSTS = 'got_course_posts'
export const CHECKED_SUBSCRIBED = 'checked_subscribed'

export const checkSubscribed = (uid, collegeId, courseId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/course_subscribed${DEBUG ? '' : `?uid=${uid}&collegeid=${collegeId}&courseid=${courseId}`}`)
        .then(res => res.json())
        .then((data) => {
            if (data.subscribed) {
                dispatch({
                    type: CHECKED_SUBSCRIBED,
                    subscribed: true
                })
            }
        })
}

export const getCourseInfo = (collegeId, courseId) => (dispatch, getState) => {
    fetchCourseInfo(collegeId, courseId)
        .then((data) => {
            dispatch({
                type: GOT_COURSE_INFO,
                courseInfo: data
            })
            dispatch(getPosts(collegeId, courseId, getState().forum.course.currPage))
        })
}

export const getPosts = (collegeId, courseId, pageId) => (dispatch, getState) => {
    fetchPosts(collegeId, courseId, pageId)
        .then((data) => {
            dispatch({
                type: GOT_COURSE_POSTS,
                currPage: pageId,
                posts: data.data
            })
        })
}

function fetchCourseInfo(collegeId, courseId) {
    return fetch(`${ROOT_URL}/api/forum/course${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}`}`)
        .then((response) => (response.json()))
}


function fetchPosts(collegeId, courseId, pageId) {
    return fetch(`${ROOT_URL}/api/forum/course_posts${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}&pageid=${pageId}`}`)
        .then((response) => (response.json()))
}
