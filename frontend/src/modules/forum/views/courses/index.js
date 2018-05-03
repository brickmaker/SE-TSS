import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCourses} from "./actions"

class Courses extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collegeId: this.props.match.params.collegeid
        }
    }

    componentDidMount() {
        console.log('get courses')
        const cid = this.props.match.params.collegeid
        this.props.getCourses(cid)
    }

    render() {
        const {match} = this.props;
        console.log(match)
        return (
            <div>
                courses list: {match.params.collegeid}
                <div>
                    <ul>
                        {
                            this.props.courses.map((course) => (
                                <li>{course.id}-{course.name}-{course.teachers.map((t) => `${t}、`)}-{course.postsNum}-{course.lastUpdate}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    courses: state.forum.courses.courses
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCourses: (collegeId) => {
            dispatch(getCourses(collegeId));
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses);
