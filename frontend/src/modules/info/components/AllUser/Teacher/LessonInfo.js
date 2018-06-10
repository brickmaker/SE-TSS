import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actionCreators from '../../../actions/auth';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import {Card, CardHeader, CardText} from 'material-ui/Card';
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




export default class Tea_LessonInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson_data: [],
            userName: '',
            drawerOpen: true,
        };
    }

    //TODO:get teacher's courses
    componentDidMount() {
        fetch('/api/course_faculty', {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                var json = JSON.parse(data);
                this.setState({lesson_data: json})
            })
            .catch((e) => {
                alert("获取课程信息错误，请重新登录");
            });

        this.setState({userName: localStorage.getItem('userName')});
    }

    handleClick(){
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    render() {
        const contentStyle = {
            transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)',
            margin: '50'
        };
        if (this.state.drawerOpen) {
            contentStyle.marginLeft = 220;
        }
        else {
            contentStyle.marginLeft = 50;
        }
        return (
            <div>
                <TeacherBar drawerOpen={this.state.drawerOpen} handleClick={this.handleClick.bind(this)}/>

                <Card style={contentStyle}>

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


Tea_LessonInfo.propType = {
    userName: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tea_LessonInfo)
