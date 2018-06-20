import {
    GET_ALL_REST_COURSE,
    ARRANGE_TEACHER_SCHEDULE_INFO,
} from "./actions";

const initState = {
    listMode: true,
    tableMode: false,
    order: 'asc',
    orderBy: 'id',
    data: [],
    dataM:[],
    page: 0,
    rowsPerPage: 5,
}

export function courseArrangeReducer(state = initState, action) {
    switch (action.type){
        case ARRANGE_TEACHER_SCHEDULE_INFO:
            return {...state, dataM: action.data.courses}
        case GET_ALL_REST_COURSE:
            return {...state, data: action.data.courses}
        default:return state
    }
}

export default courseArrangeReducer;