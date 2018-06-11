import {GET_STUDENT_PAPER_LIST} from "./actions";

const initState = {
    student_paper_list: []
};

export function examListReducer(state = initState, action) {
    switch (action.type) {
        case GET_STUDENT_PAPER_LIST:
            return Object.assign({}, state, {
                student_paper_list: action.student_paper_list
            });
        default:
            return state;
    }
}