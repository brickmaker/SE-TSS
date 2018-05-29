import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {browserHistory} from "react-router";
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import StaffBar from "./StaffBar";
import MenuItem from '@material-ui/core/MenuItem';

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '90%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    Button: {
        marginTop: 50,
        marginLeft: '45%',
        marginBottom: 20,
    },
    Paper: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 50
    },
    TextField: {
        width: '90%',
        marginLeft: '5%',
    }
});


const ranges = [
    {
        value: '0',
        label: '公共通识课',
    },
    {
        value: '1',
        label: '专业选修课',
    },
    {
        value: '2',
        label: '专业必修课',
    },
];


@connect(mapStateToProps, mapDispatchToProps)
class CreateLesson extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            course_id: '',
            course_name: '',
            course_credit: -1,
            course_cap: -1,
            course_room: '',
            course_assessment: '',
            course_type: '',
            id_error: '',
            name_error: '',
            credit_error: '',
            cap_error: '',
            room_error: '',
            disabled: true,
            dialogOpen: false,
            dialog_text: '',
            open: true,
            anchor: 'left',
        };
    }

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }

    handleClose = () => {
        this.setState({dialogOpen: false});
    };

    isDisabled() {
        let name_is_valid = false;
        let id_is_valid = false;
        let credit_is_valid = false;
        let cap_is_valid = false;
        let room_is_valid = false;

        if (this.state.course_id === '') {
            this.setState({
                id_error: "课程号为必填项",
            });
        } else {
            if (this.state.course_id.length < 10) {
                id_is_valid = true;
                this.setState({
                    id_error: null,
                });
            } else {
                this.setState({
                    id_error: "课程号过长",
                });
            }
        }

        if (this.state.course_name === '') {
            this.setState({
                name_error: "课程名为必填项",
            });
        } else {
            if (this.state.course_name.length < 40) {
                name_is_valid = true;
                this.setState({
                    email_error_text: null,
                });
            } else {
                this.setState({
                    email_error_text: '课程名过长',
                });
            }
        }


        if (this.state.course_credit === -1) {
            this.setState({
                credit_error: '课程学分为必填项',
            });
        } else {
            if (this.state.course_credit <= 10 && this.state.course_credit > 0) {
                credit_is_valid = true;
                this.setState({
                    password_error_text: null,
                });
            } else {
                this.setState({
                    password_error_text: '课程学分非法',
                });
            }
        }


        if (this.state.course_cap === -1) {
            this.setState({
                cap_error: '课程容量为必填项',
            });
        } else {
            if (this.state.course_cap <= 300 && this.state.course_cap > 0) {
                cap_is_valid = true;
                this.setState({
                    cap_error: null,
                });
            } else {
                this.setState({
                    cap_error: '课程容量非法',
                });
            }
        }


        if (this.state.course_room === '') {
            this.setState({
                room_error: '教室为必填项',
            });
        } else {
            room_is_valid = true;
            this.setState({
                room_error: null,
            });
        }

        if (id_is_valid && name_is_valid && credit_is_valid && room_is_valid && cap_is_valid) {
            this.setState({
                disabled: false,
            });
        }

    }


    handleKeyPress(e) {
        this.isDisabled();
        this.state.dialogOpen = true;
        if (!this.state.disabled) {
            var status = this.apply(e).status;
            if (status === 200) {
                this.setState({
                    dialog_text: "课程添加成功",
                });
            } else {
                this.setState({
                    dialog_text: "课程添加失败"
                });
            }
        }
        else {
            this.setState({
                dialog_text: "课程信息非法",
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

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleClick() {
        this.setState({open: !this.state.open});
    }

    render() {
        const {classes, theme} = this.props;
        const {anchor, open} = this.state;

        return (
            <div>
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <StaffBar click={this.handleClick.bind(this)} open={this.state.open}/>
                        <Card
                            className={classNames(classes.content, classes[`content-${anchor}`], {
                                [classes.contentShift]: open,
                                [classes[`contentShift-${anchor}`]]: open,
                            })}
                        >
                            <div className={classes.drawerHeader}/>
                            <Paper>
                                <TextField
                                    className={classes.TextField}
                                    label="课程号"
                                    onChange={this.handleChange('course_id')}
                                    margin="normal"
                                    error={this.state.id_error}
                                />
                                <TextField
                                    className={classes.TextField}
                                    label="课程名"
                                    onChange={this.handleChange('course_name')}
                                    margin="normal"
                                    error={this.state.name_error}
                                />
                                <TextField
                                    select='true'
                                    label="课程类型"
                                    margin="normal"
                                    className={classes.TextField}
                                    value={this.state.course_type}
                                    onChange={this.handleChange('course_type')}
                                >
                                    {ranges.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    className={classes.TextField}
                                    label="学分"
                                    onChange={this.handleChange('course_credit')}
                                    margin="normal"
                                    error={this.state.credit_error}
                                    underlineShow={false}
                                />
                                <TextField
                                    className={classes.TextField}
                                    label="容量"
                                    onChange={this.handleChange('course_cap')}
                                    margin="normal"
                                    error={this.state.cap_error}
                                />
                                <TextField
                                    className={classes.TextField}
                                    label="教室"
                                    onChange={this.handleChange('course_room')}
                                    margin="normal"
                                    error={this.state.room_error}
                                />
                                <TextField
                                    className={classes.TextField}
                                    label="考核方式"
                                    onChange={this.handleChange('course_assessment')}
                                    margin="normal"
                                />
                                <Divider/>
                            </Paper>
                            <Button
                                variant="raised"
                                color="primary"
                                className={classes.Button}
                                onClick={(e) => this.handleKeyPress(e)}
                            >
                                注册
                            </Button>
                        </Card>
                    </div>
                </div>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"提示"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.dialog_text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            关闭
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );

    }
}


CreateLesson.propType = {
    userName: PropTypes.string,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, {withTheme: true})(CreateLesson);


