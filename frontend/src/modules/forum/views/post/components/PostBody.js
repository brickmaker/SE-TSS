import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPostReplies} from "../actions"
import Reply from "./Reply"
import {Button} from "material-ui"
import {PageNums} from "../../../components/util/PageNums"

class PostBody extends Component {
    constructor(props) {
        super(props)
        this.clickPageNum = this.clickPageNum.bind(this)
    }

    componentDidMount() {
    }

    clickPageNum(event) {
        const page = event.target.innerText
        console.log(page) // todo: need rewrite, only for tmp use
        const {postId} = this.props
        this.props.getPostReplies(postId, page)
    }

    render() {
        const {replies, pageNum, currPage, postId} = this.props
        return (
            <div>
                {
                    replies.map((reply) => {
                        return (
                            <Reply
                                postId={postId}
                                key={reply.id}
                                id={reply.id}
                                uid={reply.user.id}
                                pic={reply.user.pic}
                                name={reply.user.name}
                                college={reply.user.college}
                                postNum={reply.user.postNum}
                                content={reply.content}
                                time={reply.time}
                                replies={reply.replies}
                            />
                        )
                    })
                }
                <PageNums pageNum={pageNum} currPage={currPage} clickPage={this.clickPageNum}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    postId: state.forum.post.postId,
    currPage: state.forum.post.currPage,
    pageNum: state.forum.post.pageNum,
    replies: state.forum.post.replies
})

const mapDispatchToProps = (dispatch) => ({
    getPostReplies: (postId, pageId) => {
        dispatch(getPostReplies(postId, pageId))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostBody)
