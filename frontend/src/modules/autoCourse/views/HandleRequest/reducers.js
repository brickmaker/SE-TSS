import {
    AGREE_REQUEST,
    REJECT_REQUEST,
    DISPLAY_REQUEST_ADMINISTRATOR,
} from "./actions";

const initState = {
    data: [],
}

export function handleRequestReducer(state = initState, action) {
    switch (action.type){
        case DISPLAY_REQUEST_ADMINISTRATOR:
            return {...state, data: action.data.notifications}
        case AGREE_REQUEST:
            return {...state, data: action.data.notifications}
        case REJECT_REQUEST:
            return {...state, data: action.data.notifications}
        default:return state

    }
}
export default  handleRequestReducer;