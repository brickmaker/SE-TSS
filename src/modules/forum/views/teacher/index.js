import React, {Component} from 'react'
import {connect} from "react-redux"
import {checkSubscribed, CLOSE_DIALOG, getCourseInfo, newPost, subscribe, unsubscribe} from "./actions"
import {getTeacherInfo} from "./actions"
import {Path} from "../../components/util/Path"
import {MainBody} from "../../components/util/MainBody"
import {SectionText, SectionTitle} from "../../components/util/SectionTitle"
import {Announcement} from "@material-ui/icons"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "material-ui"
import PostsList from "./components/PostsList"
import TopAnnouncement from "./components/TopAnnouncement"
import PostEditor from "./components/PostEditor"
import {goBottom} from "../../utils/pageHandler"
import Announcements from '../announcements';

class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true // todo: get login!!!
        }
        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.goToPost = this.goToPost.bind(this)
        this.post = this.post.bind(this)
        this.onDialogClose = this.onDialogClose.bind(this)
    }

    componentDidMount() {
        const {collegeid, courseid, teacherid} = this.props.match.params
        this.props.getTeacherInfo(collegeid, courseid, teacherid)
    }

    subscribe() {
        if (!this.state.isLogin) {
            // todo: redirect to login
        }
        else {
            const {collegeid, courseid, teacherid} = this.props.match.params
            this.props.subscribe("uid", collegeid, courseid, teacherid) // todo: get uid
        }
    }

    unsubscribe() {
        if (!this.state.isLogin) {
            // todo: redirect to login
        }
        else {
            const {collegeid, courseid, teacherid} = this.props.match.params
            this.props.unsubscribe("uid", collegeid, courseid, teacherid)
        }
    }

    goToPost() {
        if (this.state.isLogin) {
            // goBottom()
            const editor = document.getElementById('forum-editor')
            editor.scrollIntoView()
        }
        else {
            // todo: redirect to login
        }
    }

    post(title, content, fileId) {
        const {collegeid, courseid, teacherid} = this.props.match.params
        this.props.newPost("uid", collegeid, courseid, teacherid, title, content, fileId) // todo: get uid
    }

    onDialogClose() {
        this.props.closeDialog()
    }

    render() {
        const {college, course, teacher, match, subscribed, anncPermission} = this.props
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
                                onClick={() => {
                                    this.props.history.push(`/forum/announcements/section/${collegeid}/${courseid}/${teacherid}/1`)
                                }}
                            >全部</Button>
                            <span style={{width: 10}}> </span>
                            {
                                anncPermission ?
                                    <Button
                                        color={'primary'}
                                        variant={'raised'}
                                        onClick={() => {
                                            this.props.history.push(`/forum/annceditor/${collegeid}/${courseid}/${teacherid}`)
                                        }}>
                                        发布公告</Button>
                                    : null
                            }
                        </div>
                    </SectionTitle>
                    {/* <TopAnnouncement/> */}
                    <Announcements type="section" match={match}/>
                    <div style={{marginTop: 40}}>
                        <SectionTitle>
                            <SectionText text={'所有帖子'}>
                                <Announcement color={'primary'} style={{fontSize: 40}}/>
                            </SectionText>
                            <div>
                                {
                                    subscribed ?
                                        <Button
                                            color={'secondary'}
                                            variant={'raised'}
                                            onClick={this.unsubscribe}
                                        >取消订阅</Button>
                                        :
                                        <Button
                                            color={'secondary'}
                                            variant={'raised'}
                                            onClick={this.subscribe}
                                        >订阅</Button>
                                }
                                <span style={{width: 10}}> </span>
                                <Button
                                    color={'primary'}
                                    variant={'raised'}
                                    onClick={this.goToPost}
                                >发布新帖</Button>
                            </div>
                        </SectionTitle>
                        <PostsList/>
                    </div>
                    <PostEditor
                        post={this.post}
                    />
                </MainBody>
                <Dialog
                    open={this.props.dialog.open}
                    onClose={this.onDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title">{this.props.dialog.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.dialog.content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onDialogClose} color="primary" autoFocus>
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    dialog: state.forum.teacher.dialog,
    college: state.forum.teacher.college,
    course: state.forum.teacher.course,
    teacher: state.forum.teacher.teacher,
    anncPermission: state.forum.teacher.anncPermission,
    announcements: state.forum.teacher.announcements,
    subscribed: state.forum.teacher.subscribed,
    posts: state.forum.teacher.posts,
})

const mapDispatchToProps = (dispatch) => ({
    closeDialog: () => {
        dispatch({
            type: CLOSE_DIALOG
        })
    },
    newPost: (uid, collegeId, courseId, teacherId, title, content, fileId) => {
        dispatch(newPost(uid, collegeId, courseId, teacherId, title, content, fileId))
    },
    subscribe: (uid, collegeId, courseId, teacherId) => {
        dispatch(subscribe(uid, collegeId, courseId, teacherId))
    },
    unsubscribe: (uid, collegeId, courseId, teacherId) => {
        dispatch(unsubscribe(uid, collegeId, courseId, teacherId))
    },
    checkSubscribed: (uid, collegeId, courseId, teacherId) => {
        dispatch(checkSubscribed(uid, collegeId, courseId, teacherId))
    },
    getTeacherInfo: (collegeId, courseId, teacherId) => {
        dispatch(getTeacherInfo(collegeId, courseId, teacherId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Teacher)