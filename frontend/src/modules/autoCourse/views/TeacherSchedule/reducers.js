import {
   GET_SCHEDULE_INFO
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

export function teacherScheduleReducer(state = initState, action) {
    switch (action.type){
        case GET_SCHEDULE_INFO: {
            console.log("teacher???", action.data);
            return {...state, coursesInList: action.data.courses, coursesInTable: action.data.table};
        }
        default: return state
    }
}
export default  teacherScheduleReducer;