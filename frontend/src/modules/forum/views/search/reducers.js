import { SELECT_SEARCHTYPE, ANCHOR_MENU, GET_CONTENT, SEARCH } from './actions';


const initialState = {
    anchorEl: null,
    searchType: "post",
    content: "",
    // results:
        // {
        //     resultType: "post", results: [
        //         { title:"tttttt", author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //         {  title:"tttttt",author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //         {  title:"tttttt",author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //         {  title:"tttttt",author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //         {  title:"tttttt",author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //         {  title:"tttttt",author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //         {  title:"tttttt",author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //         {  title:"tttttt",author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //         {  title:"tttttt",author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //         {  title:"tttttt",author: "xx", time: "4.30", replyCnt: 10, path: "/ff/fff/fff" },
        //     ]
        // },
        results:{
            resultType:"section", results:[
                {sectionName:"secton", path:"path"},
                {sectionName:"secton", path:"path"},
                {sectionName:"secton", path:"path"},
                {sectionName:"secton", path:"path"},
                {sectionName:"secton", path:"path"},
                {sectionName:"secton", path:"path"},
                {sectionName:"secton", path:"path"},
            ],
        },
}

export function searchReducer(state = initialState, action) {
    console.log(state, action);
    switch (action.type) {
        case SELECT_SEARCHTYPE:
            return (Object.assign({}, state, {
                searchType: action.searchType,
            }));
        case ANCHOR_MENU: return (Object.assign({}, state, {

            anchorEl: action.anchorEl,
        }));
        case GET_CONTENT:return (Object.assign({}, state,{
            content: action.content,
        }));
        case SEARCH: return (Object.assign({}, state, {
            searchType: action.searchType,
            // TODO: 获取results
        }))
        default: return state;
    };
}