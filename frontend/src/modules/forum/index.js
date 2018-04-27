import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testAction} from "./actions";
import Main from './main/index';
import {Route} from "react-router-dom"
import CollegesPage from "./colleges"

class Forum extends Component {
    render() {
        const {match, testVal, testAction} = this.props;
        return (
            <div>
                <h1>Forum</h1>
                <Route exact path={`${match.url}/`} component={Main}/>
                <Route path={`${match.url}/colleges`} component={CollegesPage}/>
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
    null,
    null
)(Forum);
