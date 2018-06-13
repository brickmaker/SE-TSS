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

                    <AppBar >
                    <Toolbar>
                       
                        
                        <Typography 
                            component={Link}
                            to="/"
                            variant="title" color="inherit">
                            教学管理系统B组
                        </Typography>

                        <Button 
                            component={Link}
                            raised
                            to="info"
                            color="inherit">信息系统</Button>
                        <Button 
                            component={Link}
                            raised
                            to=""
                            color="inherit">排课系统</Button>
                        <Button 
                            component={Link}
                            raised
                            to="xkxt"
                            color="inherit">选课系统</Button>
                        <Button 
                            component={Link}
                            raised
                            to="forum"
                            color="inherit">论坛交流</Button>
                        <Button 
                            component={Link}
                            raised
                            to=""
                            color="inherit">在线测试</Button>
                        <Button 
                            component={Link}
                            raised
                            to=""
                            color="inherit">成绩管理</Button>
                        

                    </Toolbar>
                </AppBar>


                        <div>
                            <Route exact path={'/'} component={Login}/>
                            <Route path={'/main'} component={Main}/>
                            <Route path={'/info'} component={Info}/>
                            <Route path={'/forum'} component={Forum}/>
                            <Route path={'/xkxt'} component={Xkxt}/>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
