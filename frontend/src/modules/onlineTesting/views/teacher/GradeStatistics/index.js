import React, {Component} from "react"
import {connect} from "react-redux"
import TGS from "./grade_statistic/TeacherGradeStatistic";
import {CHANGE_TOKEN, GET_COURSE_LIST_TEACHER, getQuestionTypeList, getStudentList,getTagList} from "./actions"
import {getTestList} from "./actions";

import _SERVER_ADDRESS from '../../../configs/config'


class GradeStatistics extends Component{
    componentDidMount(){
        let headers = new Headers();
        fetch(`http://${_SERVER_ADDRESS}:8000/api/info/get_token`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': '3150100000',
                'password': '000000'
            }),
            credentials: "include"
        }).then(response => response.json())
            .then(response => {
                console.log("getToken");
                console.log(response["token"]);
                this.props.onChangeToken(response['token']);
                this.props.getTestList(this.props.match.params,response['token']);
                const teacherID = "2010100000";
                this.props.getStudentList(teacherID,response['token']);
                this.props.getTagList(this.props.match.params,response['token']);
                this.props.getQuestionTypeLIst(teacherID,this.props.match.params, response['token']);
            });
    }
    render(){
        const {match} = this.props;
        return (
            <div><TGS testList={this.props.testList} studentList={this.props.studentList} tagList={this.props.tagList} questionTypeList={this.props.questionTypeList}/></div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.online_testing.teacher_history_grade_statistic.token,
    testList:state.online_testing.teacher_history_grade_statistic.testList,
    studentList:state.online_testing.teacher_history_grade_statistic.studentList,
    tagList:state.online_testing.teacher_history_grade_statistic.tagList,
    questionTypeList:state.online_testing.teacher_history_grade_statistic.questionTypeList,
});

const mapDispatchToProps = (dispatch) => {
    return {
       getTestList:(courseID,token) =>{
           return dispatch(getTestList(courseID,token));
       },
        onChangeToken: (token) => {
            dispatch({ type: CHANGE_TOKEN, token: token })
        },
        getStudentList:(teacherID,token)=>{
          return dispatch(getStudentList(teacherID,token))
        },
        getTagList:(courseID,token) =>{
           return dispatch(getTagList(courseID,token))
        },
        getQuestionTypeLIst:(teacherID,courseID,token)=>{
          return dispatch(getQuestionTypeList(teacherID,courseID,token))
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(GradeStatistics);
