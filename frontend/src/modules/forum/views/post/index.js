import React, {Component} from 'react'
import {connect} from "react-redux"
import {getPostInfo} from "./actions"

class PostPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const pid = this.props.match.params.postid
        this.props.getPostInfo(pid)
    }

    render() {
        return (
            <div>
                post page
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
