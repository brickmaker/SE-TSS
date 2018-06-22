import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';
import {Helmet} from "react-helmet";
import {
    Button,
    TextField,
    Paper,
    Typography,
    Card,
    CardContent,
    FormControl,
    Input,
    NativeSelect,
} from '@material-ui/core';

import Image from "./image/login_zju.jpg";
import {BACKEND_API, BACKEND_SERVER_URL} from "../config";

function mapStateToProps(state) {
    return {
        isAuthenticated: state.info.auth.isAuthenticated,
        statusText: state.info.auth.statusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = theme => ({
    Foreground:{
        height: '100%',
        width: '100%',
        position: 'absolute',
        overflow: true,
        'z-index': 2,
    },
    Background:{
        height: '100%',
        width: '100%',
        position: 'absolute',
        overflow: true,
        'z-index': 1,
    },
    Paper: {
        opacity: 0.8,
        marginTop: '10%',
        marginLeft: '25%',
        paddingBottom: 50,
        paddingTop: 50,
        alignItems: 'center',
        width: '50%',
        textAlign: 'center',
        display: 'inline-block',
    },
    TextField: {
        width: 200,
    },
    NativeSelect: {
        width: 200,
        marginTop: 30,
    },
    Button: {
        marginTop: 30,
    },
    card: {
        opacity: 1.0,
        'background-color': '#3f51b5',
    },
    title: {
        opacity: 1.0,
        fontSize: 15,
    },
});


class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            user_type: 'Student',
            disabled: true,
            status: false,
        };
    }

    isDisabled() {
        if (this.state.username !== '' && this.state.password !== '') {
            this.setState({
                disabled: false,
            });
        }
    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            this.isDisabled();
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    login = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password, this.state.user_type);
    };
    componentDidMount(){

        let url = BACKEND_SERVER_URL + "api/info/is_token_valid" ;
        fetch(url, {
            method: 'post',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"token":localStorage.getItem('token')})
        })
            .then(response => {
                this.setState({status: response.status == '200'});
                // return response.json();
                if (response.status == '200') {
                    this.props.history.push('/main');
                }
            })
    }

    render() {
        const {classes, isAuthenticated} = this.props;
        if(isAuthenticated || this.state.status)
            this.props.history.push('/main');
        return (
            <div>
                <div className={classes.Background}>
                    <img src={Image} width="100%" height="100%"/>
                </div>
            <div className={classes.Foreground}>
                {/*<Helmet bodyAttributes={{style: 'background-color : #EEEEEE'}}/>*/}
                <Paper className={classes.Paper}>
                    <form role="form">
                        <div className="text-center">
                            <h2>用户登录</h2>
                            {
                                this.props.statusText &&
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary">
                                            {this.props.statusText}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            }
                            <div>
                                <TextField
                                    className={classes.TextField}
                                    label="账户"
                                    floatingLabelText="账户"
                                    onChange={(e) => this.changeValue(e, 'username')}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.TextField}
                                    label="密码"
                                    floatingLabelText="密码"
                                    type="password"
                                    onChange={(e) => this.changeValue(e, 'password')}
                                    margin="normal"
                                />

                            </div>
                            <div>
                                <FormControl className={classes.NativeSelect}>
                                    <NativeSelect
                                        value={this.state.user_type}
                                        onChange={this.handleChange('user_type')}
                                        input={<Input id="age-native-helper"/>}
                                    >
                                        <option value={"Admin"}>系统</option>
                                        <option value={"Staff"}>教务</option>
                                        <option value={"Student"}>学生</option>
                                        <option value={"Teacher"}>教师</option>
                                    </NativeSelect>
                                </FormControl>
                            </div>
                            <Button
                                variant="raised"
                                color="primary"
                                className={classes.Button}
                                disabled={this.state.disabled}
                                onClick={(e) => this.login(e)}
                            >
                                登录
                            </Button>
                        </div>
                    </form>
                </Paper>
            </div>
            </div>
        );

    }
}

LoginView.propTypes = {
    classes: PropTypes.object.isRequired,
    login: actionCreators.login(),
    statusText: PropTypes.string,
};


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(LoginView));