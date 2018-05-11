import {GOT_COURSES, GOT_COURSES_INFO} from "./actions";

const initState = {
    college: '',
    currPage: 1,
    pageNum: 1,
    courses: []
};

export function coursesReducer(state = initState, action) {
    switch (action.type) {
        case GOT_COURSES_INFO:
            return Object.assign({}, state, {
                college: action.info.college,
                pageNum: action.info.pageNum
            });
        case GOT_COURSES:
            return Object.assign({}, state, {
                currPage: action.currPage,
                courses: action.courses
            })
        default:
            return state;
    }
}