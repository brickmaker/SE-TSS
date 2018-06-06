import {
    CLOSE_COMMENT,
    CLOSE_DIALOG,
    COMMENT_SUCCESS,
    GOT_POST_INFO,
    GOT_POST_REPLIES,
    OPEN_COMMENT,
    REPLY_FAIL,
    REPLY_SUCCESS
} from './actions'

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
    },
    dialog: {
        open: false,
        title: "",
        content: ""
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
        case COMMENT_SUCCESS:
            return Object.assign({}, state, {
                comment: {
                    open: false,
                    postId: "",
                    replyId: "",
                    to: ""
                }
            })
        case REPLY_SUCCESS:
            return Object.assign({}, state, {
                dialog: {
                    open: true,
                    title: "提交成功",
                    content: "您可以在回贴中查看你的帖子！"
                }
            })
        case REPLY_FAIL:
            return Object.assign({}, state, {
                dialog: {
                    open: true,
                    title: "提交失败",
                    content: "请检查自己的登录状态等相关信息！" // todo: fail info
                }
            })
        case CLOSE_DIALOG:
            return Object.assign({}, state, {
                dialog: {
                    open: false,
                    title: "",
                    content: ""
                }
            })

        default:
            return state
    }
}
