import {TEST_ADD_VAL} from './actions'

const initState = {
    testVal: 0
};

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