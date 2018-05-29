import React from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
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

    handleClick(){
        this.setState({drawerOpen: !this.state.drawerOpen});
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
                <Drawer open={this.props.drawerOpen} width={200} >
                    <div >
                        <AppBar onLeftIconButtonTouchTap={() => this.props.handleClick()}/>
                        <MenuItem primaryText="个人信息" leftIcon={<ContentCopy />} />
                        <MenuItem primaryText="注册用户" leftIcon={<ContentCopy />} />
                        <MenuItem primaryText="用户管理" leftIcon={<ContentCopy />} />
                        <MenuItem primaryText="日志管理" leftIcon={<ContentCopy />} />
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
                >


                </AppBar>

            </div>
        );
    }
}


AdminBar.propType = {
    userName: PropTypes.string,
    drawerOpen: PropTypes.boolean,
    handleClick: PropTypes.func
};


