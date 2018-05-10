import {GOT_COURSES_INFO} from "./actions";

const initState = {
    college: '',
    courses: []
};

export function coursesReducer(state = initState, action) {
    switch (action.type) {
        case GOT_COURSES_INFO:
            return Object.assign({}, state, {
                college: action.info.college
            });
        default:
            return state;
    }
}