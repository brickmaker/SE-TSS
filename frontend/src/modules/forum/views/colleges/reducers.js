import {GOT_COLLEGES} from "./actions";

const initState = {
    colleges: {
        '人文': [],
        '理': [],
        '医': [],
        '工': [],
        '农业生命环境': [],
        '社会科学': [],
        '信息': [],
    }
};

export function collegesReducer(state = initState, action) {
    switch (action.type) {
        case GOT_COLLEGES:
            return Object.assign({}, state, {
                colleges: action.colleges
            });
        default:
            return state;
    }
}