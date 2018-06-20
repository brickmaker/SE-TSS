import {DEBUG, ROOT_URL} from "../../configs/config";

export const GET_SCHEDULE_INFO = 'get_schedule_info';
export const GET_SCHEDULE_INFO_IN_TABLE ='get_Schedule_Info_In_Table';

export const getScheduleInfo = (teacherName) => (dispatch, getState) => {
    fetchScheduleInfo(teacherName)
        .then((data)=>{
            dispatch({
                type: GET_SCHEDULE_INFO,
                data: data
            })
        })
}

function fetchScheduleInfo(teacherName) {
    return fetch(`${ROOT_URL}/api/autoCourse/schedule?teacherName=${teacherName}`)
        .then(response => response.json())
}

export const getScheduleInfoInTable = (teacherName) => (dispatch, getState) => {
    fetchScheduleInfoInTable(teacherName)
        .then((data)=>{
            dispatch({
                type: GET_SCHEDULE_INFO_IN_TABLE,
                data: data
            })
        })
}
function fetchScheduleInfoInTable(teacherName) {
    return fetch(`${ROOT_URL}/api/autoCourse/schedule?teacherName=${teacherName}`)
        .then(response => response.json())
}