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
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import {Helmet} from "react-helmet";
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import StaffView from "./StaffView";
import {browserHistory} from "react-router";
import jwtDecode from "jwt-decode";

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
export default class StaffBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            drawerOpen:true,
            open: false,
        };
    }
    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }

    dispatchNewRoute(e, route) {
        e.preventDefault();
        browserHistory.push(route);
    }
    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
    }


    render() {

        return (
            <div>
                <Helmet bodyAttributes={{style: 'background-color : #EEEEEE'}}/>
                <Drawer open={this.props.drawerOpen} width={200} >
                    <div >
                        <AppBar onLeftIconButtonTouchTap={() => this.props.handleClick()}/>
                        {/*<AppBar onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: !this.state.drawerOpen })}/>*/}
                        <MenuItem primaryText="个人信息" leftIcon={<ContentCopy />}  />
                        <MenuItem primaryText="课程信息" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/staff/lessons')}/>
                        <MenuItem primaryText="添加课程" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/staff/createLesson')}/>
                        <MenuItem primaryText="删除课程" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/staff/delete')}/>
                        <MenuItem primaryText="处理申请课程" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/staff/process')} />
                    </div>

                </Drawer>

                <AppBar
                        onLeftIconButtonTouchTap={() => this.props.handleClick()}
                        iconElementRight={
                            <div>
                                <FlatButton label={"基础信息管理"} style={buttonStyle}/>
                                <FlatButton label={"自动排课"} style={buttonStyle}/>
                                <FlatButton label={"选择课程"} style={buttonStyle}/>
                                <FlatButton label={"论坛交流"} style={buttonStyle}/>
                                <FlatButton label={"在线测试"} style={buttonStyle}/>
                                <FlatButton label={"成绩管理"} style={buttonStyle}/>

                                <FlatButton label={this.state.userName}  onClick={(e) => this.handleClick(e)} style={buttonStyle}/>
                                <Popover
                                    open={this.state.open}
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                    onRequestClose={this.handleRequestClose}
                                    animation={PopoverAnimationVertical}
                                >
                                    <Menu>
                                        <MenuItem primaryText="修改密码" onClick={(e) => this.dispatchNewRoute(e,'/staff/pwd')}/>
                                        <MenuItem primaryText="退出" onClick={(e) => this.logout(e)}/>
                                    </Menu>
                                </Popover>

                            </div>

                        }
                >


                </AppBar>

            </div>
        );
    }
}


StaffBar.propType = {
    userName: React.PropTypes.string,
    handleClick: React.PropTypes.func,
    drawerOpen:React.PropTypes.boolean,
};


