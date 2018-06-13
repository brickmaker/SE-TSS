import {DEBUG, ROOT_URL} from "../../configs/config"

export const GOT_POST_INFO = 'got_post_info'
export const GOT_POST_REPLIES = 'got_post_replies'

export const getPostInfo = (postId, pageId) => dispatch => {
    fetchPostInfo(postId, pageId)
        .then((data) => { // todo: need verify response data
            dispatch({
                type: GOT_POST_INFO,
                postInfo: data
            })
            dispatch(getPostReplies(postId, pageId))
        })
}

export const getPostReplies = (postId, pageId) => dispatch => {
    fetchPostReplies(postId, pageId)
        .then((json) => {
            dispatch({
                type: GOT_POST_REPLIES,
                pageId: parseInt(pageId),
                replies: json.data
            })
        })
}

function fetchPostInfo(postId) {
    return fetch(`${ROOT_URL}/api/forum/post?id=${postId}`)
        .then((response) => (response.json()))
}

function fetchPostReplies(postId, pageId) {
    // todo: what a suck for this ridiculous compromise
    return fetch(`${ROOT_URL}/api/forum/post_reply${DEBUG ? '' : `?postid=${postId}&page=${pageId}`}`)
        .then((response) => (response.json()))
}