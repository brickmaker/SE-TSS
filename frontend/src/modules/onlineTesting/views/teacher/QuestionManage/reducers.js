import {
    ADD_PROBLEM_TEACHER,
    DELETE_PROBLEMS_TEACHER,
    GET_PROBLEM_LIST,
    GET_TEACHER_AND_TAG_LIST
} from "./actions";

const initState = {
    tag_list: [],
    teacher_list:[],
    problem_list:[],
};

export function questionManageReducer(state = initState, action) {
    switch (action.type) {
        case GET_TEACHER_AND_TAG_LIST:
            return Object.assign({}, state, {
                teacher_list: action.teacher_list,
                tag_list: action.tag_list,
            });
        case GET_PROBLEM_LIST:
            return Object.assign({}, state, {
                problem_list: action.problem_list,
            });
        case ADD_PROBLEM_TEACHER:
            return Object.assign({}, state, {
                problem_list:action.problem_list
            });
        case DELETE_PROBLEMS_TEACHER:
            return Object.assign({}, state, {
                problem_list:action.problem_list
            });
        default:
            return state;
    }
}