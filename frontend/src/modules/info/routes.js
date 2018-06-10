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


import TeacherView from './components/AllUser/Teacher/TeacherView';
//import TeacherBasicInfo from './components/AllUser/Teacher/Tea_basicInfo';
//import Tea_LessonInfo from './components/AllUser/Teacher/LessonInfo';

//import ApplyLesson from './components/AllUser/Teacher/ApplyLesson';


import StaffView from './components/AllUser/Staff/StaffView';
import Sta_LessonInfo from './components/AllUser/Staff/LessonInfo';
import Staff_AccountInfo from './components/AllUser/Staff/AccountInfo';
import Sta_basicInfo from './components/AllUser/Staff/Sta_basicInfo';
import StaffPwd from './components/AllUser/Staff/ChangePwd';

import CardContentInit from './components/AllUser/Bar';

import MainMenu from './components/MainMenu';

import AdminView from './components/AllUser/Admin/AdminView';
import Admin_basicInfo from './components/AllUser/Admin/Admin_basicInfo';



import { DetermineAuth } from './components/DetermineAuth';
import { requireAuthentication } from './components/AuthenticatedComponent';
import { requireNoAuthentication } from './components/notAuthenticatedComponent';

export default (
    <Route path="/info/" component={App}>
        {/*<Route path = "main" component = {requireAuthentication(ProtectedView)} />*/}
        <Route path = "login" component = {requireNoAuthentication(LoginView)} />
        <Route path = "register" component = {requireNoAuthentication(RegisterView)} />
        <Route path = "home" component = {requireNoAuthentication(HomeContainer)} />
        <Route path = "notFound" component = {DetermineAuth(NotFound)} />

        <Route path = "main"  component = {MainMenu}/>


        <Route path = "student"  component = {StudentView}/>

        <Route path = "student/basicInfo" component = {StudentBasicInfo} />

        <Route path = "teacher" component = {TeacherView}/>
        

        <Route path = "staff" component = {StaffView}/>
        <Route path = "staff/pwd" component = {StaffPwd}/>
        <Route path = "staff/lessons" component = {Sta_LessonInfo} />
        <Route path = "staff/accounts" component = {Staff_AccountInfo} />
        <Route path = "staff/basicInfo" component = {Sta_basicInfo} />

        <Route path = "admin" component = {AdminView}/>
        <Route path = "admin/basicInfo" component = {Admin_basicInfo}/>


    </Route>
);
