import {combineReducers} from "redux";
import {mainReducer} from "./views/main/reducers";
import {coursesReducer} from "./views/courses/reducers"
import {courseReducer} from "./views/course/reducers"
import {teacherReducer} from "./views/teacher/reducers"
import {postReducer} from "./views/post/reducers"
import {messageReducer} from './views/messages/reducers';
import {searchReducer} from './views/search/reducers';
import {anncReducer} from './views/announcements/reducers';
import {collegesReducer} from "./views/colleges/reducers"

export const forumReducer = combineReducers({
    main: mainReducer,
    colleges: collegesReducer,
    courses: coursesReducer,
    course: courseReducer,
    teacher: teacherReducer,
    post: postReducer,
    messages: messageReducer,
    search: searchReducer,
    annc: anncReducer,
});
