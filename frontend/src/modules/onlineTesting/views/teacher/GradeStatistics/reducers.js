import {
    CHANGE_TESTLIST, GET_COURSE_LIST_TEACHER, CHANGE_TOKEN, CHANGE_STUDENTLIST, CHANGE_TAGLIST,
    CHANGE_QUESTIONTYPELIST, CHANGE_TAGCHECKLIST
} from './actions'
const initState = {
    course_list: [],
    token:"",
    testList:[],
    studentList:[],
    tagList:[],
    questionTypeList:[],
    tagCheckList:[],
};

function teacherHistoryGradeStatisticReducers(state, action){
    if(!state){
        state = initState;
    }
    switch (action.type) {
        case GET_COURSE_LIST_TEACHER:
            return {
                ...state,
                course_list: action.course_list
            };
        case CHANGE_TOKEN:
            return{
                ...state,
                token: action.token
            };
        case CHANGE_TESTLIST:
            return{
                ...state,
               testList:action.testList
            };
        case CHANGE_STUDENTLIST:
            return{
                ...state,
                studentList:action.studentList
            };
        case CHANGE_TAGLIST:
            return{
                ...state,
                tagList:action.tagList
            };
        case CHANGE_QUESTIONTYPELIST:
            return{
                ...state,
                questionTypeList:action.questionTypeList
            };
        case CHANGE_TAGCHECKLIST:
            return{
                ...state,
                tagCheckList:action.tagCheckList
            };
        default:
            return state;
    }
}
export {teacherHistoryGradeStatisticReducers};
