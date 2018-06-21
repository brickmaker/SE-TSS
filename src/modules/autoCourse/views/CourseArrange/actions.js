import {DEBUG, ROOT_URL} from "../../configs/config";

export const ARRANGE_TEACHER_SCHEDULE_INFO = 'arrange_teacher_schedule_info'
export const GET_ALL_REST_COURSE = 'get_All_rest_course'

export const arrangeTeacherScheduleInfo = (teacherName) => (dispatch, getState) => {
    fetchTeacherScheduleInfo(teacherName)
        .then((data)=>{
            dispatch({
                type: ARRANGE_TEACHER_SCHEDULE_INFO,
                data: data
            })
        })
}

function fetchTeacherScheduleInfo(teacherName) {
    return fetch(`${ROOT_URL}/timetable/?teachername=${teacherName}`)
        .then(response => response.json())
}

export const ShowAllRestCourse = () => (dispatch, getState) => {
    fetchAllRestCourse()
        .then((data)=>{
            dispatch({
                type: GET_ALL_REST_COURSE,
                data: data
            })
        })
}

function fetchAllRestCourse() {
    return fetch(`${ROOT_URL}/arrange/?auto=false`)
        .then(response => response.json())
}

export const ArrangeAllRestCourse= ()=>(dispatch) =>{
    arrangeAllRestCourse()
        .then((data)=>{
            dispatch({
                type: GET_ALL_REST_COURSE,
                data: data
            })
        })
}

function arrangeAllRestCourse() {
    return fetch(`${ROOT_URL}/arrange/?auto=true`)
        .then(response => response.json())
}

export const HandIn=(newData)=> () =>{
    newData.map(function(element, index, array) {
        fetch(`${ROOT_URL}/timetable/${element.id}/`, {
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                id:element.id,
                teacher_username:element.teacher_username,
                teacher:element.teacher,
                course_id:element.course_id,
                course:element.course,
                room:element.room,
                room_id:element.room_id,
                time:element.time,
                semester:element.semester
            })
        })
            .then(response => {})
            .catch((errors)=>{
                console.log("Post modified classroom errors", errors.response);
            })
    });

}