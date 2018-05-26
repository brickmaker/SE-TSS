import { ANNCS_REQUEST, ANNCS_SUCCESS, ANNCS_FAILURE, SET_EDITING } from "./actions";

// import {} from

const initialState = {
    //TODO:  
    pageSize: 10,
    anncNum: 0,
    // pageNum: 1,
    anncs: {},
    isFetching: false,
    errors: {},
    isEditing: false,
}

export function anncReducer(state = initialState, action) {
    switch (action.type) {
        // case SET_PAGENUM:
        //     return (Object.assign({}, state, {
        //         pageNum: action.pageNum,
        //     }));
        case ANNCS_REQUEST:
            return (Object.assign({}, state, {
                isFetching: true,
            }));
        case ANNCS_SUCCESS:
            return (Object.assign({}, state, {
                isFetching: false,
                anncNum: action.anncNum,
                anncs: action.anncs,
            }));
        case ANNCS_FAILURE:
            return (Object.assign({}, state, {
                isFetching: false,
                errors: action.errors,
            }));
        case SET_EDITING:
            return (Object.assign({}, state, {
                isEditing: action.isEditing,
            }));
        default: return state;
    };
}