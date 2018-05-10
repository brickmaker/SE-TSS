import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCoursesInfo} from "./actions"
import {MainBody} from "../../components/util/MainBody"
import {Path} from "../../components/util/Path"
import {SectionText, SectionTitle} from "../../components/util/SectionTitle"
import {Extension} from "@material-ui/icons/es/index"

class Courses extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        console.log('get courses')
        const cid = this.props.match.params.collegeid
        this.props.getCoursesInfo(cid)
    }

    render() {
        const {collegeid} = this.props.match.params
        const {college} = this.props
        const path = {
            college: {
                name: college,
                link: `/forum/${collegeid}`
            }
        }
        return (
            <div>
                <MainBody>
                    <div>
                        <Path path={path}/>
                        <SectionTitle>
                            <SectionText text={'全部课程'}>
                                <Extension color={'primary'} style={{fontSize: 40}}/>
                            </SectionText>
                            <div>
                            </div>
                        </SectionTitle>
                    </div>
                </MainBody>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    college: state.forum.courses.college,
    courses: state.forum.courses.courses
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCoursesInfo: (collegeId) => {
            dispatch(getCoursesInfo(collegeId));
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses);
