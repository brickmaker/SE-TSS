import {DEBUG, ROOT_URL} from "../../configs/config"

export const GOT_POST_INFO = 'got_post_info'
export const GOT_POST_REPLIES = 'got_post_replies'
export const OPEN_COMMENT = 'open_comment'
export const CLOSE_COMMENT = 'close_comment'
export const COMMENT = 'comment'
export const REPLY = 'reply'
export const REPLY_SUCCESS = 'reply_success'
export const REPLY_FAIL = 'reply_fail'
export const COMMENT_SUCCESS = 'comment_success'
export const CLOSE_DIALOG = 'close_post_dialog'

export const reply = (uid, postId, content, fileId) => (dispatch) => {
    fetch(
        `${ROOT_URL}/api/forum/post_newreply`,
        {
            method: 'POST',
            // todo: token header
            body: {
                uid: uid,
                postId: postId,
                content: content,
                fileId: fileId
            }
        }
    )
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            // todo: post test
            dispatch({
                type: REPLY_SUCCESS
            })
            // todo: fail check
        })
}

export const comment = (postId, replyId, from, to, content) => (dispatch, getState) => {
    fetch(
        `${ROOT_URL}/api/forum/comment`,
        {
            method: 'POST',
            // todo: token header
            body: {
                from: from,
                to: to,
                postId: postId,
                replyId: replyId,
                content: content
            }
        }
    )
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            // todo: post test
            dispatch({
                type: COMMENT_SUCCESS
            })
            dispatch(getPostReplies(postId, getState().forum.post.currPage))
            // todo: fail check
        })
}

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