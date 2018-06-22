import React, {Component} from 'react';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import './App.css';
import store from './stores'


import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
    Button,
    Menu,
    MenuItem,
} from '@material-ui/core';


import Info from "../modules/info";
import Forum from "../modules/forum";
import Xkxt from "../modules/xkxt";
import Login from "../modules/info/components/LoginView"
import Main from "./components/Top";
import AutoCourse from "../modules/autoCourse";
import OnlineTesting from "../modules/onlineTesting"

const topStyles = {};


class App extends Component {
    state = {
        mobileOpen: false,
        anchorEl: null,
    };

    render() {

        return (

            <Provider store={store}>
                <BrowserRouter>
                    <div style={topStyles}>
                        <div>
                            <Route exact path={'/'} component={Login}/>
                            <Route path={'/main'} component={Main}/>
                            <Route path={'/info'} component={Info}/>
                            <Route path={'/forum'} component={Forum}/>
                            <Route path={'/xkxt'} component={Xkxt}/>
                            <Route path={'/online_testing'} component={OnlineTesting}/>
                            <Route path={'/autoCourse/teacherSchedule'} component={AutoCourse}/>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
