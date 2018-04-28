import {ROOT_URL} from "../../configs/config"

export const GOT_POST_INFO = 'got_post_info'

export const getPostInfo = (postId) => dispatch => {
    fetchPostInfo(postId)
        .then((data) => { // todo: need verify response data
            dispatch({
                type: GOT_POST_INFO,
                postInfo: data
            })
        })
}

function fetchPostInfo(postId) {
    return fetch(`${ROOT_URL}/api/forum/post?id=${postId}`)
        .then((response) => (response.json()))
}