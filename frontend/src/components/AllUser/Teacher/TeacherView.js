import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import {browserHistory} from "react-router";
import jwtDecode from "jwt-decode";
import TeacherBar from "./TeacherBar";

function mapStateToProps(state) {
    return {
        userName: state.auth.userName,
        data: state.auth.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class TeacherView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            drawerOpen:true,
        };
    }


    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }


    render() {
        const contentStyle = {
            transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' ,
            margin: '50'
        };
        if (this.state.drawerOpen) {
            contentStyle.marginLeft = 220;
        }
        else{
            contentStyle.marginLeft = 50;
        }
        return (
            <div>
              <TeacherBar/>

                <Card style={contentStyle}>
                    <CardHeader title={"欢迎登录基础信息管理系统"}/>
                    <hr/>
                </Card>
            </div>
        );
    }
}


TeacherView.propType = {
    userName: React.PropTypes.string,
};


