import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
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
import StaffBar from "./StaffBar";

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
const tableData = [{
    "course_id": "1",
    "name": "cs211n",
    "credit": 2.5,
    "capacity": 150,
    "classroom": "101",
    "assessment": "test",
    "state": 0
},  {
    "course_id": "2",
    "name": "cs231",
    "credit": 3.0,
    "capacity": 180,
    "classroom": "103",
    "assessment": "no test",
    "state": 0
}
];


@connect(mapStateToProps, mapDispatchToProps)
export default class LessonPro extends React.Component {

    constructor(props){
        super(props);

        this.state={
            username:'staff',
            selected:'',
            dialog_text:null,
            open:false,
            drawerOpen:true,
            lesson_state:0,
            lesson_data:[],


        };
    }

    componentDidMount() {
        fetch('/api/course/?state=1',{
            method: 'GET',
            headers: {
                'Authorization': 'JWT '+ localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // for(let row of data) {
                //     if(row.state === 0)
                //         this.state.lesson_data.push({row});
                this.setState({
                    lesson_data:data,

                });
            })
            .catch((e) => {
                alert("身份验证失效，请重新登录");
                browserHistory.push("/login");
            });
        this.setState({userName: localStorage.getItem('userName')});
    }

    handleClose = () => {
        this.setState({open: false});
    };

    isSelected = (index) => {
        return this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };
    handleKeyPress(e){
//state to be 1
        if (!this.state.selected) {
            this.setState({
                lesson_state : 1,
            });
            this.process(e);

        }
        else{
            this.setState({
                open: true,
                dialog_text: "Please select one lesson!",
            });

        }

    }



    _handleKeyPress(e){
//state to be -1
        if (!this.state.selected) {
            this.setState({
                lesson_state : -1,
            });
            this.process(e);
        }
        else{
            this.setState({
                open: true,
                dialog_text: "Please select one lesson!",
            });

        }

    }
    process(e) {
        e.preventDefault();
    }


    render(){
        const action = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,
        ];

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
            <div >
              <StaffBar/>

                <Card style={contentStyle}>
                    <CardHeader title="教师申请课程审批" />
                    <hr/>
                    <Table onRowSelection={this.handleRowSelection} multiSelectable={false}  >
                        <TableHeader>
                            <TableRow  >
                                <TableHeaderColumn>Course ID</TableHeaderColumn>
                                <TableHeaderColumn>Name</TableHeaderColumn>
                                <TableHeaderColumn>Credit</TableHeaderColumn>
                                <TableHeaderColumn>Capacity</TableHeaderColumn>
                                <TableHeaderColumn>Classroom</TableHeaderColumn>
                                <TableHeaderColumn>Assessment</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody showRowHover={true}>

                            {this.state.lesson_data.map( (row) => (

                                <TableRow key={row.course_id} selected = {this.isSelected(row.course_id)}  >
                                    <TableRowColumn>{row.course_id}</TableRowColumn>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                    <TableRowColumn>{row.credit}</TableRowColumn>
                                    <TableRowColumn>{row.capacity}</TableRowColumn>
                                    <TableRowColumn>{row.classroom}</TableRowColumn>
                                    <TableRowColumn>{row.assessment}</TableRowColumn>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                    <RaisedButton
                        style={{ marginTop: 50, marginLeft:'35%', marginBottom:'5%'}}
                        label="Accept"
                        onClick={(e) => this.handleKeyPress(e)}
                    />
                    <RaisedButton
                        style={{ marginTop: 50,marginLeft:'10%'}}
                        label="Decline"
                        onClick={(e) => this._handleKeyPress(e)}
                    />
                </Card>
                <Dialog
                    title={this.state.dialog_text}
                    actions={action}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                />

            </div>
        );
    }
}


LessonPro.propType={
};


