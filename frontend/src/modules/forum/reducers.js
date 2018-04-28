import {combineReducers} from "redux";
import {mainReducer} from "./views/main/reducers";
import {coursesReducer} from "./views/courses/reducers"

export const forumReducer = combineReducers({
    main: mainReducer,
    courses: coursesReducer,
});

/*
export function forumReducer(state = initState, action) {
    switch (action.type) {
        case TEST_ADD_VAL:
            return Object.assign({}, state, {
                testVal: state.testVal + action.value
            });
        default:
            return state;
    }
}
*/