import {combineReducers} from "redux";
import {courseScheduleReducer} from "./views/CourseSchedule/reducers";
import {roomResourceReducer} from "./views/RoomResource/reducers";
import {courseArrangeReducer} from "./views/CourseArrange/reducers";
import {handleRequestReducer} from "./views/HandleRequest/reducers";
import {courseScheduleForTeacherReducer} from "./views/CourseScheduleForTeacher/reducers";

export const autoCourseReducer = combineReducers({
    courseSchedule: courseScheduleReducer,
    roomResource: roomResourceReducer,
    courseArrange: courseArrangeReducer,
    handleRequest: handleRequestReducer,
    courseScheduleForTeacher: courseScheduleForTeacherReducer,
});