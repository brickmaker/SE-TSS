import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/auth';
import AvatarEditor from 'react-avatar-editor'

import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    TextField
} from '@material-ui/core';

import Bar from "../../../../top/components/Bar";
import {listItems, otherItems} from "./StudentData";
import {BACKEND_API, BACKEND_SERVER_URL} from "../../config";
import DefaultImage from '../image/user.jpg';

import {message, Upload} from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('必须上传JPG文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小不能超过2MB');
    }
    return isJPG && isLt2M;
}


function mapStateToProps(state) {
    return {
        username: state.info.auth.username,
        data: state.info.auth.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = theme => ({
    base: {
        width: '100%',
    },
    Card: {
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    TextField: {
        marginLeft: '40%',
        width: '20%',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    Button: {
        marginTop: 10,
        margin: 20,
    },
    img: {
        margin: '0 auto',
        textAlign: 'center',
    }
});


class StaffBasicInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            id_number: '',
            email: '',
            name: '',
            gender: '',
            department: '',
            grade: '',
            major: '',
            class_name: '',
            imageUrl: null,
            dialogState: false,
            dialogText: "",
            pwdDialog: false,
            emailDialog: false,
            new_email: '',
            old_pwd: '',
            new_pwd: '',
            new_pwd_1: '',
            pwd_txt1: '',
            pwd_txt: '',
        };
    }

    handleImageChange = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
            }));
        }
    };

    handleInitData = () => {
        let status;
        let url = BACKEND_SERVER_URL + BACKEND_API.get_student_info + localStorage.getItem('username') + '/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                status = response.status;
                return response.json();
            })
            .then((data) => {
                const username = data.username;
                const id_number = data.id_number;
                const email = data.email;
                const name = data.name;
                const gender = data.gender;
                const department = data.department;
                const img = data.img;
                const grade = data.grade;
                const major = data.major;
                const class_name = data.class_name;
                this.setState({
                    username: username,
                    id_number: id_number,
                    email: email,
                    name: name,
                    gender: gender,
                    department: department,
                    grade: grade,
                    major: major,
                    class_name: class_name,
                });
                fetch(img, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'JWT ' + localStorage.getItem('token'),
                    },
                })
                    .then(response => {
                        this.setState({imageUrl: DefaultImage});
                        return response.blob();
                    })
                    .then((data) => {
                        getBase64(data, imageUrl => this.setState({
                            imageUrl,
                        }));
                    })
                    .catch(() => {
                    });
            })
            .catch(() => {
            });
    };

    componentDidMount() {
        this.handleInitData();
    }


    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            // this.isDisabled();
        });
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };


    handlePwdDialogOpen = () => {
        this.setState({
            pwdDialog: true,
            old_pwd: '',
            New_pwd: '',
            new_pwd_1: '',
            pwd_txt1: '',
            pwd_txt: '',
        });
    };

    handleEmailDialogOpen = () => {
        this.setState({
            emailDialog: true,
        });
    };

    handlePwdDialogClose = () => {
        this.setState({pwdDialog: false});
    };

    handleEmailDialogClose = () => {
        this.setState({emailDialog: false});
    };

    handlePwdCommit = () => {
        if (this.state.New_pwd !== this.state.new_pwd_1) {
            this.setState({
                dialogState: true,
                dialogText: "新密码不一致",
            });
        }
        else {
            this.setState({pwdDialog: false});
            let data = {};
            data.old_password = this.state.old_pwd;
            data.new_password = this.state.New_pwd;
            let url = BACKEND_SERVER_URL + BACKEND_API.update_password;
            fetch(url, {
                method: 'put',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('token'),
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    let status = response.status;
                    if (status === 200) {
                        this.setState({
                            dialogState: true,
                            dialogText: "密码修改成功",
                        });
                    } else {
                        this.setState({
                            dialogState: true,
                            dialogText: response.statusText,
                        });
                    }
                    return response.json;
                })
                .catch(() => {
                    this.setState({
                        dialogState: true,
                        dialogText: "服务器无响应",
                    });
                });
        }
    };

    handleEmailCommit = () => {
        let url = BACKEND_SERVER_URL + BACKEND_API.get_student_info + localStorage.getItem('username') + '/';
        let data = {};
        data.username = this.state.username;
        data.id_number = this.state.id_number;
        data.email = this.state.new_email;
        data.name = this.state.name;
        data.gender = this.state.gender;
        data.department = this.state.department;
        data.grade = this.state.grade;
        data.major = this.state.major;
        data.class_name = this.state.class_name;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                this.setState({
                    dialogState: true,
                    dialogText: '修改成功'
                });
                this.handleInitData();
                return response.json();
            })
            .catch(() => {
            });
        this.handleEmailDialogClose();

    };


    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleChangePwd = prop => event => {

        this.setState({[prop]: event.target.value});
        let p = /[0-9a-z]/i;
        let ifTrue = p.test(event.target.value);
        if (event.target.value.length < 8 || !ifTrue) {
            this.setState({pwd_txt1: "密码至少8位，且包括数字和字母"});
        }
        else {
            this.setState({pwd_txt1: ""});
        }

    };

    handleChangePwd_1 = prop => event => {
        this.setState({[prop]: event.target.value});
        if (this.state.New_pwd === event.target.value) {
            this.setState({pwd_error: false, pwd_txt: ""});
        }
        else {
            this.setState({pwd_error: true, pwd_txt: "密码不一致"});
        }
    };

    handleDialogClose = () => {
        this.setState({dialogState: false});
    };


    render() {
        const {classes, theme, history} = this.props;
        return (
            <Bar
                listItems={listItems}
                otherItems={otherItems}
                history={history}
                children={
                    <div>
                        <Paper className={classes.base}>
                            <Card className={classes.Card}>
                                <CardContent style={{overflow: 'auto'}}>
                                    <h3>个人信息</h3>
                                    <div className={classes.img}>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            showUploadList={false}
                                            action={BACKEND_SERVER_URL + BACKEND_API.upload_image}
                                            beforeUpload={beforeUpload}
                                            onChange={this.handleImageChange}
                                            headers={{
                                                'Authorization': 'JWT ' + localStorage.getItem('token'),
                                            }}
                                            name={'img'}
                                        >
                                            <AvatarEditor
                                                image={this.state.imageUrl}
                                                width={128}
                                                height={128}
                                                border={0}
                                                color={[255, 255, 255, 0.6]} // RGBA
                                                scale={1}
                                                rotate={0}
                                            />
                                        </Upload>
                                    </div>


                                    <div>
                                        <TextField
                                            disabled={true}
                                            className={classes.TextField}
                                            label="用户名"
                                            value={this.state.username}
                                            floatingLabelText="用户"
                                            margin="normal"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            disabled={true}
                                            className={classes.TextField}
                                            label="身份证号"
                                            value={this.state.id_number}
                                            floatingLabelText="ID号"
                                            margin="normal"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            disabled={true}
                                            className={classes.TextField}
                                            label="姓名"
                                            value={this.state.name}
                                            floatingLabelText="姓名"
                                            margin="normal"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            disabled={true}
                                            className={classes.TextField}
                                            label="性别"
                                            value={this.state.gender}
                                            floatingLabelText="性别"
                                            margin="normal"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            disabled={true}
                                            className={classes.TextField}
                                            label="学院"
                                            value={this.state.department}
                                            floatingLabelText="学院"
                                            margin="normal"
                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            disabled={true}
                                            className={classes.TextField}
                                            label="邮箱"
                                            value={this.state.email}
                                            floatingLabelText="邮箱"
                                            margin="normal"
                                            onChange={(e) => this.changeValue(e, 'email')}
                                        />
                                    </div>
                                    <div className={classes.img}>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            className={classes.Button}
                                            onClick={this.handleEmailDialogOpen}
                                        >
                                            修改邮箱
                                        </Button>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            className={classes.Button}
                                            onClick={this.handlePwdDialogOpen}
                                        >
                                            修改密码
                                        </Button>
                                    </div>


                                </CardContent>
                            </Card>
                        </Paper>
                        <div>
                            <Dialog
                                open={this.state.emailDialog}
                                onClose={this.handleEmailDialogClose}
                            >
                                <DialogTitle>修改邮箱</DialogTitle>
                                <DialogContent>
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="新邮箱"
                                            type="email"
                                            onChange={this.handleChange('new_email')}
                                        />
                                    </div>
                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={this.handleEmailCommit} color="primary">
                                        确定
                                    </Button>
                                    <Button onClick={this.handleEmailDialogClose} color="primary">
                                        关闭
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div>
                            <Dialog
                                open={this.state.pwdDialog}
                                onClose={this.handlePwdDialogClose}
                            >
                                <DialogTitle>修改密码</DialogTitle>
                                <DialogContent>
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="旧密码"
                                            type="password"
                                            value={this.state.old_pwd}
                                            onChange={this.handleChange('old_pwd')}

                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="新密码"
                                            type="password"
                                            value={this.state.New_pwd}
                                            onChange={this.handleChangePwd('New_pwd')}
                                            helperText={this.state.pwd_txt1}

                                        />
                                    </div>
                                    <div>
                                        <TextField
                                            fullWidth
                                            label="再次输入新密码"
                                            type="password"
                                            value={this.state.new_pwd_1}
                                            onChange={this.handleChangePwd_1('new_pwd_1')}
                                            error={this.state.pwd_error}
                                            helperText={this.state.pwd_txt}
                                        >

                                        </TextField>
                                    </div>

                                </DialogContent>

                                <DialogActions>
                                    <Button onClick={this.handlePwdCommit} color="primary">
                                        确定
                                    </Button>
                                    <Button onClick={this.handlePwdDialogClose} color="primary">
                                        关闭
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div>
                            <Dialog
                                open={this.state.dialogState}
                                onClose={this.handleDialogClose}
                            >
                                <DialogTitle>{"提示"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {this.state.dialogText}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleDialogClose} color="primary">
                                        关闭
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>


                }
            />


        );
    }
}

StaffBasicInfo.propType = {
    username: PropTypes.string,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(StaffBasicInfo));



