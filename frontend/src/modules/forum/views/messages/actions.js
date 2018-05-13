import { ROOT_URL } from '../../configs/config';
import axios from 'axios';


export const GET_MSGS = "get_msgs";
export const MSGS_REQUEST = "msgs_request";
export const MSGS_SUCCESS = "msgs_success";
export const MSGS_FAILURE = "msgs_failure";
export function getMsgs(uid1, uid2, nextPageNum, pageSize) {
    return (dispatch, getState) => {
        const { isFetchingMsgs } = getState();
        if (isFetchingMsgs) {
            return;
        }
        dispatch({
            type: MSGS_REQUEST,
            isEntering: nextPageNum === 1,
        });
        axios.get(`${ROOT_URL}/api/forum/messages`, {
            params: {
                // TODO:{uid1, uid2, pagenum, pagesize}
                // uid1: uid,
                // uid2: selectedId,
                // pagenum: nextPageNum,
                // pagesize: pageSize,
                from: [uid1, uid2],
            }
        })
            .then((response) => {
                dispatch({
                    type: MSGS_SUCCESS,
                    newMsgs: response.data,
                    currentPageNum: nextPageNum,
                });
            })
            .catch((errors) => {
                dispatch({
                    type: MSGS_FAILURE,
                    errors: errors.response,
                })
            });
    }
}

export const SELECT_ENTRY = "select_entry";
export function selectEntry(selectedId) {
    return (dispatch, getState) => {
        dispatch({
            type: SELECT_ENTRY,
            selectedId: selectedId,
        });
    }
}


export const CLEAR_MSGS = "clear_msgs";
export function clearMsgs() {
    return ({
        type: CLEAR_MSGS,
    });
}


export const SET_MSGEND = "set_msgend";
export function setMsgEnd(msgEnd) {
    return ({
        type: SET_MSGEND,
        msgEnd: msgEnd,
    });
}

export const GET_MSGENTRIES = "get_msgentries";
export const MSGENTRIES_REQUEST = 'entries_request';
export const MSGENTRIES_SUCCESS = "entries_success";
export const MSGENTRIES_FAILURE = "entries_failure";

export function getMsgEntries(uid, selectedId, pageSize) {
    return (dispatch, getState) => {
        const { isFetchingEntries } = getState();
        if (isFetchingEntries) {
            return;
        }
        dispatch({ type: MSGENTRIES_REQUEST });
        axios.get(`${ROOT_URL}/api/forum/msgentries`, {
            params: {
                uid: uid,
            },
        })
            .then((response) => {
                //TODO: test subscription, get username
                var entries = response.data[0]["entries"];
                // var entries = response.data;
                var username = "username";
                if (Boolean(selectedId)) {
                    var idx = -1;
                    entries.forEach((entry, index) => {
                        if (entry["id"] === selectedId)
                            idx = index;
                    });
                    if (idx === -1) {
                        entries.unshift({ id: selectedId, username: username, content: "" });
                    }
                    else if (idx != 0) {
                        entries = [entries[idx]].concat(entries.slice(0, idx), entries.slice(idx + 1));
                    }
                };
                if (entries.length > 0) {
                    dispatch({
                        type: SELECT_ENTRY,
                        selectedId: entries[0]["id"],
                    });
                    dispatch({
                        type: CLEAR_MSGS,
                    });
                    dispatch(getMsgs(uid, entries[0]["id"], 1, pageSize));
                }
                dispatch({
                    type: MSGENTRIES_SUCCESS,
                    entries: entries,
                })
            })
            .catch((errors) => {
                dispatch({
                    type: MSGENTRIES_FAILURE,
                    errors: errors.response,
                })
            })
    }
}

export const POST_MSG = "post_msg";
export function postMsg(from, to, content, pageSize) {
    console.log(from, to, content);
    return ((dispatch, getState) => {
        axios.post(`${ROOT_URL}/api/forum/messages`, {
            //TODO: remove id and time attr
            id: content,
            from: from,
            to: to,
            content: content,
            time: "4.30",
        })
            .then((response) => {
                dispatch(getMsgEntries(from, undefined, pageSize));
            })
            .catch((errors) => {
                console.log("postMsg errors", errors.response);
            })
    })
}


export const GET_CONTENT = 'get_content';
export function getContent(content) {
    return ({
        type: GET_CONTENT,
        content: content,
    });
}