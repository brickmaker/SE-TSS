import {GOT_TEACHER_INFO} from './actions'

const initState = {
    college: "",
    course: "",
    teacher: "",
    announcements: [],
    subscribed: false,
    posts: []
}

export function teacherReducer(state = initState, action) {
    switch (action.type) {
        case GOT_TEACHER_INFO:
            return Object.assign({}, state, {
                college: action.teacherInfo.college,
                course: action.teacherInfo.course,
                teacher: action.teacherInfo.teacher
            })
        default:
            return state
    }
}