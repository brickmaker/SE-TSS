import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import {getPostInfo} from "./actions"
import {Path} from "../../components/util/Path"
import {PostTitle} from "./components/PostTitle"
import PostBody from "./components/PostBody"
import PostEditor from "./components/editor/PostEditor"
import {MainBody} from "../../components/util/MainBody"

class PostPage extends Component {
    constructor(props) {
        super(props)
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
            teacher: this.props.teacher ? {
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
                    <PostEditor/>
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
