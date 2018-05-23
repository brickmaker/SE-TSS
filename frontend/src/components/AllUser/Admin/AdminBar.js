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
import {Helmet} from "react-helmet";

function mapStateToProps(state) {
    return {
        userName: state.auth.userName,
        data: state.auth.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
const buttonStyle = {
    color: 'white',
    width: 150,
    marginTop: 10,

}

@connect(mapStateToProps, mapDispatchToProps)
export default class AdminBar extends React.Component {

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

    dispatchNewRoute(e, route) {
        e.preventDefault();
        browserHistory.push(route);
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
                <Helmet bodyAttributes={{style: 'background-color : #EEEEEE'}}/>
                <Drawer open={this.state.drawerOpen} width={200} >
                    <div >
                        <AppBar onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: !this.state.drawerOpen })}/>
                        <MenuItem primaryText="个人信息" leftIcon={<ContentCopy />} />
                        <MenuItem primaryText="权限管理" leftIcon={<ContentCopy />} />
                        <MenuItem primaryText="查看日志" leftIcon={<ContentCopy />} />
                        <MenuItem primaryText="修改日志" leftIcon={<ContentCopy />} />
                        <MenuItem primaryText="处理申请课程" leftIcon={<ContentCopy />} />
                    </div>

                </Drawer>

                <AppBar title={'Hello, '+this.state.userName}
                        onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: !this.state.drawerOpen })}
                        iconElementRight={
                            <div>
                                <FlatButton label={"基础信息管理"} style={buttonStyle}/>
                                <FlatButton label={"自动排课"} style={buttonStyle}/>
                                <FlatButton label={"选课"} style={buttonStyle}/>
                                <FlatButton label={"论坛交流"} style={buttonStyle}/>
                                <FlatButton label={"在线测试"} style={buttonStyle}/>
                                <FlatButton label={"成绩管理"} style={buttonStyle}/>
                                <FlatButton label="Back"  onClick={() => browserHistory.push("/")} style={buttonStyle}/>
                            </div>

                        }
                >


                </AppBar>

            </div>
        );
    }
}


AdminBar.propType = {
    userName: React.PropTypes.string,
};


