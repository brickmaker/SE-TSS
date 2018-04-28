import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testAction} from "./actions";
import Main from './main/index';
import {Route, Switch} from "react-router-dom"
import CollegesPage from "./colleges"
import Courses from "./courses"
import Course from './course/index'

class Forum extends Component {
    render() {
        const {match, testVal, testAction} = this.props;
        return (
            <div>
                <h1>Forum</h1>
                <Switch>
                    <Route exact path={`${match.url}`} component={Main}/>
                    <Route path={`${match.url}/colleges/:collegeid/:courseid`} component={Course}/>
                    <Route path={`${match.url}/colleges/:collegeid`} component={Courses}/>
                    <Route path={`${match.url}/colleges`} component={CollegesPage}/>
                </Switch>
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
