import {CHANGE_RENDER_TAB_GENERATE} from "./actions";

const initState = {
    tab_id: "0",
    step_index: 0,
    finished : false,
};

export function paperGenerateReducer(state = initState, action) {
    switch (action.type) {
        case CHANGE_RENDER_TAB_GENERATE:
            return Object.assign({}, state, {
                tab_id: action.tab_id
            });

        default:
            return state;
    }
}
