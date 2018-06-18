import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from "react-router-dom"
import StudentMain from './views/student/StudentMain'
import TeacherMain from './views/teacher/TeacherMain'

import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from 'material-ui/Icon';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = {
    backgroundColor: '#f0f0ee',
    minHeight: '100vh',
    paddingLeft: 20,
    paddingRight: 20
};


let Identity = "teacher";




class OnlineTesting extends Component {
    render() {
        const {match} = this.props;
        const routePath= Identity === "teacher" ? (
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
