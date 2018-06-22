import {ROOT_URL} from "../../configs/config";
import {withAuthHeader} from "../../utils/api";

export const GET_SCHEDULE_INFO = 'get_Schedule_Info';

export const getScheduleInfo = () => (dispatch, getState) => {
    let teacherName = localStorage.getItem('username');
    console.log(teacherName);
    fetchScheduleInfo(teacherName)
        .then((data)=>{
            console.log("???", data),
            dispatch({
                type: GET_SCHEDULE_INFO,
                data: data
            })
        })
}

function fetchScheduleInfo(teacherName) {
    return fetch(`${ROOT_URL}/timetable/`, {
        method: 'GET',
        headers: withAuthHeader(),
        credentials: 'same-origin',
    })
        .then(response => response.json())
        .catch((errors)=>{
            console.log("Get certain teacher schedule info error", errors.response);
        })
}