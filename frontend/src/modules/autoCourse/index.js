import React from 'react';
import './index.css';
import { Redirect, Link, Switch, Route } from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import CourseSchedule from "./views/CourseSchedule/CourseSchedule";
import RoomResource from "./views/RoomResource/RoomResource";
import CourseArrange from "./views/CourseArrange/CourseArrange";
import HandleRequest from "./views/HandleRequest/HandleRequest";
import TeacherSchedule from "./views/TeacherSchedule/TeacherSchedule";
import ApplyRequest from "./views/ApplyRequest/ApplyRequest";
import Sorry from "./views/Sorry";
import {autoCourseReducer} from './reducers';
import {Divider, ListItem, ListItemIcon, ListItemText} from "material-ui";
import {Dashboard,LibraryBooks, BubbleChart, Notifications} from "@material-ui/icons";
import Bar from "../../top/components/Bar";

const loggerMiddleware = createLogger();
const store = createStore(
    autoCourseReducer,
    applyMiddleware(
        thunkMiddleware, // 允许我们 dispatch() 函数
        loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    )
);

const styles = {
    backgroundColor: '#f0f0ee',
    minHeight: '100vh', // todo: tmp solution for background color
    paddingLeft: 20,
    paddingRight: 20
};

class AutoCourse extends React.Component {
    render() {
        const listItems = (
            <div>
                <ListItem component={Link} to={`/autoCourse/courses`} button>
                    <ListItemIcon>
                        <Dashboard/>
                    </ListItemIcon>
                    <ListItemText primary="课表"/>
                </ListItem>
                <Divider/>
                <ListItem component={Link} to={`/autoCourse/roomResource`} button>
                    <ListItemIcon>
                        <LibraryBooks/>
                    </ListItemIcon>
                    <ListItemText primary="教室资源管理"/>
                </ListItem>
                <Divider/>
                <ListItem component={Link} to={`/autoCourse/courseArrange`} button>
                    <ListItemIcon>
                        <BubbleChart/>
                    </ListItemIcon>
                    <ListItemText primary="排课"/>
                </ListItem>
                <Divider/>
                <ListItem component={Link} to={`/autoCourse/handleRequest`} button>
                    <ListItemIcon>
                        <Notifications/>
                    </ListItemIcon>
                    <ListItemText primary="请求处理"/>
                </ListItem>
            </div>
        );
        const listItemsForTeacher = (
            <div>
                <ListItem component={Link} to={`/autoCourse/teacherSchedule`} button>
                    <ListItemIcon>
                        <Dashboard/>
                    </ListItemIcon>
                    <ListItemText primary="个人课表"/>
                </ListItem>
                <Divider/>
                <ListItem component={Link} to={`/autoCourse/applyRequest`} button>
                    <ListItemIcon>
                        <LibraryBooks/>
                    </ListItemIcon>
                    <ListItemText primary="调课申请"/>
                </ListItem>
            </div>
        );
        if (localStorage.getItem('type')==="3") {
            return (
                <Provider store={store}>
                    <div>
                        <Bar listItems={listItems}>
                            <div style={styles}>
                                <Switch>
                                    <Route path='/autoCourse/courses' component={CourseSchedule}/>
                                    <Route path='/autoCourse/roomResource' component={RoomResource}/>
                                    <Route path='/autoCourse/courseArrange' component={CourseArrange}/>
                                    <Route path='/autoCourse/handleRequest' component={HandleRequest}/>
                                    <Redirect from='/' to='/autoCourse/courses'/>
                                </Switch>
                            </div>
                        </Bar>
                    </div>
                </Provider>
            )
        }
        else if(localStorage.getItem('type')==="2"){
            return (
                <Provider store={store}>
                    <div>
                        <Bar listItems={listItemsForTeacher}>
                            <div style={styles}>
                                <Switch>
                                    <Route path='/autoCourse/teacherSchedule' component={TeacherSchedule}/>
                                    <Route path='/autoCourse/applyRequest' component={ApplyRequest}/>
                                    <Redirect from='/' to='/autoCourse/teacherSchedule'/>
                                </Switch>
                            </div>
                        </Bar>
                    </div>
                </Provider>
            )
        }
        else {
            return (
                <Sorry/>
            )
        }
    }
}

function mapStateToProps(state) {}

const mapDispatchToProps = (dispatch) =>({});

export default connect(null, null)(AutoCourse);
