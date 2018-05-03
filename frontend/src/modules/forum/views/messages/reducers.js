import { SELECT_ENTRY } from './actions';
const initialState = {
    entries: [{ id: 0, username: "xxx", lastMessage: "hey" },
    { id: 1, username: "xxx", lastMessage: "hey" },
    { id: 2, username: "xxx", lastMessage: "hey" },
    { id: 3, username: "xxx", lastMessage: "hey" },
    { id: 4, username: "xxx", lastMessage: "hey" },
    { id: 5, username: "xxx", lastMessage: "hey" },
    { id: 6, username: "xxx", lastMessage: "hey" },
    { id: 7, username: "xxx", lastMessage: "hey" },
    { id: 8, username: "xxx", lastMessage: "hey" },
    { id: 9, username: "xxx", lastMessage: "hey" }],
    messages: [{ senderId: 1, content: "hey sent by1", time: "4.30" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha senffffffffffffffffffffffft by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
    { senderId: 0, content: "haha sent by0", time: "4.32" },
],
    selectedId: 0,
};

export function messageReducer(state = initialState, action) {
    console.log("reducer");
    switch (action.type) {
        case SELECT_ENTRY:
            console.log(action);
            return (Object.assign({}, state, {
                selectedId: action.id,
            }));
        default:
            return state;

    }
}