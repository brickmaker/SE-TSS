import {GOT_COURSES} from "./actions";

const initState = {
    courses: []
};

export function coursesReducer(state = initState, action) {
    switch (action.type) {
        case GOT_COURSES:
            return Object.assign({}, state, {
                courses: action.courses
            });
        default:
            return state;
    }
}