import {
    APPLY_REQUEST,
    DELETE_REQUEST,
    DISPLAY_REQUEST_ADMINISTRATOR,
} from "./actions";

const initState = {
    data: [],
}

export function applyRequestReducer(state = initState, action) {
    switch (action.type){
        case DISPLAY_REQUEST_ADMINISTRATOR:
            return {...state, data: action.data.notifications}
        case APPLY_REQUEST:
            return {...state, data: action.data.notifications}
        case DELETE_REQUEST:
            return {...state, data: action.data.notifications}
        default:return state

    }
}
export default  applyRequestReducer;