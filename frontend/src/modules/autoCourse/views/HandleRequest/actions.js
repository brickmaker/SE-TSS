import {DEBUG, ROOT_URL} from "../../configs/config";
export const AGREE_REQUEST = 'agree_request';
export const REJECT_REQUEST = 'reject_request';
export const DISPLAY_REQUEST_ADMINISTRATOR= 'display_request_adm';

export const HandleAgreeButtonClick = (n) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/request/${n.id}/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    id: n.id,
                    teacherId: n.teacherId,
                    teacher: n.teacher,
                    topic: n.topic,
                    content: n.content,
                    status: 1
                }
            )
        }
    );
    fetchRequestInfo()
        .then((data)=> {
            dispatch({
                type:AGREE_REQUEST,
                data:data
            })
        })
};

export const HandleRejectButtonClick = (n) => (dispatch, getState) => {
    fetch(`${ROOT_URL}/request/${n.id}/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    id: n.id,
                    teacherId: n.teacherId,
                    teacher: n.teacher,
                    topic: n.topic,
                    content: n.content,
                    status: 2
                }
            )
        }
    );
    fetchRequestInfo()
        .then((data)=> {
            dispatch({
                type:REJECT_REQUEST,
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
   return fetch(`${ROOT_URL}/request/?status=0`)
        .then(response => response.json())
}
