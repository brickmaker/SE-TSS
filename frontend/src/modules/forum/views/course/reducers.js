import {CHECKED_SUBSCRIBED, GOT_COURSE_INFO, GOT_COURSE_POSTS} from './actions'

const initState = {
    college: "",
    course: "",
    subForums: [],
    subscribed: false,
    posts: [],
    pageNum: 1,
    currPage: 1,
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
        case CHECKED_SUBSCRIBED:
            return Object.assign({}, state, {
                subscribed: true
            })
        default:
            return state
    }
}