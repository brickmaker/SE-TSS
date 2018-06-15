import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom"

import StaffView from './components/Staff/StaffView';
import StaffLessonInfo from './components/Staff/LessonInfo';
import StaffAccountInfo from './components/Staff/AccountInfo';
import Main from './components/Main';
import TeacherView from './components/Teacher/TeacherView';
import Tea_LessonInfo from './components/Teacher/LessonInfo';
import AdminView from './components/Admin/AdminView';
import Admin_basicInfo from './components/Admin/BasicInfo';
import Tea_basicInfo from './components/Teacher/BasicInfo';
import StaffBasicInfo from './components/Staff/BasicInfo';
import LogInfo from './components/Admin/LogInfo';
import StudentView from './components/Student/StudentView';
import StudentBasicInfo from './components/Student/BasicInfo';

class Info extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/info" component={Main}/>
                    <Route exact path="/info/staff" component={StaffView}/>
                    <Route path="/info/staff/accounts" component={StaffAccountInfo}/>
                    <Route path="/info/staff/lessons" component={StaffLessonInfo}/>
                    <Route path="/info/staff/basicInfo" component={StaffBasicInfo}/>

                    <Route exact path="/info/teacher" component={TeacherView}/>
                    <Route path="/info/teacher/lessons" component={Tea_LessonInfo}/>
                    <Route path="/info/teacher/basicInfo" component={Tea_basicInfo}/>

                    <Route exact path="/info/admin" component={AdminView}/>
                    <Route path="/info/admin/basicInfo" component={Admin_basicInfo}/>
                    <Route path="/info/admin/logInfo" component={LogInfo}/>

                    <Route exact path="/info/student" component={StudentView}/>
                    <Route path="/info/student/basicInfo" component={StudentBasicInfo}/>




                </Switch>
            </div>
        );
    }
}


export default Info;
