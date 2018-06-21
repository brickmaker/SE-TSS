import {
    CHANGE_PROBLEM_SHOW_LIST,
    GET_PROBLEM_LIST,
    GET_TEACHER_AND_TAG_LIST
} from "./actions";

const initState = {
    tag_list: [],
    teacher_list:[],
    problem_list:[],
    problem_should_show:[]
};

export function questionManageReducer(state = initState, action) {
    switch (action.type) {
        case GET_TEACHER_AND_TAG_LIST:
            return Object.assign({}, state, {
                teacher_list: action.teacher_list,
                tag_list: action.tag_list,
                problem_list:[],
                problem_should_show:[]
            });
        case GET_PROBLEM_LIST:
            return Object.assign({}, state, {
                problem_list: action.problem_list,
                problem_should_show: action.problem_should_show
            });
        case CHANGE_PROBLEM_SHOW_LIST:
            return Object.assign({}, state, {
                problem_should_show: action.problem_should_show
            });
        default:
            return state;
    }
}