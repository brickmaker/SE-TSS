import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import {getPostInfo, CLOSE_DIALOG, reply} from "./actions"
import {Path} from "../../components/util/Path"
import {PostTitle} from "./components/PostTitle"
import PostBody from "./components/PostBody"
import ReplyEditor from "./components/editor/ReplyEditor"
import {MainBody} from "../../components/util/MainBody"
import {goBottom} from "../../utils/pageHandler"
import Comment from "./components/Comment"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "material-ui"

class PostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true // todo: get login!!!
        }
        this.reply = this.reply.bind(this)
        this.onDialogClose = this.onDialogClose.bind(this)
    }

    componentDidMount() {
        const pid = this.props.match.params.postid
        this.props.getPostInfo(pid, this.props.pageId)
    }

    reply(content, fileId) {
        const {postId} = this.props
        this.props.reply("uid", postId, content, fileId) // todo: get uid
    }

    onDialogClose() {
        this.props.closeDialog()
    }

    render() {
        const path = {
            college: {
                name: this.props.path.college.name,
                link: `/forum/${this.props.path.college.id}`
            },
            course: {
                name: this.props.path.course.name,
                link: `/forum/${this.props.path.college.id}/${this.props.path.course.id}`
            },
            teacher: this.props.path.teacher ? {
                name: this.props.path.teacher.name,
                link: `/forum/${this.props.path.college.id}/${this.props.path.course.id}/${this.props.path.teacher.id}`
            } : null,
            post: {
                name: this.props.title.length < 10 ? this.props.title : this.props.title.substring(0, 7) + "...",
                link: '#'
            }
        }
        const {title} = this.props
        return (
            <div>
                <MainBody>
                    <Path path={path}/>
                    <PostTitle title={title}/>
                    <PostBody/>
                    <ReplyEditor
                        post={this.reply}
                    />
                    <Comment/>
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
    dialog: state.forum.post.dialog,
    postId: state.forum.post.postId,
    pageId: state.forum.post.currPage,
    path: state.forum.post.path,
    title: state.forum.post.title
})

const mapDispatchToProps = (dispatch) => ({
    closeDialog: () => {
        dispatch({
            type: CLOSE_DIALOG
        })
    },
    reply: (uid, postId, content, fileId) => {
        dispatch(reply(uid, postId, content, fileId))
    },
    getPostInfo: (postId, pageId) => {
        dispatch(getPostInfo(postId, pageId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
