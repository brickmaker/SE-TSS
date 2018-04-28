import {GOT_POST_INFO} from './actions'

const initState = {
    path: {
        college: {id: "", name: ""},
        course: {id: "", name: ""},
    },
    title: "",
}

export function postReducer(state = initState, action) {
    switch (action.type) {
        case GOT_POST_INFO:
            return Object.assign({}, state, {
                path: JSON.parse(JSON.stringify(action.postInfo.path)),
                title: action.postInfo.title
            })
        default:
            return state
    }
}
