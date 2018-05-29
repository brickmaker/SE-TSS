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
    Input,
    FormControl,
    NativeSelect,
    Paper,
} from '@material-ui/core';

function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = theme => ({
    Paper: {
        marginTop: '10%',
        paddingBottom: 50,
        paddingTop: 50,
        alignItems: 'center',
        width: '100%',
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
    }
});

@connect(mapStateToProps, mapDispatchToProps)
class LoginView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
            dialog_text: '',
            open: false,
            username: '',
            password: '',
            user_type: 'Student',
            username_error_text: null,
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };
    }

    isDisabled() {
        let username_is_valid = false;
        let password_is_valid = false;

        if (this.state.username === '') {
            this.setState({
                username_error_text: null,
            });
        }
        else {
            username_is_valid = true;
        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        } else {
            password_is_valid = true;
        }

        if (username_is_valid && password_is_valid) {
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

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                this.login(e);
            }
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    login(e) {
        e.preventDefault();
        this.props.loginUser(this.state.username, this.state.password, this.state.user_type);
    }


    render() {
        const {classes} = this.props;
        return (
            <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                <Helmet bodyAttributes={{style: 'background-color : #EEEEEE'}}/>
                <Paper className={classes.Paper}>
                    <form role="form">
                        <div className="text-center">
                            <h2>用户登录</h2>
                            {
                                this.props.statusText &&
                                <div className="alert alert-info">
                                    {this.props.statusText}
                                </div>
                            }
                            <div>
                                <TextField
                                    className={classes.TextField}
                                    label="账户"
                                    floatingLabelText="账户"
                                    type="email"
                                    onChange={(e) => this.changeValue(e, 'username')}
                                    margin="normal"
                                    errorText={this.state.username_error_text}
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
                                    errorText={this.state.password_error_text}
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
        );

    }
}

LoginView.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: actionCreators.loginUser(),
    statusText: PropTypes.string,
};

export default withStyles(styles, {withTheme: true})(LoginView);