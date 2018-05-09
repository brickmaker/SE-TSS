import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPostReplies} from "../actions"
import Reply from "./Reply"
import {Button} from "material-ui"

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
        const {replies, pageNum, currPage} = this.props
        return (
            <div>
                {
                    replies.map((reply) => {
                        return (
                            <Reply
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
                <div style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    marginBottom: 20
                }}>
                    <div>
                        {Array.from({length: pageNum}, (v, k) => (k + 1)).map((page) => {
                            return (
                                <Button
                                    key={page}
                                    size={'small'}
                                    onClick={this.clickPageNum}
                                    style={{
                                        minWidth: 30,
                                        width: 30,
                                        margin: 2,
                                        backgroundColor: page === currPage ? '#7986CB' : '#ffffff'
                                    }}>
                                    {page}
                                </Button>
                            )
                        })}
                    </div>
                </div>
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
