import {CHANGE_RENDER_TAB_GENERATE, GET_TAG_AND_TEACHER_LIST_GEN} from "./actions";


const initState = {
    tab_id: "0",
    step_index: 0,
    tag_list:[],
    teacher_list:[],
    finished : false,
};

export function paperGenerateReducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_RENDER_TAB_GENERATE:
            return Object.assign({}, state, {
                tab_id: action.tab_id
            });
        case GET_TAG_AND_TEACHER_LIST_GEN:
            return Object.assign({}, state, {
                tag_list: action.tag_list,
                teacher_list: action.teacher_list
            });
        default:
            return state;
    }
}
