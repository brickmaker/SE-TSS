import {GOT_TEACHER_INFO, GOT_TEACHER_POSTS} from './actions'

const initState = {
    college: "",
    course: "",
    teacher: "",
    announcements: [],
    subscribed: false,
    pageNum: 1,
    currPage: 1,
    posts: []
}

export function teacherReducer(state = initState, action) {
    switch (action.type) {
        case GOT_TEACHER_INFO:
            return Object.assign({}, state, {
                college: action.teacherInfo.college,
                course: action.teacherInfo.course,
                teacher: action.teacherInfo.teacher,
                pageNum: action.teacherInfo.pageNum
            })
        case GOT_TEACHER_POSTS:
            return Object.assign({}, state, {
                currPage: action.currPage,
                posts: action.posts
            })
        default:
            return state
    }
}