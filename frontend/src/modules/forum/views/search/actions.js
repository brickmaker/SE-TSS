export const SELECT_SEARCHTYPE = "select_type";

export function selectSearchType(searchType){
    return ({
        type: SELECT_SEARCHTYPE,
        searchType: searchType,
    });
}

export const ANCHOR_MENU = "anchor_menu";
export function anchorMenu(anchorEl){
    return ({
        type: ANCHOR_MENU,
        anchorEl: anchorEl,
    });
}

export const GET_CONTENT = "get_content";
export function getContent(content){
    return ({
        type:GET_CONTENT,
        content: content,
    });
}

export const SEARCH = "SEARCH";
export function search(searchType, content){
    return ({
        type: SEARCH,
        searchType: searchType,
        content: content,
    });
}