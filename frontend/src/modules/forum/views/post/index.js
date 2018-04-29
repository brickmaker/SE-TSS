import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import {getPostInfo} from "./actions"
import {Path} from "../../components/Path"
import {PostTitle} from "../../components/PostTitle"

class PostPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const pid = this.props.match.params.postid
        this.props.getPostInfo(pid)
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
                <Path path={path}/>
                <PostTitle title={title}/>
                <div>post terms</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    path: state.forum.post.path,
    title: state.forum.post.title
})

const mapDispatchToProps = (dispatch) => ({
    getPostInfo: (postId) => {
        dispatch(getPostInfo(postId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
