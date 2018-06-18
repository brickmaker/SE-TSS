import {GET_TEACHER_PAPER} from "./actions";
import {CHANGE_RENDER_TAB} from "./actions";

const initState = {
    paper_info: {},
    selection: "0",
};

export function paperViewReducer(state = initState, action) {
    switch (action.type) {
        case GET_TEACHER_PAPER:
            return Object.assign({}, state, {
                paper_info: action.paper_info
            });
        case CHANGE_RENDER_TAB:
            return Object.assign({}, state, {
                selection: action.selection
            });
        default:
            return state;
    }
}