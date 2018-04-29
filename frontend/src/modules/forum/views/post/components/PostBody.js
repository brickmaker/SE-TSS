import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPostReplies} from "../actions"

class PostBody extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        const {replies} = this.props
        return (
            <div>
                {
                    replies.map((reply) => {
                        return (
                            <div>
                                {reply.user.name}
                                {reply.content}
                                {reply.time}
                                <ul>
                                    {reply.replies.map((rr) => (
                                        <li>{rr.content}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    postId: state.forum.post.postId,
    currPage: state.forum.post.pageId,
    replies: state.forum.post.replies
})

const mapDispatchToProps = (dispatch) => ({
    getPostReplies: (postId, pageId) => {
        dispatch(getPostReplies(postId, pageId))
    }
})

export default connect(
    mapStateToProps,
    null
)(PostBody)
