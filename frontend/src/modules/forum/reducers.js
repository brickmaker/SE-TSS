import {combineReducers} from "redux";
import {mainReducer} from "./views/main/reducers";
import {coursesReducer} from "./views/courses/reducers"
import {courseReducer} from "./views/course/reducers"
import {teacherReducer} from "./views/teacher/reducers"
import {postReducer} from "./views/post/reducers"

export const forumReducer = combineReducers({
    main: mainReducer,
    courses: coursesReducer,
    course: courseReducer,
    teacher: teacherReducer,
    post: postReducer
});
