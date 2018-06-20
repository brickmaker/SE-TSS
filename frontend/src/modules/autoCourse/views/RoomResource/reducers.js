import {POST_CLASSROOM_INFO, GET_ALL_CLASSROOM_INFO, GET_CLASSROOM_INFO_WITH_NAME, DELETE_CLASSROOM_INFO} from "./actions";

const initState = {
    mobileOpen: false,
    selected: [],
    selectedData:[],
    rooms: [],
    page: 0,
    rowsPerPage: 5,
    open: false
};

export function roomResourceReducer(state = initState, action) {
    switch (action.type){
        case POST_CLASSROOM_INFO:
            return {...state, rooms: action.data.rooms}
        case GET_ALL_CLASSROOM_INFO: {
            console.log("In reducer: ", action.data.rooms)
            return {...state, rooms: action.data.rooms}
        }
        case GET_CLASSROOM_INFO_WITH_NAME:
            return {...state, rooms: action.data.rooms}
        case DELETE_CLASSROOM_INFO:
            return {...state, rooms: action.data.rooms}
        default: return {...state, rooms: initState.rooms}
    }
}
export default roomResourceReducer;