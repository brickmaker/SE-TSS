import React, {Component} from 'react'
import {connect} from "react-redux"
import {checkSubscribed, CLOSE_DIALOG, getCourseInfo, newPost, subscribe, unsubscribe} from "./actions"
import {MainBody} from "../../components/util/MainBody"
import {Path} from "../../components/util/Path"
import {SectionText, SectionTitle} from "../../components/util/SectionTitle"
import {Extension, Announcement} from "@material-ui/icons"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "material-ui"
import {goBottom} from "../../utils/pageHandler"
import PostsList from "./components/PostsList"
import PostEditor from "../teacher/components/PostEditor"
import SubForum from "./components/SubForum"
import Manage from "./components/Manage"

class Course extends Component {
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

    update = () => {
        const {collegeid, courseid} = this.props.match.params
        this.props.getCourseInfo(collegeid, courseid)
        if (this.state.isLogin) {
            this.props.checkSubscribed("uid", collegeid, courseid) // todo: get uid
        }
    }

    componentDidMount() {
        const {collegeid, courseid} = this.props.match.params
        this.props.getCourseInfo(collegeid, courseid)
        if (this.state.isLogin) {
            this.props.checkSubscribed("uid", collegeid, courseid) // todo: get uid
        }
    }

    subscribe() {
        if (!this.state.isLogin) {
            // todo: redirect to login
        }
        else {
            const {collegeid, courseid} = this.props.match.params
            this.props.subscribe("uid", collegeid, courseid) // todo: get uid
        }
    }

    unsubscribe() {
        if (!this.state.isLogin) {
            // todo: redirect to login
        }
        else {
            const {collegeid, courseid} = this.props.match.params
            this.props.unsubscribe("uid", collegeid, courseid)
        }
    }

    goToPost() {
        if (this.state.isLogin) {
            // window.scrollTo(0, document.body.scrollHeight);
            const editor = document.getElementById('forum-editor')
            editor.scrollIntoView()
            // console.log(div.scrollHeight)
            // div.scrollTop = div.scrollHeight
            // console.log(div.scrollTop)
        }
        else {
            // todo: redirect to login
        }
    }

    post(title, content, fileId) {
        const {collegeid, courseid} = this.props.match.params
        this.props.newPost("uid", collegeid, courseid, title, content, fileId) // todo: get uid
    }

    onDialogClose() {
        this.props.closeDialog()
    }

    render() {
        const {college, course, subForums, subscribed} = this.props
        const {collegeid, courseid} = this.props.match.params
        const type = localStorage.getItem('type');
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
            <div id={'coursePage'} style={{
                height: '100%',
                overflow: 'scroll'
            }}>
                <MainBody>
                    <div>
                        <Path path={path}/>
                        <SectionTitle>
                            <SectionText text={'教师版块'}>
                                <Extension color={'primary'} style={{fontSize: 40}}/>
                            </SectionText>
                            <div>
                            </div>
                        </SectionTitle>
                        <Grid container>
                            {subForums.map((sub) => (
                                <Grid item xs={4}
                                      style={{
                                          padding: 10
                                      }}
                                >
                                    <SubForum
                                        key={sub.id}
                                        id={sub.id}
                                        name={sub.name}
                                        pic={sub.pic}
                                        lastUpdate={sub.lastUpdate}
                                        postsNum={sub.postsNum}
                                        posts={sub.newPosts} // todo: not compatible with API
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
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
                    {(type === "3" || type === "4") &&
                    <Manage update={this.update} collegeId={collegeid} courseId={courseid}
                            history={this.props.history}/>
                    }
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
    dialog: state.forum.course.dialog,
    college: state.forum.course.college,
    course: state.forum.course.course,
    subForums: state.forum.course.subForums,
    subscribed: state.forum.course.subscribed,
    posts: state.forum.course.posts
})

const mapDispatchToProps = (dispatch) => ({
    closeDialog: () => {
        dispatch({
            type: CLOSE_DIALOG
        })
    },
    newPost: (uid, collegeId, courseId, title, content, fileId) => {
        dispatch(newPost(uid, collegeId, courseId, title, content, fileId))
    },
    subscribe: (uid, collegeId, courseId) => {
        dispatch(subscribe(uid, collegeId, courseId))
    },
    unsubscribe: (uid, collegeId, courseId) => {
        dispatch(unsubscribe(uid, collegeId, courseId))
    },
    checkSubscribed: (uid, collegeId, courseId) => {
        dispatch(checkSubscribed(uid, collegeId, courseId))
    },
    getCourseInfo: (collegeId, courseId) => {
        dispatch(getCourseInfo(collegeId, courseId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Course)