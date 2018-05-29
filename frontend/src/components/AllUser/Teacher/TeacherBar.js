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
import PropTypes from 'prop-types';
import jwtDecode from "jwt-decode";
import {Helmet} from "react-helmet";
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';

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
export default class TeacherBar extends React.Component {

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
    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
        this.setState({
            open: false,
        });
    }

    render() {

        return (
            <div>
                <Helmet bodyAttributes={{style: 'background-color : #EEEEEE'}}/>
                <Drawer open={this.props.drawerOpen} width={200} >
                    <div >
                        <AppBar onLeftIconButtonTouchTap={() => this.props.handleClick()}/>
                        <MenuItem primaryText="个人信息" leftIcon={<ContentCopy />}  />
                        <MenuItem primaryText="课程信息" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/teacher/lessons')}/>
                        <MenuItem primaryText="申请课程" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/teacher/apply')} />
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
                                        <MenuItem primaryText="修改密码" />
                                        <MenuItem primaryText="退出" onClick={(e) => this.logout(e)}/>
                                    </Menu>
                                </Popover>

                            </div>
                        }
                />


            </div>
        );
    }
}


TeacherBar.propType = {
    userName: PropTypes.string,
    drawerOpen: PropTypes.boolean,
    handleClick: PropTypes.func
};


