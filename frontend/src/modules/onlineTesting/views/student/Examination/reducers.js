import {GET_STUDENT_PAPER, CHANGE_RENDER_TAB_EXAM, CHANGE_SOLUTIONS} from "./actions";

const initState = {
    paper_info: {},
    tab_id: "0",
    solutions:[]
};

export function examinationReducer(state = initState, action) {
    switch (action.type) {
        case GET_STUDENT_PAPER:
            return Object.assign({}, state, {
                paper_info: action.paper_info,
                solutions: action.solutions
            });
        case CHANGE_RENDER_TAB_EXAM:
            return Object.assign({}, state, {
                tab_id: action.tab_id
            });
        case CHANGE_SOLUTIONS:
            return Object.assign({}, state, {
                solutions: action.solutions
            });
        default:
            return state;
    }
}