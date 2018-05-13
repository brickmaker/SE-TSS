import { ANNCS_REQUEST, ANNCS_SUCCESS, ANNCS_FAILURE } from "./actions";

// import {} from

const initialState = {
    //TODO:  
    currentPageNum: 1,
    pageSize: 10,
    anncNum: 1000,
    anncs: {},
    isFetching: false,
    errors: {},
}

export function anncReducer(state = initialState, action) {
    switch (action.type) {
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
        default: return state;
    };
}