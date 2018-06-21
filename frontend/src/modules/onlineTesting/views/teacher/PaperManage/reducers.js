import {GET_TEACHER_PAPER_LIST} from "./actions";

const initState = {
    teacher_paper_list: []
};

export function paperManageReducer(state = initState, action) {
    switch (action.type) {
        case GET_TEACHER_PAPER_LIST:
            return Object.assign({}, state, {
                teacher_paper_list: action.teacher_paper_list
            });
        default:
            return state;
    }
}