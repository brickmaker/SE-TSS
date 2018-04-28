import {GOT_SUBSCRIPTIONS} from "./actions";

const initState = {
    subscriptions: []
};

export function mainReducer(state = initState, action) {
    switch (action.type) {
        case GOT_SUBSCRIPTIONS:
            return Object.assign({}, state, {
                subscriptions: action.subscriptions
            });
        default:
            return state;
    }
}