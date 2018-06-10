export default connect(mapStateToProps, mapDispatchToProps)(StudentView)
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from "react-router";
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import TeacherBar from "./TeacherBar";

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const style = {
    marginLeft: 20,
};





export default class ApplyLesson extends React.Component {

    constructor(props){
        super(props);
        const redirectRoute = '/teacher/apply';
        this.state={
            username : 'teacher',
            course_id : '',
            course_name : '',
            course_credit : '',
            course_cap : '',
            course_room : '',
            course_assessment:'',
            redirectTo : redirectRoute,
            id_errortext : '',
            name_errortext : '',
            credit_errortext : '',
            cap_errortext : '',
            room_errortext : '',
            disabled : true,
            open: false,
            dialog_text:'',
            drawerOpen:true,
            flag: 0,
        };
    }

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }
    handleClick(){
        this.setState({drawerOpen: !this.state.drawerOpen});
    }
    isDisabled(){
        let name_is_valid = false;
        let id_is_valid = false;
        let credit_is_valid = false;
        let cap_is_valid = false;
        let room_is_valid = false;
        if (this.state.flag === 1) {
            if (this.state.course_id === '') {
                this.setState({
                    id_errortext: "Course ID is required.",
                });
            } else if (this.state.course_id.length < 10) {
                id_is_valid = true;
                this.setState({
                    id_errortext: null,
                });
            } else {
                this.setState({
                    id_errortext: "Sorry, the course ID is too long",
                });
            }


            if (this.state.course_name === '') {
                this.setState({
                    name_errortext: "Course name is required.",

                });
            } else if (this.state.course_name.length < 40) {
                name_is_valid = true;
                this.setState({
                    name_errortext: null,
                });
            } else {
                this.setState({
                    name_errortext: 'Sorry, the course name is too long',
                });
            }


            if (this.state.course_credit === -1) {
                this.setState({
                    credit_errortext: 'Course credit is required.',
                });
            } else if (this.state.course_credit <= 10 && this.state.course_credit > 0) {
                credit_is_valid = true;
                this.setState({
                    credit_errortext: null,
                });
            } else {
                this.setState({
                    credit_errortext: 'Invalid credit.',
                });
            }


            if (this.state.course_cap === -1) {
                this.setState({
                    cap_errortext: 'Course capacity is required.',
                });
            } else if (this.state.course_cap <= 300 && this.state.course_cap > 0) {
                cap_is_valid = true;
                this.setState({
                    cap_errortext: null,
                });
            } else {
                this.setState({
                    cap_errortext: 'Invalid capacity.',
                });
            }


            if (this.state.course_room === '') {
                this.setState({
                    room_errortext: 'Classroom is required.',
                });
            } else {
                room_is_valid = true;
                this.setState({
                    room_errortext: null,
                });
            }
        }
        if(this.state.flag === 0){
            if (this.state.course_id.length < 10) {
                id_is_valid = true;
            }

           if (this.state.course_name.length < 40) {
                name_is_valid = true;
            }

            if (this.state.course_credit <= 10 && this.state.course_credit > 0) {
                credit_is_valid = true;
            }

           if (this.state.course_cap <= 300 && this.state.course_cap > 0) {
                cap_is_valid = true;
            }

            if (this.state.course_room) {
                room_is_valid = true;
            }
        }

        if( id_is_valid && name_is_valid && credit_is_valid && room_is_valid && cap_is_valid ) {
            this.setState({
                disabled:false,
            });
        }
        else {
            this.setState({
                disabled:true,
            });
        }

    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state);
        this.isDisabled();
    }

    handleKeyPress(e){
        this.state.flag = 1;
        this.isDisabled();
        this.state.open = true;


        if (this.state.disabled === false) {
            this.apply(e);
            this.setState({
                dialogText: "课程将被尽快审批！",
                course_id : '',
                course_name : '',
                course_credit : '',
                course_cap : '',
                course_room : '',
                course_assessment:'',

            });
        }
        else{
            this.setState({
                dialogText: "请填写所有必需信息!",
            });
        }

    }


    apply(e) {
        e.preventDefault();
    }
    render() {
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
            <div>
                <TeacherBar drawerOpen={this.state.drawerOpen} handleClick={this.handleClick.bind(this)}/>

                <Card style={contentStyle}>
                    <CardHeader title="填写申请课程信息" />
                    <Paper zDepth={2} style={{marginLeft:100,marginRight:100, marginTop:50}}>
                        <TextField hintText="Course ID" errorText={this.state.id_errortext}  style={style} underlineShow={false}
                                   onChange={(e) => this.changeValue(e, 'course_id')} value={this.state.course_id}/>
                        <Divider />
                        <TextField hintText="Course Name" errorText={this.state.name_errortext} style={style} underlineShow={false}
                                   onChange={(e) => this.changeValue(e, 'course_name')} value={this.state.course_name}/>
                        <Divider />
                        <TextField hintText="Credit" errorText={this.state.credit_errortext} style={style} underlineShow={false}
                                   onChange={(e) => this.changeValue(e, 'course_credit')} value={this.state.course_credit}/>
                        <Divider />
                        <TextField hintText="Capacity" errorText={this.state.cap_errortext} style={style} underlineShow={false}
                                   onChange={(e) => this.changeValue(e, 'course_cap')} value={this.state.course_cap}/>
                        <Divider />
                        <TextField hintText="Classroom" errorText={this.state.room_errortext} style={style} underlineShow={false}
                                   onChange={(e) => this.changeValue(e, 'course_room')} value={this.state.course_room}/>
                        <Divider />
                        <TextField hintText="Assessment (Optional)"  style={style} underlineShow={false}
                                   onChange={(e) => this.changeValue(e, 'course_assessment')} value={this.state.course_assessment}/>
                        <Divider />
                    </Paper>
                    <RaisedButton
                    //    disabled={this.state.disabled}
                        style={{ marginTop: 50, marginLeft:'50%', marginBottom: 20}}
                        label="Submit"
                        onClick={(e) => this.handleKeyPress(e)}
                    />
                </Card>

                <Dialog
                    title={this.state.dialog_text}
                    actions={action}
                    modal={false}
                    open={this.state.open}
                >

                </Dialog>
            </div>
        );
    }
}


ApplyLesson.propType={
};
export default connect(mapStateToProps, mapDispatchToProps)(ApplyLesson)

