import React, {Component} from 'react'
import {connect} from "react-redux"
import {getCourseInfo} from "./actions"
import {MainBody} from "../../components/util/MainBody"
import {Path} from "../../components/util/Path"
import {SectionText, SectionTitle} from "../../components/util/SectionTitle"
import {Extension, Announcement} from "@material-ui/icons"
import {Button} from "material-ui"
import {goBottom} from "../../utils/pageHandler"
import PostsList from "./components/PostsList"
import PostEditor from "../teacher/components/PostEditor"

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
        const {collegeid, courseid} = this.props.match.params
        const path = {
            college: {
                name: college,
                link: `/forum/${collegeid}`
            },
            course: {
                name: course,
                link: `/forum/${collegeid}/${courseid}`
            }
        }

        return (
            <div>
                <MainBody>
                    <Path path={path}/>
                    <SectionTitle>
                        <SectionText text={'教师版块'}>
                            <Extension color={'primary'} style={{fontSize: 40}}/>
                        </SectionText>
                        <div>
                        </div>
                    </SectionTitle>
                    <div style={{marginTop: 40}}>
                        <SectionTitle>
                            <SectionText text={'所有帖子'}>
                                <Announcement color={'primary'} style={{fontSize: 40}}/>
                            </SectionText>
                            <div>
                                <Button
                                    color={'secondary'}
                                    variant={'raised'}
                                >订阅</Button>
                                <span style={{width: 10}}> </span>
                                <Button
                                    color={'primary'}
                                    variant={'raised'}
                                    onClick={goBottom}
                                >发布新帖</Button>
                            </div>
                        </SectionTitle>
                        <PostsList/>
                    </div>
                    <PostEditor/>
                </MainBody>
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