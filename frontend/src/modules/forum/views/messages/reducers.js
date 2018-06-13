import { SELECT_ENTRY, GET_MSGCONTENT, CLEAR_MSGS, SET_MSGEND, NEWMSGS_REQUEST, NEWMSGS_SUCCESS, NEWMSGS_FAILURE,  SELECT_AVATAR_USERNAME } from './actions';
import { MSGENTRIES_REQUEST, MSGENTRIES_SUCCESS, MSGENTRIES_FAILURE } from './actions';
import { MSGS_REQUEST, MSGS_SUCCESS, MSGS_FAILURE } from "./actions";

const initialState = {
    entries: [],
    newEntry: undefined,
    isFetchingEntries: false,
    msgs: [],
    isFetchingMsgs: false,
    // selectedId: undefined,
    // selectedAvatar: "",
    // selectedUsername: "",
    currentPageNum: 1,
    pageSize: 5,
    errors: {},
    content: "",
    noMoreMsgs: false,
    msgEnd: undefined,
    isEntering: false,
    isFetchingNewMsgs: false,
    newMsgs: [],
};

export function messageReducer(state = initialState, action) {
    switch (action.type) {
        // case SELECT_ENTRY:
        //     return (Object.assign({}, state, {
        //         selectedId: action.selectedId,
        //         selectedAvatar: action.selectedAvatar,
        //         selectedUsername: action.selectedUsername,
        //     }));
        case CLEAR_MSGS:
            return (Object.assign({}, state, {
                msgs: [],
            }));
        case SET_MSGEND:
            return (Object.assign({}, state, {
                msgEnd: action.msgEnd,
            }));
        case GET_MSGCONTENT:
            return (Object.assign({}, state, {
                content: action.content,
            }));
        case MSGENTRIES_REQUEST:
            return (Object.assign({}, state, {
                isFetchingEntries: true,
            }));
        case MSGENTRIES_SUCCESS:
            var newSelectedId = state.selectedId;
            if (action.entries.length > 0) {
                newSelectedId = action.entries[0]['id'];
            }
            return (Object.assign({}, state, {
                isFetchingEntries: false,
                entries: action.entries,
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
                isEntering: action.isEntering,
            }));
        case MSGS_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingMsgs: false,
                msgs: action.newMsgs.concat(state.msgs),
                currentPageNum: action.currentPageNum,
                isEntering: false,
                pageSize: action.pageSize,
            }));
        case MSGS_FAILURE:
            return (Object.assign({}, state), {
                isFetchingMsgs: false,
                errors: action.errors,
                noMoreMsgs: true,
            });
        case NEWMSGS_REQUEST:
            return (Object.assign({}, state, {
                isFetchingNewMsgs: true,
            }));
        case NEWMSGS_SUCCESS:
            return (Object.assign({}, state, {
                isFetchingNewMsgs: false,
                newMsgs: action.newMsgs,
            }));
        case NEWMSGS_FAILURE:
            return (Object.assign({}, state, {
                isFetchingNewMsgs: false,
                errors: action.errors,
            }));
        default:
            return state;
    }
}