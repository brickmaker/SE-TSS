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
import StaffBar from "./StaffBar";

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
export default class Sta_LessonInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson_data: [],
            userName: '',
            drawerOpen:true,
        };
    }
    handleClick(){
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    componentDidMount() {
        fetch('/api/course/',{
            method: 'GET',
            headers: {
                'Authorization': 'JWT '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ lesson_data: data })
            })
            .catch((e) => {
                alert("身份验证失效，请重新登录");
                browserHistory.push("/login");
            });
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
                <StaffBar handleClick={this.handleClick.bind(this)} drawerOpen={this.state.drawerOpen}/>

                <Card style={contentStyle}>
                    <TextField
                        style={{ marginLeft:'80%',width:200}}
                        hintText="输入课程名"
                        floatingLabelText="搜索"

                    />
                    <Table>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Course ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Credit</TableHeaderColumn>
                                <TableHeaderColumn>Classroom</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.state.lesson_data.map((row) => (
                                <TableRow key={row.course_id}>
                                    <TableRowColumn>{row.course_id}</TableRowColumn>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                    <TableRowColumn>{row.credit}</TableRowColumn>
                                    <TableRowColumn>{row.classroom}</TableRowColumn>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                    <hr/>

                </Card>
            </div>
        );
    }
}


Sta_LessonInfo.propType = {
    userName: React.PropTypes.string,
};


