import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import {getPostInfo} from "./actions"
import {Path} from "../../components/util/Path"
import {PostTitle} from "./components/PostTitle"
import PostBody from "./components/PostBody"
import ReplyEditor from "./components/editor/ReplyEditor"
import {MainBody} from "../../components/util/MainBody"
import {goBottom} from "../../utils/pageHandler"
import Comment from "./components/Comment"

class PostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: true // todo: get login!!!
        }
    }

    componentDidMount() {
        const pid = this.props.match.params.postid
        this.props.getPostInfo(pid, this.props.pageId)
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
                    <ReplyEditor/>
                    <Comment/>
                </MainBody>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    postId: state.forum.post.postId,
    pageId: state.forum.post.currPage,
    path: state.forum.post.path,
    title: state.forum.post.title
})

const mapDispatchToProps = (dispatch) => ({
    getPostInfo: (postId, pageId) => {
        dispatch(getPostInfo(postId, pageId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
