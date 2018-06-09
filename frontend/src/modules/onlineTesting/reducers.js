import {combineReducers} from "redux";
import {teacherMainReducer} from './views/teacher/TeacherMain/reducers'
import {paperManageReducer} from "./views/teacher/PaperManage/reducers";
import {paperViewReducer} from "./views/teacher/PaperView/reducers";
import {paperGenerateReducer} from "./views/teacher/PaperGenerate/reducers";
import {questionManageReducer} from "./views/teacher/QuestionManage/reducers";
import {studentMainReducer} from "./views/student/StudentMain/reducers";
import {examListReducer} from "./views/student/ExamList/reducers";
import {examinationReducer} from "./views/student/Examination/reducers";

export const onlineTestingReducer = combineReducers({
    teacher_main: teacherMainReducer,
    paper_manage: paperManageReducer,
    paper_view: paperViewReducer,
    paper_generate:paperGenerateReducer,
    question_manage:questionManageReducer,

    student_main: studentMainReducer,
    exam_list: examListReducer,
    examination: examinationReducer,

});
