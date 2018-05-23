/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import * as actionCreators from '../actions/auth';

import { validateEmail } from '../utils/misc';

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};

@connect(mapStateToProps, mapDispatchToProps)
export default class RegisterView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
            username: '',
            email:'',
            password: '',
            email_error_text: null,
            username_error_text:null,
            password_error_text: null,
            redirectTo: redirectRoute,
            disabled: true,
        };
    }

    isDisabled() {
        let username_is_valid = false;
        let password_is_valid = false;
        let email_is_valid = false;

        if (this.state.username === '') {
            this.setState({
                username_error_text: 'Please input username',
            });
        } 
        else if (this.state.username.length<50) {
            username_is_valid = true;
            this.setState({
                username_error_text: null,
            });

        } else {
            this.setState({
                username_error_text: 'Sorry, the username is too long',
            });
        }

        if (validateEmail(this.state.email)) {
            email_is_valid = true;
            this.setState({
                email_error_text: null,

            });

        } else if(this.state.email === ''){
            this.setState({
                email_error_text: 'Please input email',
            });
        }
        else {
            this.setState({
                email_error_text: 'Sorry, this is not a valid email',
            });
        }


        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: 'Please input password',
            });
        } else if (this.state.password.length >= 6) {
            password_is_valid = true;
            this.setState({
                password_error_text: null,
            });
        } else {
            this.setState({
                password_error_text: 'Your password must be at least 6 characters',
            });

        }

        if (username_is_valid && password_is_valid &&email_is_valid) {
            this.setState({
                disabled: false,
            });
        }

    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state);
    }
    handleKeyPress(e){
        this.isDisabled();
        if (!this.state.disabled) {
            this.register(e);
        }
    }
    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.isDisabled();
            if (!this.state.disabled) {
                this.register(e);
            }
        }
    }

    register(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
                <Paper style={style}>
                    <div className="text-center">
                        <h2>Register New Account</h2>
                        {
                            this.props.registerStatusText &&
                                <div className="alert alert-info">
                                    {this.props.registerStatusText}
                                </div>
                        }

                        <div className="col-md-12">
                            <TextField
                              hintText="Username"
                              floatingLabelText="Username"
                              type="username"
                              errorText={this.state.username_error_text}
                              onChange={(e) => this.changeValue(e, 'username')}
                            />
                        </div>
                        <div className="col-md-12">
                            <TextField
                              hintText="Email"
                              floatingLabelText="Email"
                              type="email"
                              errorText={this.state.email_error_text}
                              onChange={(e) => this.changeValue(e, 'email')}
                            />
                        </div>
                        <div className="col-md-12">
                            <TextField
                              hintText="Password"
                              floatingLabelText="Password"
                              type="password"
                              errorText={this.state.password_error_text}
                              onChange={(e) => this.changeValue(e, 'password')}
                            />
                        </div>
                        <div className="col-md-12">
                            <TextField
                                hintText="Password"
                                floatingLabelText="Re-enter Password"
                                type="password"

                            />
                        </div>
                        <RaisedButton

                          style={{ marginTop: 50 }}
                          label="Submit"
                          onClick={(e) => this.handleKeyPress(e)}
                        />

                    </div>
                </Paper>

            </div>
        );

    }
}

RegisterView.propTypes = {
};
