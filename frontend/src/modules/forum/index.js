import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testAction} from "./actions";
import Main from './views/main/index';
import {Route, Switch} from "react-router-dom"
import CollegesPage from "./views/colleges"
import Courses from "./views/courses"
import Course from './views/course'
import Teacher from './views/teacher'

class Forum extends Component {
    render() {
        const {match} = this.props;
        return (
            <div>
                <h1>Forum</h1>
                <Switch>
                    <Route exact path={`${match.url}`} component={Main}/>
                    <Route path={`${match.url}/:collegeid/:courseid/:teacherid`} component={Teacher}/>
                    <Route path={`${match.url}/:collegeid/:courseid`} component={Course}/>
                    <Route path={`${match.url}/colleges`} component={CollegesPage}/>
                    <Route path={`${match.url}/:collegeid`} component={Courses}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
    null,
    null
)(Forum);
