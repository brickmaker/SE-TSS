/* eslint new-cap: 0 */

import React from 'react';
import { Route } from 'react-router';

/* containers */
import { App } from './containers/App';
import { HomeContainer } from './containers/HomeContainer';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import ProtectedView from './components/ProtectedView';
import Analytics from './components/Analytics';
import NotFound from './components/NotFound';
import StudentView from './components/AllUser/Student/StudentView';
import StudentBasicInfo from './components/AllUser/Student/Stu_basicInfo';
import Lessons_info from './components/AllUser/Student/LessonInfo';
import TeacherView from './components/AllUser/Teacher/TeacherView';
import ApplyLesson from './components/AllUser/Teacher/ApplyLesson';
import TeacherBasicInfo from './components/AllUser/Teacher/Tea_basicInfo';
import StaffView from './components/AllUser/Staff/StaffView';
import Sta_LessonInfo from './components/AllUser/Staff/LessonInfo';
import Staff_AccountInfo from './components/AllUser/Staff/AccountInfo';
import CardContentInit from './components/AllUser/Staff/StaffBar';
import Sta_basicInfo from './components/AllUser/Staff/Sta_basicInfo';
import Tea_LessonInfo from './components/AllUser/Teacher/LessonInfo';
import MainMenu from './components/MainMenu';
import AdminView from './components/AllUser/Admin/AdminView';
import StaffPwd from './components/AllUser/Staff/ChangePwd';


import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

export default (
    <Route path="/" component={App}>
        {/*<Route path = "main" component = {requireAuthentication(ProtectedView)} />*/}
        <Route path = "login" component = {requireNoAuthentication(LoginView)} />
        <Route path = "register" component = {requireNoAuthentication(RegisterView)} />
        <Route path = "home" component = {requireNoAuthentication(HomeContainer)} />
        <Route path = "notFound" component = {DetermineAuth(NotFound)} />

        <Route path = "main"  component = {MainMenu}/>


        <Route path = "student"  component = {StudentView}/>
        {/*<Route path = "student/basicInfo" component = {StudentBasicInfo}/>*/}
        <Route path = "student/lessons" component = {Lessons_info}/>

        <Route path = "teacher" component = {TeacherView}/>
        {/*<Route path = "teacher/basicinfo" component = {TeacherBasicInfo}/>*/}
        <Route path = "teacher/apply" component = {ApplyLesson}/>
        <Route path = "teacher/lessons"  components={Tea_LessonInfo}/>

        <Route path = "staff" component = {StaffView}/>
        <Route path = "staff/pwd" component = {StaffPwd}/>
        <Route path = "staff/lessons" component = {Sta_LessonInfo} />
        <Route path = "staff/accounts" component = {Staff_AccountInfo} />

        <Route path = "admin" component = {AdminView}/>

    </Route>
);
