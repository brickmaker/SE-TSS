import { combineReducers } from "redux";
import { mainReducer } from "./views/main/reducers";
import { coursesReducer } from "./views/courses/reducers"
import { courseReducer } from "./views/course/reducers"
import { teacherReducer } from "./views/teacher/reducers"
import { postReducer } from "./views/post/reducers"
import { messageReducer } from './views/messages/reducers';
import { searchReducer } from './views/search/reducers';
import { anncReducer } from './views/announcements/reducers';
import { collegesReducer } from "./views/colleges/reducers"
import { managementReducer } from './views/management/reducers';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { createFilter } from 'redux-persist-transform-filter';
import { usercenterReducer } from "./views/usercenter/reducers";
import { forumPersistReducer } from "./components/forumpersist/reducers";

// export const forumReducer = combineReducers({
//     main: mainReducer,
//     colleges: collegesReducer,
//     courses: coursesReducer,
//     course: courseReducer,
//     teacher: teacherReducer,
//     post: postReducer,
//     messages: messageReducer,
//     search: searchReducer,
//     annc: anncReducer,
//     management: managementReducer,
// });


// const persistedFilter = createFilter('forumpersit', ['selectedId','selectedAvatar', 'selectedUsername']);

export const forumReducer = persistReducer(
    {
        key: 'forumPersist',
        storage: storage,
        whitelist: ['forumpersist'],
        // transforms: [persistedFilter]
    },
    combineReducers({
        main: mainReducer,
        colleges: collegesReducer,
        courses: coursesReducer,
        course: courseReducer,
        teacher: teacherReducer,
        post: postReducer,
        messages: messageReducer,
        search: searchReducer,
        annc: anncReducer,
        management: managementReducer,
        usercenter: usercenterReducer,
        forumpersist: forumPersistReducer,
    })
);
