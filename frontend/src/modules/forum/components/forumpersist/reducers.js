import { SELECT_ENTRY } from "../../views/messages/actions";

const initialState = {
    selectedId: undefined,
    selectedAvatar: undefined,
    selectedUsername: undefined,
}


export const forumPersistReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_ENTRY:
            return (Object.assign({}, state, {
                selectedId: action.selectedId,
                selectedAvatar: action.selectedAvatar,
                selectedUsername: action.selectedUsername,
            }));
        default: return state;
    }
}