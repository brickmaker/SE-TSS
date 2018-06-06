import React, {Component} from 'react';
import {connect} from "react-redux"
import {Route, Switch} from "react-router-dom"
import BZ from "./ButtonZoom"
import {Button,
    TableRow,
    List,
    ListItem,
    Paper,
    ListItemSecondaryAction,
    ListItemText,
    Grid
} from 'material-ui'
import {getCourseListStudent} from "./actions";
import HistoryGrade from "../HistoryGrade/index";
import ExamList from '../ExamList'
import Examination from "../Examination/index";



const menuStyle = {
    display: 'inline-block',
    width: "20%",
    height: "100%",
    float: "left",
    margin: "20px"
};

const windowStyle = {
    display: 'inline-block',
    width: "70%",
    height: "100%",
    float: "left",
    margin: "20px"
};

class StudentMain extends Component {

    componentWillMount(){
        this.props.getCourseListStudent(0,0);
    }

    render() {
        const {match, course_list} = this.props;
        // console.log('list', courseList);
        const courseListItems = course_list.map(
            (courseInfo, index)=>{
                return(
                    <ListItem key={ index} >
                        <ListItemText>
                            {courseInfo.course_name}
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <Grid xs={6}>
                        <BZ/>
                            </Grid>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            }
        );
        return (
            <div>
                <Paper style={menuStyle}>
                    <List>
                        {courseListItems}
                    </List>
                </Paper>
                <Paper style={windowStyle}>
                    <Route exact path={`${match.url}/exam_list/:course_id`} component={ExamList}/>
                    <Route path={`${match.url}/exam_list/:course_id/exam/:exam_id`} component={Examination}/>
                    <Route path={`${match.url}/history_grade/:course_id`} component={HistoryGrade}/>
                    {/*<Route path={`${match.url}/search/:searchType/:query/:pageNum`} component={Search}/>*/}

                </Paper>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    course_list: state.online_testing.student_main.course_list,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCourseListStudent: (studentId, token)=>{
            return dispatch(getCourseListStudent(studentId, token));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentMain);