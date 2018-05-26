import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import {browserHistory} from "react-router";
import AppBar from 'material-ui/AppBar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {grey400} from 'material-ui/styles/colors';
import StaffBar from "./StaffBar";
import TextField from 'material-ui/TextField';



function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
        userName: state.auth.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
const contentStyle = {
    // transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' ,
    // margin: '50',
    width:600,
    margin:100,
    marginLeft:400,
};


@connect(mapStateToProps, mapDispatchToProps)
export default class StaffPwd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            drawerOpen: false,
            password:'',
        }
    }

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }

    handleClick(){
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    handleKeyPress(){

    }
    render() {

        // if (this.state.drawerOpen) {
        //     contentStyle.marginLeft = 220;
        // }
        // else{
        //     contentStyle.marginLeft = 50;
        // }


        return (
            <div >

                <StaffBar handleClick={this.handleClick.bind(this)} drawerOpen={this.state.drawerOpen}/>

                <Card style={contentStyle}>
                    <CardHeader title="修改密码信息" />

                        <TextField
                        hintText="Old Password"
                        floatingLabelText="Old Password"
                        type="password"
                        style={{marginLeft:150}}
                    /><br />
                        <TextField
                            hintText="New Password"
                            floatingLabelText="New Password"
                            type="password"
                            style={{marginLeft:150}}
                        /><br />
                        <TextField
                            hintText="New Password"
                            floatingLabelText="New Password(again)"
                            type="password"
                            style={{marginLeft:150}}
                        /><br />
                    <RaisedButton
                        style={{ marginTop: 10, marginLeft:'40%', marginBottom: 20}}
                        label="Submit"
                        onClick={(e) => this.handleKeyPress(e)}
                    />

                </Card>

            </div>

        );
    }
}


StaffPwd.propType={
    userName:React.PropTypes.string,

};


