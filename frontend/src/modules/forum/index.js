import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testAction} from "./actions";
import Main from './views/main/index';
import {Route, Switch} from "react-router-dom"
import CollegesPage from "./views/colleges"
import Courses from "./views/courses"
import Course from './views/course/index'

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
