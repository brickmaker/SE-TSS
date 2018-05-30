import {CLOSE_COMMENT, GOT_POST_INFO, GOT_POST_REPLIES, OPEN_COMMENT} from './actions'

const initState = {
    path: {
        college: {id: "", name: ""},
        course: {id: "", name: ""},
    },
    postId: "",
    title: "",
    currPage: 1,
    pageNum: 1,
    replies: [],
    comment: {
        open: false,
        postId: "",
        replyId: "",
        to: ""
    }
}

export function postReducer(state = initState, action) {
    switch (action.type) {
        case GOT_POST_INFO:
            return Object.assign({}, state, {
                postId: action.postInfo.id,
                pageNum: action.postInfo.replyPageNum,
                path: JSON.parse(JSON.stringify(action.postInfo.path)),
                title: action.postInfo.title
            })
        case GOT_POST_REPLIES:
            return Object.assign({}, state, {
                currPage: action.pageId,
                replies: action.replies
            })
        case OPEN_COMMENT:
            return Object.assign({}, state, {
                comment: {
                    open: true,
                    postId: action.postId,
                    replyId: action.replyId,
                    to: action.to
                }
            })
        case CLOSE_COMMENT:
            return Object.assign({}, state, {
                comment: {
                    open: false,
                    postId: "",
                    replyId: "",
                    to: ""
                }
            })
        default:
            return state
    }
}
