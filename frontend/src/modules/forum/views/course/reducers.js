import {
    CHECKED_SUBSCRIBED, CLOSE_DIALOG,
    GOT_COURSE_INFO,
    GOT_COURSE_POSTS, POST_FAIL,
    POST_SUCCESS,
    SUBSCRIBE_COURSE,
    UNSUBSCRIBE_COURSE
} from './actions'

const initState = {
    college: "",
    course: "",
    subForums: [],
    subscribed: false,
    posts: [],
    pageNum: 1,
    currPage: 1,
    dialog: {
        open: false,
        title: "",
        content: ""
    }
}

export function courseReducer(state = initState, action) {
    switch (action.type) {
        case GOT_COURSE_INFO:
            return Object.assign({}, state, {
                college: action.courseInfo.college,
                course: action.courseInfo.course,
                pageNum: action.courseInfo.pageNum,
                subForums: action.courseInfo.subForums
            })
        case GOT_COURSE_POSTS:
            return Object.assign({}, state, {
                currPage: action.currPage,
                posts: action.posts
            })
        case POST_SUCCESS:
            return Object.assign({}, state, {
                dialog: {
                    open: true,
                    title: "提交成功",
                    content: "您可以在帖子列表中查看你的帖子！"
                }
            })
        case POST_FAIL:
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
        case CHECKED_SUBSCRIBED:
        case SUBSCRIBE_COURSE:
        case UNSUBSCRIBE_COURSE:
            return Object.assign({}, state, {
                subscribed: action.subscribed
            })
        default:
            return state
    }
}