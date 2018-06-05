import { ROOT_URL } from '../../configs/config';
import axios from 'axios';

// export const TEST = "test";
// export function test(test) {
//     return ({
//         type: TEST,
//         test: test,
//     });
// }

export const GET_MSGS = "get_msgs";
export const MSGS_REQUEST = "msgs_request";
export const MSGS_SUCCESS = "msgs_success";
export const MSGS_FAILURE = "msgs_failure";
export function getMsgs(uid, selectedId) {
    return (dispatch, getState) => {
        const { isFetchingMsgs } = getState();
        if (isFetchingMsgs) {
            return;
        }
        dispatch({ type: MSGS_REQUEST });
        axios.get(`${ROOT_URL}/api/forum/messages`, {
            params: {
                // TODO:
                // id:{uid, selectedId},
                from: selectedId,
            }
        })
            .then((response) => {
                dispatch({
                    type: MSGS_SUCCESS,
                    msgs: response.data,
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
    // return ({
    //     type: SELECT_ENTRY,
    //     id: id,
    // });
}



export const GET_MSGENTRIES = "get_msgentries";
export const MSGENTRIES_REQUEST = 'entries_request';
export const MSGENTRIES_SUCCESS = "entries_success";
export const MSGENTRIES_FAILURE = "entries_failure";

export function getMsgEntries(uid, selectedId) {
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
                    dispatch(getMsgs(uid, entries[0]["id"]));
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

        // fetch(`${ROOT_URL}/api/forum/msgentries?uid=${uid}`)
        //     .then((response) => (response.json()))
        //     .then((entries) => {
        //         console.log("entries", entries),
        //             dispatch({
        //                 type: MSGENTRIES_SUCCESS,
        //                 entries: entries,
        //             }),
        //             (errors) => {
        //                 dispatch({
        //                     type: MSGENTRIES_FAILURE,
        //                     errors: errors
        //                 })
        //             }
        //     })
    }
}

export const POST_MSG = "post_msg";
export function postMsg(from, to, content) {
    console.log(from, to, content);
    return ((dispatch, getState) => {
        // TODO: correct POST request
        axios.post(`${ROOT_URL}/api/forum/messages`, {
            params: {
                // from:{"haha":"hh", "selectedId":"ff"},
                from: from,
            },
        })
            // axios.post(`${ROOT_URL}/api/forum/messages`, {
            //     params: {
            //         from: from,
            //         to: to,
            //         content: content,
            //     }
            // })
            .then((response) => {
                dispatch(getMsgEntries(from, undefined));
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