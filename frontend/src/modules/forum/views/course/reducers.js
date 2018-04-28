import {GOT_COURSE_INFO} from './actions'

const initState = {
    college: "",
    course: "",
    subForum: [],
    subscribed: false,
    posts: []
}

export function courseReducer(state = initState, action) {
    switch (action.type) {
        case GOT_COURSE_INFO:
            return Object.assign({}, state, {
                college: action.courseInfo.college,
                course: action.courseInfo.course,
                subForums: action.courseInfo.subForums
            })
        default:
            return state
    }
}