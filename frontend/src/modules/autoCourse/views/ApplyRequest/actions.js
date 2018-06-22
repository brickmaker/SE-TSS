import {ROOT_URL} from "../../configs/config";
import {withAuthHeader} from "../../utils/api";
export const APPLY_REQUEST = 'Apply_request';
export const DELETE_REQUEST = 'Delete_request';
export const DISPLAY_REQUEST_ADMINISTRATOR= 'display_request_adm';

export const HandleApplyButtonClick = (name,type,contents) => (dispatch, getState) => {
    let teacherid = localStorage.getItem('username');
    console.log("teacher name: ", name);
    fetch(`${ROOT_URL}/request/`, {
            method: 'POST',
            headers: withAuthHeader(),
            credentials: 'same-origin',
            body: JSON.stringify({
                    teacherId: teacherid,       //
                    teacher: name,
                    topic: type,
                    content: contents,
                    status: 0
                }
            )
        })
        .then(res=>{})
        .catch((errors)=>{
            console.log("!!!!!!!!");
        });
    fetchRequestInfo()
        .then((data)=> {
            dispatch({
                type:APPLY_REQUEST,
                data:data
            })
        })
};

export const HandleDeleteButtonClick = (n) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/request/${n.id}/`, {
            method: 'DELETE',
            headers: withAuthHeader(),
            body: JSON.stringify({
                }
            )
        }
    );
    fetchRequestInfo()
        .then((data)=> {
            dispatch({
                type:DELETE_REQUEST,
                data:data
            })
        })
};


export const DisplayRequest = () => (dispatch, getState) => {
    fetchRequestInfo()
        .then((data)=> {
            dispatch({
                type:DISPLAY_REQUEST_ADMINISTRATOR,
                data:data,
            })
        })
};

function fetchRequestInfo() {
    return fetch(`${ROOT_URL}/request/`, {
        method: 'GET',
        headers: withAuthHeader(),
    })
        .then(response => response.json())
}
