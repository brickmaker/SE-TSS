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
import { Card, CardHeader, CardText } from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import StaffBar from "./StaffBar";

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


@connect(mapStateToProps, mapDispatchToProps)
export default class CreateLesson extends React.Component {

    constructor(props){
        super(props);

        this.state={
            userName : '',
            course_id : '',
            course_name : '',
            course_credit : -1,
            course_cap : -1,
            course_room : '',
            course_assessment:'',
            id_error : '',
            name_error : '',
            credit_error : '',
            cap_error : '',
            room_error : '',
            disabled : true,
            open: false,
            dialog_text:'',
            drawerOpen:true,
        };
    }

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }

    handleClose = () => {
        this.setState({open: false});
    };

    isDisabled(){
        let name_is_valid = false;
        let id_is_valid = false;
        let credit_is_valid = false;
        let cap_is_valid = false;
        let room_is_valid = false;

        if (this.state.course_id === '') {
            this.setState({
                id_error: "course ID is required",
            });
        } else {
            if (this.state.course_id.length < 10) {
                id_is_valid = true;
                this.setState({
                    id_error: null,
                });
            } else {
                this.setState({
                    id_error: "the course ID is too long",
                });
            }
        }

        if (this.state.course_name === '') {
            this.setState({
                name_error: "Course name is required.",
            });
        } else {
            if (this.state.course_name.length < 40) {
                name_is_valid = true;
                this.setState({
                    email_error_text: null,
                });
            } else {
                this.setState({
                    email_error_text: 'the course name is too long',
                });
            }
        }


        if (this.state.course_credit === -1 ) {
            this.setState({
                credit_error: 'course credit is required',
            });
        } else {
            if (this.state.course_credit <= 10 && this.state.course_credit > 0) {
                credit_is_valid = true;
                this.setState({
                    password_error_text: null,
                });
            } else {
                this.setState({
                    password_error_text: 'invalid credit',
                });
            }
        }


        if (this.state.course_cap === -1 ) {
            this.setState({
                cap_error: 'Course capacity is required',
            });
        } else {
            if (this.state.course_cap <= 300 && this.state.course_cap > 0) {
                cap_is_valid = true;
                this.setState({
                    cap_error: null,
                });
            } else {
                this.setState({
                    cap_error: 'invalid capacity',
                });
            }
        }


        if (this.state.course_room === '' ) {
            this.setState({
                room_error: 'classroom is required',
            });
        } else {
            room_is_valid = true;
            this.setState({
                room_error: null,
            });
        }

        if (id_is_valid && name_is_valid && credit_is_valid && room_is_valid && cap_is_valid ) {
            this.setState({
                disabled: false,
            });
        }

    }


    handleKeyPress(e){
        this.isDisabled();
        this.state.open = true;
        if (!this.state.disabled) {
            var status = this.apply(e).status;
            if (status == 200) {
                this.setState({
                dialog_text: "new Lesson added successfully",
            });
            } else {
                this.setState({
                    dialog_text: "new Lesson failed to add"});
            }

        }
        else{
            this.setState({
                dialog_text: "invalid submit",
            });

        }

    }
    apply(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("course_id", this.state.course_id);
        formData.append("name", this.state.course_name);
        formData.append("credit", this.state.course_credit);
        formData.append("capacity", this.state.course_cap);
        formData.append("classroom", this.state.course_room);
        formData.append("assessment", this.state.course_assessment);
        fetch('/api/register_course/', {
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'body': formData,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                return response
            })
            .catch((e) => {
                alert("身份验证失效，请重新登录");
                browserHistory.push("/login");
            });
    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state);
    }

    handleClick(){
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    render() {
        const actions = [
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
                <StaffBar handleClick={this.handleClick.bind(this)} drawerOpen={this.state.drawerOpen}/>
                {/*<Drawer open={this.state.drawerOpen} width={200} >*/}
                    {/*<div >*/}
                        {/*<AppBar onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: !this.state.drawerOpen })}/>*/}
                        {/*<MenuItem primaryText="个人信息" leftIcon={<ContentCopy />}  />*/}
                        {/*<MenuItem primaryText="课程信息" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/staff/lessons')}/>*/}
                        {/*<MenuItem primaryText="添加课程" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/staff/createLesson')}/>*/}
                        {/*<MenuItem primaryText="删除课程" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/staff/delete')}/>*/}
                        {/*<MenuItem primaryText="处理申请课程" leftIcon={<ContentCopy />} onClick={(e) => this.dispatchNewRoute(e, '/staff/process')} />*/}
                    {/*</div>*/}

                {/*</Drawer>*/}

                {/*<AppBar title={'Hello, '+this.state.userName}*/}
                        {/*onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: !this.state.drawerOpen })}*/}
                        {/*iconElementRight={*/}
                            {/*<FlatButton label="Back"  onClick={() => browserHistory.push("/staff")}/>*/}
                        {/*}*/}
                {/*/>*/}

                <Card style={contentStyle}>
                    <CardHeader title="新建课程信息" />

                    <Paper zDepth={2} style={{marginLeft:100,marginRight:100, marginTop:50}}>
                        <TextField hintText="Course ID" errorText={this.state.id_error} style={style} underlineShow={false} onChange={(e) => this.changeValue(e, 'course_id')}/>
                        <Divider />
                        <TextField hintText="Course Name" errorText={this.state.name_error} style={style} underlineShow={false} onChange={(e) => this.changeValue(e, 'course_name')}/>
                        <Divider />
                        <TextField hintText="Credit" errorText={this.state.credit_error} style={style} underlineShow={false} onChange={(e) => this.changeValue(e, 'course_credit')}/>
                        <Divider />
                        <TextField hintText="Capacity" errorText={this.state.cap_error} style={style} underlineShow={false} onChange={(e) => this.changeValue(e, 'course_cap')}/>
                        <Divider />
                        <TextField hintText="Classroom" errorText={this.state.room_error} style={style} underlineShow={false} onChange={(e) => this.changeValue(e, 'course_room')}/>
                        <Divider />
                        <TextField hintText="Assessment (Optional)"  style={style} underlineShow={false} onChange={(e) => this.changeValue(e, 'course_assessment')}/>
                        <Divider />
                    </Paper>
                    <RaisedButton
                        style={{ marginTop: 50 , marginLeft:'45%',marginBottom:20}}
                        label="Submit"
                        onClick={(e) => this.handleKeyPress(e)}
                    />

                </Card>
                <Dialog
                    title={this.state.dialog_text}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >

                </Dialog>
            </div>
        );
    }
}


CreateLesson.propType={

};


