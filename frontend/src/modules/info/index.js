import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom"

import StaffView from './components/Staff/StaffView';
import StaffLessonInfo from './components/Staff/LessonInfo';
import StaffAccountInfo from './components/Staff/AccountInfo';
import Main from './components/Main';

class Info extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/info" component={Main}/>
                    <Route exact path="/info/staff" component={StaffView}/>
                    <Route path="/info/staff/accounts" component={StaffAccountInfo}/>
                    <Route path="/info/staff/lessons" component={StaffLessonInfo}/>
                </Switch>
            </div>
        );
    }
}


export default Info;
