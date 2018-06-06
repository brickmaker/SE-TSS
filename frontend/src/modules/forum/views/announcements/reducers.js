import { ANNCS_REQUEST, ANNCS_SUCCESS, ANNCS_FAILURE, SET_HASFINISHED, NEWANNC_REQUEST, NEWANNC_SUCCESS, NEWANNC_FAILURE, SECTIONNAMES_SUCCESS, SECTIONNAMES_FAILURE } from "./actions";

// import {} from

const initialState = {
    //TODO:  
    pageSize: 10,
    anncNum: 0,
    // pageNum: 1,
    anncs: {},
    isFetching: false,
    errors: {},
    isPosting: false,
    hasFinished: false,
    isSuccess: false,
    sectionNames: undefined,
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
        case NEWANNC_REQUEST:
            return (Object.assign({}, state, {
                isPosting: true,
            }));
        case NEWANNC_SUCCESS:
            return (Object.assign({}, state, {
                isPosting: false,
                hasFinished: true,
                isSuccess: true,
            }));
        case NEWANNC_FAILURE:
            return (Object.assign({}, state, {
                isPosting: false,
                hasFinished: true,
                isSuccess: false,
            }));
        case SET_HASFINISHED:
            return (Object.assign({}, state, {
                hasFinished: action.hasFinished,
            }));
        case SECTIONNAMES_SUCCESS:
            return (Object.assign({}, state, {
                sectionNames: action.sectionNames,
            }));
        case SECTIONNAMES_FAILURE:
            return (Object.assign({}, state, {
                sectionNames: undefined,
                errors: action.errors,
            }));
        default: return state;
    };
}