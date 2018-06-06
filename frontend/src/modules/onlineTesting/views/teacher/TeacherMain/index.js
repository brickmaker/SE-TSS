import React, {Component} from 'react';
import {connect} from "react-redux"
import {Route, Switch} from "react-router-dom"

import Button from 'material-ui/Button';
import List from 'material-ui/List';
import ListItem from 'material-ui/List';


import Paper from 'material-ui/Paper'



import QuestionManage from '../QuestionManage'
import PaperManage from '../PaperManage'
import GradeStatistics from '../GradeStatistics'
import PaperGenerate from '../PaperGenerate'
import PaperView from '../PaperView'

import {getCourseList} from "./actions";

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

class TeacherMain extends Component {

    componentWillMount() {
        this.props.getCourseList(0, 0);
    }

    render() {
        const {match, course_list} = this.props;
        // console.log('list', courseList);
        const courseListItems = course_list.map(
            (courseInfo, index)=>{
                return (
                    <ListItem key={ index} >
                        <p>
                            {courseInfo.course_name}
                        </p>
                        <Button
                            onClick={() => {
                                const path = `${match.url}/question_manage/${courseInfo.course_id}`;
                                this.props.history.push(path);
                            }}
                        >
                            题库
                        </Button

                        >
                        <Button
                            onClick={() => {
                                const path = `${match.url}/paper_manage/${courseInfo.course_id}`;
                                this.props.history.push(path);
                            }}

                        > 试卷</Button>
                        <Button
                            onClick={() => {
                                const path = `${match.url}/grade_statistics/${courseInfo.course_id}`;
                                this.props.history.push(path);
                            }}

                        > 统计</Button>
                    </ListItem>
                )
            }

        )

        return (
            <div>
               <Paper style={menuStyle}>
                   <List>
                       {courseListItems}
                   </List>
               </Paper>
                <Paper style={windowStyle}>
                    <Route path={`${match.url}/question_manage/:course_id`} component={QuestionManage}/>
                    <Route exact path={`${match.url}/paper_manage/:course_id`} component={PaperManage}/>
                    <Route path={`${match.url}/paper_manage/:course_id/paper_generate/`} component={PaperGenerate}/>
                    <Route path={`${match.url}/paper_manage/:course_id/paper_view/:paper_id`} component={PaperView}/>
                    <Route path={`${match.url}/grade_statistics/:course_id`} component={GradeStatistics}/>

                    {/*<Route path={`${match.url}/search/:searchType/:query/:pageNum`} component={Search}/>*/}

                </Paper>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    course_list: state.online_testing.teacher_main.course_list,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCourseList: (teacherID, token)=>{
             return dispatch(getCourseList(teacherID, token));
         },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TeacherMain);
