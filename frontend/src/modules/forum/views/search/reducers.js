import { SELECT_SEARCHTYPE, ANCHOR_MENU, GET_CONTENT, SEARCH } from './actions';
import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from './actions';

const initialState = {
    anchorEl: null,
    searchType: "post",
    content: "",
    results: {},
    isFetching: false,
    postPageSize: 10,
    sectionPageSize: 20,
    pageNum: undefined,
    errors:{},
}

export function searchReducer(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case SELECT_SEARCHTYPE:
            return (Object.assign({}, state, {
                searchType: action.searchType,
            }));
        case ANCHOR_MENU:
            return (Object.assign({}, state, {

                anchorEl: action.anchorEl,
            }));
        case GET_CONTENT:
            return (Object.assign({}, state, {
                content: action.content,
            }));
        case SEARCH_REQUEST:
            return (Object.assign({}, state, {
                isFetching: true,
            }));
        case SEARCH_SUCCESS:
            return (Object.assign({}, state, {
                isFetching: false,
                results: action.results,
            }));
        case SEARCH_FAILURE:
            return (Object.assign({}, state, {
                isFetching: false,
                errors: action.errors,
            }));
        default: return state;
    };
}