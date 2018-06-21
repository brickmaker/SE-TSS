import {DEBUG, ROOT_URL} from "../../configs/config"
import axios from "axios"
import {withAuthHeader} from "../../utils/api"

export const GET_COURSE_INFO = 'get_course_info'
export const GOT_COURSE_INFO = 'got_course_info'
export const GET_COURSE_POSTS = 'get_course_posts'
export const GOT_COURSE_POSTS = 'got_course_posts'
export const CHECKED_SUBSCRIBED = 'checked_course_subscribed'
export const SUBSCRIBE_COURSE = 'subscribe_course'
export const UNSUBSCRIBE_COURSE = 'unsubscribe_course'
export const POSTING = 'course_posting'
export const POST_SUCCESS = 'course_post_success'
export const POST_FAIL = 'course_post_fail'
export const CLOSE_DIALOG = 'close_course_dialog'

export const newPost = (uid, collegeId, courseId, title, content, fileId) => (dispatch, getState) => {
    dispatch({
        type: POSTING
    })
    /*
    axios.post(
        `${ROOT_URL}/api/forum/course_newpost`,
        {
            uid: "1", // todo: remove uid
            collegeId: collegeId,
            courseId: courseId,
            titleData: titleData,
            content: content,
            fileId: fileId
        }
    )
    */
    const postData = {
        uid: "1", // todo: remove uid
        collegeId: collegeId,
        courseId: courseId,
        title: title,
        content: content,
        fileId: fileId
    }
    console.log(postData)
    fetch(
        `${ROOT_URL}/api/forum/course_newpost`,
        {
            method: 'POST',
            headers: withAuthHeader({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(postData)
        }
    )
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                console.log(data)
            } else {
                dispatch({
                    type: POST_SUCCESS
                })
                dispatch(getPosts(collegeId, courseId, getState().forum.course.currPage))
            }
        })
}

export const subscribe = (uid, collegeId, courseId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/course_subscribe${DEBUG ? '' : `?&collegeid=${collegeId}&courseid=${courseId}`}`, {
        headers: withAuthHeader()
    })
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                // todo: deal with error
            } else {
                dispatch({
                    type: SUBSCRIBE_COURSE,
                    subscribed: data.subscribed
                })
            }
        })
}

export const unsubscribe = (uid, collegeId, courseId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/course_unsubscribe${DEBUG ? '' : `?&collegeid=${collegeId}&courseid=${courseId}`}`, {
        headers: withAuthHeader()
    })
        .then(res => res.json())
        .then((data) => {
            if (data.error) {
                // todo: deal with error
            } else {
                dispatch({
                    type: UNSUBSCRIBE_COURSE,
                    subscribed: data.subscribed
                })
            }
        })
}

export const checkSubscribed = (uid, collegeId, courseId) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/api/forum/course_subscribed${DEBUG ? '' : `?&collegeid=${collegeId}&courseid=${courseId}`}`, {
        headers: withAuthHeader()
    })
        .then(res => {
            if (!res.ok) {
                console.log(res)
            }
            else
                return res.json()
        })
        .then((data) => {
            if (data.error) {
                // todo: deal with error
            } else {
                dispatch({
                    type: CHECKED_SUBSCRIBED,
                    subscribed: data.subscribed
                })
            }
        })
}

export const getCourseInfo = (collegeId, courseId) => (dispatch, getState) => {
    fetchCourseInfo(collegeId, courseId)
        .then((data) => {
            if (data.error) {
                // todo: error handle
            } else {
                dispatch({
                    type: GOT_COURSE_INFO,
                    courseInfo: data
                })
                dispatch(getPosts(collegeId, courseId, getState().forum.course.currPage))
            }
        })
}

export const getPosts = (collegeId, courseId, pageId) => (dispatch, getState) => {
    fetchPosts(collegeId, courseId, pageId)
        .then((data) => {
            if (data.error) {
                // todo: deal with error
            } else {
                dispatch({
                    type: GOT_COURSE_POSTS,
                    currPage: pageId,
                    posts: data.data
                })
            }
        })
}

function fetchCourseInfo(collegeId, courseId) {
    return fetch(`${ROOT_URL}/api/forum/course${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}`}`,
        {
            headers: withAuthHeader()
        }
    )
        .then((response) => {
            if (!response.ok)
                console.log(response)
            else
                return response.json()
        })
}


function fetchPosts(collegeId, courseId, pageId) {
    return fetch(`${ROOT_URL}/api/forum/course_posts${DEBUG ? '' : `?collegeid=${collegeId}&courseid=${courseId}&pageid=${pageId}`}`,
        {
            headers: withAuthHeader()
        }
    )
        .then((response) => {
            if (!response.ok)
                console.log(response)
            else
                return response.json()
        })
}
