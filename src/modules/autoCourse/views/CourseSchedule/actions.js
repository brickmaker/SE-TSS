import {DEBUG, ROOT_URL} from "../../configs/config";

export const GET_TEACHER_SCHEDULE_INFO = 'get_teacher_schedule_info';
export const GET_ALL_SCHEDULE_INFO = 'get_All_Schedule_Info';
export const GET_TEACHER_SCHEDULE_INFO_IN_TABLE ='getTeacherScheduleInfoInTable';

export const getTeacherScheduleInfo = (teacherName) => (dispatch, getState) => {
    fetchTeacherScheduleInfo(teacherName)
        .then((data)=>{
            dispatch({
                type: GET_TEACHER_SCHEDULE_INFO,
                data: data
            })
        })
}

function fetchTeacherScheduleInfo(teacherName) {
    return fetch(`${ROOT_URL}/timetable/?teachername=${teacherName}`)
        .then(response => response.json())
}

export const getAllScheduleInfo = () => (dispatch, getState) => {
    fetchAllScheduleInfo()
        .then((data)=>{
            dispatch({
                type: GET_ALL_SCHEDULE_INFO,
                data: data
            })
        })
}
function fetchAllScheduleInfo() {
    return fetch(`${ROOT_URL}/timetable/`)
        .then(response => response.json())
    /*return fetch(`../../Data/CourseTable.json`)
        .then(response => response.json())*/
}