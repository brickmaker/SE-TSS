import {GET_COURSE_LIST_STUDENT} from "./actions";

const initState = {
    course_list: []
};

export function studentMainReducer(state = initState, action) {
    switch (action.type) {
        case GET_COURSE_LIST_STUDENT:
            return Object.assign({}, state, {
                course_list: action.course_list
            });
        default:
            return state;
    }
}