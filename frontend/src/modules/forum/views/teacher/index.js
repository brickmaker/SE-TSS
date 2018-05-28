import React, {Component} from 'react'
import {connect} from "react-redux"
import {getTeacherInfo} from "./actions"
import {Path} from "../../components/util/Path"
import {MainBody} from "../../components/util/MainBody"
import {SectionText, SectionTitle} from "../../components/util/SectionTitle"
import {Announcement} from "@material-ui/icons"
import {Button} from "material-ui"
import PostsList from "./components/PostsList"
import TopAnnouncement from "./components/TopAnnouncement"
import PostEditor from "./components/PostEditor"
import {goBottom} from "../../utils/pageHandler"
import Announcements from '../announcements';

class Teacher extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {collegeid, courseid, teacherid} = this.props.match.params
        this.props.getTeacherInfo(collegeid, courseid, teacherid)
    }

    render() {
        const {college, course, teacher, match} = this.props
        const {collegeid, courseid, teacherid} = this.props.match.params
        const path = {
            college: {
                name: college,
                link: `/forum/${collegeid}`
            },
            course: {
                name: course,
                link: `/forum/${collegeid}/${courseid}`
            },
            teacher: {
                name: teacher,
                link: `/forum/${collegeid}/${courseid}/${teacherid}`
            },
        }
        return (
            <div>
                <MainBody>
                    <Path path={path}/>
                    <SectionTitle>
                        <SectionText text={'公告通知'}>
                            <Announcement color={'primary'} style={{fontSize: 40}}/>
                        </SectionText>
                        <div>
                            <Button
                                color={'secondary'}
                                variant={'raised'}
                                onClick={()=>{
                                    this.props.history.push(`/forum/announcements/section/${collegeid}/${courseid}/${teacherid}/1`)
                                }}
                            >全部</Button>
                            <span style={{width: 10}}> </span>
                            <Button
                                color={'primary'}
                                variant={'raised'}
                                onClick={()=>{
                                    this.props.history.push(`/forum/annceditor/${collegeid}/${courseid}/${teacherid}`)
                                }}
                            >发布公告</Button>
                        </div>
                    </SectionTitle>
                    {/* <TopAnnouncement/> */}
                    <Announcements type="section" match = {match}/>
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