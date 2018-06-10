import axios from 'axios';
import { ROOT_URL, DEBUG } from '../../configs/config';
export const SELECT_SEARCHTYPE = "select_type";

export function selectSearchType(searchType) {
    return ({
        type: SELECT_SEARCHTYPE,
        searchType: searchType,
    });
}

export const ANCHOR_MENU = "anchor_menu";
export function anchorMenu(anchorEl) {
    return ({
        type: ANCHOR_MENU,
        anchorEl: anchorEl,
    });
}

export const GET_SEARCHCONTENT = "get_searchcontent";
export function getContent(content) {
    return ({
        type: GET_SEARCHCONTENT,
        content: content,
    });
}


export const SEARCH = "SEARCH";
export const SEARCH_REQUEST = "search_request";
export const SEARCH_SUCCESS = "search_success";
export const SEARCH_FAILURE = "search_failure";

export function search(searchType, query, pageNum, pageSize) {
    console.log("action search", searchType, query, pageNum, pageSize);
    return (dispatch, getState) => {
        const { isFetching } = getState();
        if (isFetching) {
            return;
        }
        dispatch({ type: SEARCH_REQUEST });

        let params = DEBUG ? {
            resultType: searchType,
        } :
            {
                searchtype: searchType,
                query: query,
                pagenum: pageNum,
                pagesize: pageSize,
            };

        axios.get(`${ROOT_URL}/api/forum/search`, {
            params,
        })
            .then((response) => {
                dispatch({
                    type: SEARCH_SUCCESS,
                    //TODO: correct response
                    results: response.data[0].results,
                    resultNum: response.data[0].resultNum,
                });
            })
            .catch((errors) => {
                console.log("errors", errors);
                dispatch({
                    type: SEARCH_FAILURE,
                    errors: errors,
                })
            });
    }
}
