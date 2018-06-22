import {combineReducers} from "redux";
import {courseScheduleReducer} from "./views/CourseSchedule/reducers";
import {roomResourceReducer} from "./views/RoomResource/reducers";
import {courseArrangeReducer} from "./views/CourseArrange/reducers";
import {handleRequestReducer} from "./views/HandleRequest/reducers";
import {teacherScheduleReducer} from "./views/TeacherSchedule/reducers";
import {applyRequestReducer} from "./views/ApplyRequest/reducers";

export const autoCourseReducer = combineReducers({
    courseSchedule: courseScheduleReducer,
    roomResource: roomResourceReducer,
    courseArrange: courseArrangeReducer,
    handleRequest: handleRequestReducer,
    teacherSchedule: teacherScheduleReducer,
    applyRequest: applyRequestReducer
});