import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router-dom"
import StudentMain from './views/student/StudentMain'
import TeacherMain from './views/teacher/TeacherMain'
import {Button} from 'material-ui'

const styles = {
    backgroundColor: '#f0f0ee',
    minHeight: '100vh',
    paddingLeft: 20,
    paddingRight: 20
};




class OnlineTesting extends Component {

    state={
    };


    render() {
        const {match} = this.props;
        console.log(localStorage.getItem('type'));
        const routePath= (localStorage.getItem('type') === "2") ? (
            <Route path={`${match.url}`} component={TeacherMain}/>
        ):(
            <Route path={`${match.url}`} component={StudentMain}/>
        );

        return (
            <div style={styles}>
                {routePath}
           </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    null,
    null
)(OnlineTesting);
