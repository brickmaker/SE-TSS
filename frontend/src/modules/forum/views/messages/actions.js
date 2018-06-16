import { ROOT_URL, DEBUG } from '../../configs/config';
import axios from 'axios';
import { withAuthHeader } from '../../utils/api';


export const GET_MSGS = "get_msgs";
export const MSGS_REQUEST = "msgs_request";
export const MSGS_SUCCESS = "msgs_success";
export const MSGS_FAILURE = "msgs_failure";
export function getMsgs(uid, nextPageNum, pageSize) {
    console.log("parse", new Date("2012-04-23T18:25:43.511Z"));
    console.log("getmsgs", uid, nextPageNum, pageSize);
    return (dispatch, getState) => {
        const { isFetchingMsgs } = getState();
        if (isFetchingMsgs) {
            return;
        }
        dispatch({
            type: MSGS_REQUEST,
            isEntering: nextPageNum === 1,
        });

        let params = DEBUG ? {} : {
            // uid1,
            uid,
            pagenum: nextPageNum,
            pagesize: pageSize,
        };
console.log("params", params);
        axios.get(`${ROOT_URL}/api/forum/messages`, {
            params,
            headers: withAuthHeader(),
        })
            .then((response) => {
                dispatch({
                    type: MSGS_SUCCESS,
                    newMsgs: response.data,
                    currentPageNum: nextPageNum,
                    //bug：pagesize变为undefined；临时解决
                    pageSize: pageSize,
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

export const GET_NEWMSGS = "get_newmsgs";
export const NEWMSGS_REQUEST = "newmsgs_request";
export const NEWMSGS_SUCCESS = "newmsgs_success";
export const NEWMSGS_FAILURE = "newmsgs_failure";
export function getNewMsgs(uid, pageSize) {
    return (dispatch, getState) => {
        const { isFetchingNewMsgs } = getState().forum.messages;
        if (isFetchingNewMsgs) {
            return;
        }
        dispatch({ type: NEWMSGS_REQUEST });
        let params = DEBUG ? { to: uid } : { uid: uid, pagesize: pageSize };
        axios.get(`${ROOT_URL}/api/forum/newmsgs`, {
            params,
            headers: withAuthHeader(),
        })
            .then((response) => {
                dispatch({
                    type: NEWMSGS_SUCCESS,
                    newMsgs: response.data,
                })
            })
            .catch((errors) => {
                dispatch({
                    type: NEWMSGS_FAILURE,
                    errors: errors.response,
                })
            })
    }
}

export const SELECT_ENTRY = "select_entry";
export function selectEntry(selectedId, selectedAvatar, selectedUsername) {
    return (dispatch, getState) => {
        dispatch({
            type: SELECT_ENTRY,
            selectedId: selectedId,
            selectedAvatar: selectedAvatar,
            selectedUsername: selectedUsername,
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
        const { isFetchingEntries, selectedAvatar, selectedUsername } = getState().forum.messages;
        if (isFetchingEntries) {
            return;
        }
        dispatch({ type: MSGENTRIES_REQUEST });
        // const headers = withAuthHeader();
        // console.log("msgentries", headers);
        axios.get(`${ROOT_URL}/api/forum/msgentries`, {
            params: {
                uid: uid,
            },
            headers: withAuthHeader(),
        })
            .then((response) => {
                var entries = response.data;
                console.log("entry", uid, selectedId, entries);
                if (Boolean(selectedId) && selectedId != uid) {
                    var idx = -1;
                    entries.forEach((entry, index) => {
                        if (entry["id"] === selectedId)
                            idx = index;
                    });
                    if (idx === -1) {
                        entries.unshift({ id: selectedId, username: selectedUsername, content: "", avatar: selectedAvatar });
                    }
                    else if (idx != 0) {
                        entries = [entries[idx]].concat(entries.slice(0, idx), entries.slice(idx + 1));
                    }
                };
                console.log("entries", entries);
                if (entries.length > 0) {
                    dispatch({
                        type: SELECT_ENTRY,
                        selectedId: entries[0]["id"],
                        selectedUsername: entries[0]['username'],
                    });
                    dispatch({
                        type: CLEAR_MSGS,
                    });
                    console.log("entries[0][id]", entries[0]["id"]);
                    dispatch(getMsgs(entries[0]["id"], 1, pageSize));
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
    return ((dispatch, getState) => {
        let params = DEBUG ? {
            id: content,
            from: from,
            to: to,
            content: content,
            time: "4.30",
        } :
            {
                from, to, content,
            };
        axios.post(`${ROOT_URL}/api/forum/messages`, params, {
            headers: withAuthHeader()
        })
            .then((response) => {
                dispatch(getMsgEntries(from, to, pageSize));
            })
            .catch((errors) => {
                console.log("postMsg errors", errors.response);
            })
    })
}


export const GET_MSGCONTENT = 'get_msgcontent';
export function getContent(content) {
    return ({
        type: GET_MSGCONTENT,
        content: content,
    });
}