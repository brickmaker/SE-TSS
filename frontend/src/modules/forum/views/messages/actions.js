export const SELECT_ENTRY = "select_entry";

export function selectEntry(id){
    console.log("action", id);
    return ({
        type: SELECT_ENTRY,
        id: id,
    });
}