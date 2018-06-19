import React from 'react';
import './index.css';
import { Switch, Route } from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import CourseSchedule from "./views/CourseSchedule/CourseSchedule";
import RoomResource from "./views/RoomResource/RoomResource";
import CourseArrange from "./views/CourseArrange/CourseArrange";
import HandleRequest from "./views/HandleRequest/HandleRequest";
import CourseScheduleForTeacher from "./views/CourseScheduleForTeacher/CourseScheduleForTeacher"
import {autoCourseReducer} from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
    autoCourseReducer,
    applyMiddleware(
        thunkMiddleware, // 允许我们 dispatch() 函数
        loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    )
)

class AutoCourse extends React.Component {
    render() {
        return (
            <Provider store={store}>
                    <div>
                        <Switch>
                            <Route exact path='/autoCourse/courses' component={CourseSchedule}/>
                            <Route path='/autoCourse/roomResource' component={RoomResource}/>
                            <Route path='/autoCourse/courseArrange' component={CourseArrange}/>
                            <Route path='/autoCourse/handleRequest' component={HandleRequest}/>
                            <Route path='/autoCourse/coursesForTeacher' component={CourseScheduleForTeacher}/>
                            <Route path='/autoCourse/requestForTeacher' component={HandleRequest}/>
                        </Switch>
                    </div>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, null)(AutoCourse);
