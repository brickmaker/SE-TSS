import React, {Component} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import TGS from "./StudentGradeStatistic"
import {getStudentGrade} from "./actions";
class GradeStatistics extends Component{

    last_course_id="";

    componentDidUpdate(prevProps, prevState) {
        const {course_id} = this.props.match.params;
        if(course_id != this.last_course_id){
            this.last_course_id = course_id;
            this.update();
        }
    }

    update=()=>{
        const{token} = this.props;
        const {course_id} = this.props.match.params;

        this.props.getStudentGrade(course_id, token);
    };

    componentDidMount(){
        console.log("success");
        this.update();
    }
    render(){
        return (
            <div><TGS studentGrade={this.props.studentGrade}/></div>
        )
    }
}

const mapStateToProps = (state) => ({
    token:state.online_testing.student_main.token,
    studentGrade:state.online_testing.student_history_grade_statistic.studentGrade,
});

const mapDispatchToProps = (dispatch) => {
    return{
        getStudentGrade:(course_id, token)=>{
            return dispatch(getStudentGrade(course_id, token));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(GradeStatistics);