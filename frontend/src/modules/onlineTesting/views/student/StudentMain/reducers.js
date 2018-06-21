export const GET_COURSE_LIST_STUDENT = 'get_course_list_student';
export const CHANGE_TOKEN ='change_token';


const initState = {
    course_list: [],
    token:""
};

function studentMainReducer(state, action){
    if(!state){
        state = initState;
    }
    switch (action.type) {
        case GET_COURSE_LIST_STUDENT:
            return {
                ...state,
                course_list: action.course_list
            };
        case CHANGE_TOKEN:
            return{
                ...state,
                token: action.token
            };
        default:
            return state;
    }
}
export {studentMainReducer};