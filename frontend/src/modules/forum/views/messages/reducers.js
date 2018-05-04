import { SELECT_ENTRY, GET_CONTENT } from './actions';
import { MSGENTRIES_REQUEST, MSGENTRIES_SUCCESS, MSGENTRIES_FAILURE } from './actions';
import { MSGS_REQUEST, MSGS_SUCCESS, MSGS_FAILURE } from "./actions";

const initialState = {
    entries: [],
    newEntry: undefined,
    isFetchingEntries: false,
    msgs: [],
    isFetchingMsgs: false,
    selectedId: 30,
    errors: {},
    content: "",
    // test: true,
};

export function messageReducer(state = initialState, action) {
    switch (action.type) {
        // case TEST:
        //     return (Object.assign({}, state, {
        //         test: action.test,
        //     }));
        case SELECT_ENTRY:
            return (Object.assign({}, state, {
                selectedId: action.selectedId,
            }));
        case GET_CONTENT:
            return (Object.assign({}, state, {
                content: action.content,
            }));
        case MSGENTRIES_REQUEST:
            return (Object.assign({}, state, {
                isFetchingEntries: true,
            }));
        case MSGENTRIES_SUCCESS:
            console.log("reducer", action.entries);
            var newSelectedId = state.selectedId;
            if (action.entries.length > 0) {
                newSelectedId = action.entries[0]['id'];
            }
            return (Object.assign({}, state, {
                isFetchingEntries: false,
                entries: action.entries,
                // selectedId: newSelectedId,
            }));
        case MSGENTRIES_FAILURE:
            return (Object.assign({}, state, {
                isFetchingEntries: false,
                entries: undefined,
                errors: action.errors,
            }));
        case MSGS_REQUEST:
            return (Object.assign({}, state, {
                isFetchingMsgs: true,
            }));
        case MSGS_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingMsgs: false,
                msgs: action.msgs,
            }));
        case MSGS_FAILURE:
            return (Object.assign({}, state), {
                isFetchingMsgs: false,
                msgs: undefined,
                errors: action.errors,
            });
        default:
            return state;
    }
}