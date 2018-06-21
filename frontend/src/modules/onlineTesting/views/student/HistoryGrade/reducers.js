import {GET_STUDENT_GRADE} from "./actions";

const initState = {
    studentGrade:[],
};
function studentHistoryGradeStatisticReducers(state,action){
    if(!state){
        state = initState;
    }
    switch (action.type){
        case GET_STUDENT_GRADE:
            return{
                ...state,
                studentGrade:action.studentGrade,
            };
        default:
            return state;
    }
}
export {studentHistoryGradeStatisticReducers};