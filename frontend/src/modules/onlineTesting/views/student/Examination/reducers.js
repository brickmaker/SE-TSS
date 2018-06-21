import {
    GET_STUDENT_PAPER, CHANGE_RENDER_TAB_EXAM, CHANGE_SOLUTIONS, START_EXAM, SET_LEFT_TIME,
    SET_GRADE
} from "./actions";

const initState = {
    paper_info: {},
    tab_id: "0",
    solutions:[],
    exam_id: "",
    left_time:0,
    grade: 0,
};

export function examinationReducer(state = initState, action) {
    switch (action.type) {
        case GET_STUDENT_PAPER:
            return Object.assign({}, state, {
                paper_info: action.paper_info,
                solutions: action.solutions,
                exam_id: action.exam_id,
                left_time: action.left_time
            });

        case SET_GRADE:
            return Object.assign({}, state, {
               grade:action.grade
            });
        case CHANGE_RENDER_TAB_EXAM:
            return Object.assign({}, state, {
                tab_id: action.tab_id
            });
        case CHANGE_SOLUTIONS:
            return Object.assign({}, state, {
                solutions: action.solutions
            });
        case START_EXAM:
            return Object.assign({}, state, {
                exam_id:action.exam_id,
                left_time:action.left_time
            });
        case SET_LEFT_TIME:
            return Object.assign({}, state, {
                left_time: action.left_time
            });
        default:
            return state;
    }
}