import {GET_COURSE_LIST} from "./actions";

const initState = {
    course_list: [],
    token: ""
};

export function teacherMainReducer(state = initState, action) {
    switch (action.type) {
        case GET_COURSE_LIST:
            return Object.assign({}, state, {
                course_list: action.course_list,
                token: action.token
            });
        default:
            return state;
    }
}