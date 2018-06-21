import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/auth';


function mapStateToProps(state) {
    return {
        token: state.info.auth.token,
        userName: state.info.auth.userName,
        isAuthenticated: state.info.auth.isAuthenticated,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


class NotFound extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div className="col-md-8">
                <h1>Not Found</h1>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NotFound);

