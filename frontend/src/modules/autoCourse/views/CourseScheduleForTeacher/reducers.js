import {
    GET_SCHEDULE_INFO,
    GET_SCHEDULE_INFO_IN_TABLE,
} from "./actions";

const initState = {
    listMode: true,
    tableMode: false,
    courseInList: [{id: 3, courseId: "21120471", courseName: "编译原理", teacherName: "李莹", semester: "春夏", courseTime: "周一第3, 4, 5节", place: "玉泉曹光彪二期-201"}],
    coursesInTable: [],
}

export function courseScheduleForTeacherReducer(state = initState, action) {
    switch (action.type){
        case GET_SCHEDULE_INFO:
            return {...state, data: action.data.courses}
        case GET_SCHEDULE_INFO_IN_TABLE:
            return {...state, data: action.data.courses}
        default: return {...state, data: initState.data}
    }
}
export default  courseScheduleForTeacherReducer;