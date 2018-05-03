import React, {Component} from 'react'
import {connect} from "react-redux"
import {getTeacherInfo} from "./actions"

class Teacher extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {collegeid, courseid, teacherid} = this.props.match.params
        this.props.getTeacherInfo(collegeid, courseid, teacherid)
    }

    render() {
        const {college, course, teacher} = this.props
        return (
            <div>
                <div>{college} - {course} - {teacher}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    college: state.forum.teacher.college,
    course: state.forum.teacher.course,
    teacher: state.forum.teacher.teacher,
    announcements: state.forum.teacher.announcements,
    posts: state.forum.teacher.posts,
})

const mapDispatchToProps = (dispatch) => ({
    getTeacherInfo: (collegeId, courseId, teacherId) => {
        dispatch(getTeacherInfo(collegeId, courseId, teacherId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)