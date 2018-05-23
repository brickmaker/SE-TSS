/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as actionCreators from '../actions/auth';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Helmet} from "react-helmet";


function mapStateToProps(state) {
    return {
        isAuthenticating: state.auth.isAuthenticating,
        statusText: state.auth.statusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


const style = {
    marginTop: 80,
    paddingBottom: 50,
    paddingTop: 40,
    alignItems: 'center',
    width: '80%',
    textAlign: 'center',
    display: 'inline-block',

};

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginView extends React.Component {

    constructor(props) {
        super(props);
        const redirectRoute = '/login';
        this.state = {
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
        else{
            username_is_valid=true;
        }

        if (this.state.password === '' || !this.state.password) {
            this.setState({
                password_error_text: null,
            });
        }else{
            password_is_valid=true;
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

    login(e) {
        e.preventDefault();
        this.props.loginUser(this.state.username, this.state.password, this.state.user_type);

    }

    render() {
        return (
            <div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)} >
                <Helmet bodyAttributes={{style: 'background-color : #EEEEEE'}}/>
                <Paper style={style}>
                    <form role="form">
                        <div className="text-center">
                            <h2>Login</h2>
                            {
                                this.props.statusText &&
                                <div className="alert alert-info">
                                    {this.props.statusText}
                                </div>
                            }

                            <div className="col-md-12">
                                <TextField
                                    hintText="Username"
                                    floatingLabelText="Username"
                                    type="email"
                                    errorText={this.state.username_error_text}
                                    onChange={(e) => this.changeValue(e, 'username')}
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

                            <RadioButtonGroup name="status" defaultSelected="Student"
                                              type="user_type"
                                              onChange={(e) => this.changeValue(e, 'user_type')}>
                                <RadioButton style={{ display: 'inline-block', width: '100px', height: '20px'}} label="Admin" value="Admin"/>
                                <RadioButton style={{ display: 'inline-block', width: '100px', height: '20px'}} label="Staff" value="Staff" />
                                <RadioButton style={{ display: 'inline-block', width: '100px', height: '20px'}} label="Student" value="Student" />
                                <RadioButton style={{ display: 'inline-block', width: '100px',  height: '20px'}} label="Teacher" value="Teacher" />
                            </RadioButtonGroup>

                            <RaisedButton
                                disabled={this.state.disabled}
                                style={{ marginTop: 50 }}
                                label="Submit"
                                onClick={(e) => this.login(e)}
                            />

                        </div>
                    </form>
                </Paper>

            </div>
        );

    }
}

LoginView.propTypes = {
    loginUser: actionCreators.loginUser(),
    statusText: React.PropTypes.string,
};