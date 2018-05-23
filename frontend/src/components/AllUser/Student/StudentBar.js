import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from "react-router";
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import {Helmet} from "react-helmet";

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
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
export default class StudentBar extends React.Component {

    constructor(props){
        super(props);
        const redirectRoute = '/student';
        this.state={
            username:'',
            redirectTo: redirectRoute,
            drawerOpen:true,
        };
    }

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }


    dispatchNewRoute(e, route) {
        e.preventDefault();
        browserHistory.push(route);
        this.setState({
            redirectTo: route,
        });
    }

    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
    }

    render() {


        return (
            <div>
                <Helmet bodyAttributes={{style: 'background-color : #EEEEEE'}}/>
                <Drawer open={this.state.drawerOpen} width={200} >
                    <div >
                        <AppBar onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: !this.state.drawerOpen })}/>
                        <MenuItem primaryText="个人信息" leftIcon={<ContentCopy />} />
                        <MenuItem primaryText="课程信息" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/student/lessons')}/>
                        <MenuItem primaryText="退出" leftIcon={<ContentCopy />} onClick={(e) => this.logout(e)}/>
                        {/*<MenuItem primaryText="网上选课" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/student/')} />*/}
                    </div>

                </Drawer>

                <AppBar title={'Hello, '+this.state.userName}
                        onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: !this.state.drawerOpen })}
                        iconElementRight={
                            <div>
                                <FlatButton label={"基础信息管理"} style={buttonStyle} />
                                <FlatButton label={"自动排课"} style={buttonStyle}/>
                                <FlatButton label={"选择课程"} style={buttonStyle}/>
                                <FlatButton label={"论坛交流"} style={buttonStyle}/>
                                <FlatButton label={"在线测试"} style={buttonStyle}/>
                                <FlatButton label={"成绩管理"} style={buttonStyle}/>
                                <FlatButton label="Back"  onClick={() => browserHistory.push("/")} style={buttonStyle}/>
                            </div>
                        }
                />

            </div>
        );
    }
}


StudentBar.propType={


};


