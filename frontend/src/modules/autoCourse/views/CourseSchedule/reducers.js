import {
    GET_ALL_SCHEDULE_INFO,
    GET_TEACHER_SCHEDULE_INFO,
    GET_TEACHER_SCHEDULE_INFO_IN_TABLE,
} from "./actions";

const initState = {
    mobileOpen: false,
    listMode: true,
    tableMode: false,
    coursesInList: [],
    coursesInTable:{},
    page: 0,
    rowsPerPage: 6,
};

export function courseScheduleReducer(state = initState, action) {
    switch (action.type){
        case GET_ALL_SCHEDULE_INFO: {
            return {...state, coursesInList: action.data.courses, coursesInTable: action.data.table};
        }
        case GET_TEACHER_SCHEDULE_INFO: {
            return {...state, coursesInList: action.data.courses, coursesInTable: action.data.table};
        }
        default: return state
    }
}
export default  courseScheduleReducer;