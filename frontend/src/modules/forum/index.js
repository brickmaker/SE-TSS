import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testAction} from "./actions";
import Main from './main/index';

class Forum extends Component {
    render() {
        const {testVal, testAction} = this.props;
        return (
            <div>
                <h1>Forum</h1>
                <Main/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    testVal: state.forum.testVal
});

const mapDispatchToProps = (dispatch) => ({
    testAction: (value) => {
        dispatch(testAction(value))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Forum);
