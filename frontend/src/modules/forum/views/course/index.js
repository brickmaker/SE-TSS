import React, {Component} from 'react'
import {connect} from "react-redux"
import {getCourseInfo} from "./actions"

class Course extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {collegeid, courseid} = this.props.match.params
        this.props.getCourseInfo(collegeid, courseid)
    }

    render() {
        const {college, course, subForums} = this.props
        return (
            <div>
                <div>{college} - {course}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    college: state.forum.course.college,
    course: state.forum.course.course,
    subForums: state.forum.course.subForums,
    subscribed: false,
    posts: []
})

const mapDispatchToProps = (dispatch) => ({
    getCourseInfo: (collegeId, courseId) => {
        dispatch(getCourseInfo(collegeId, courseId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)