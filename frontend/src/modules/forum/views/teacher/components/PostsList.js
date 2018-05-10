import React, {Component} from 'react'
import {Card} from "material-ui"
import {connect} from "react-redux"
import {getPosts} from "../actions"
import PostsListItem from "../../../components/util/PostsListItem"

class PostsList extends Component {
    constructor(props) {
        super(props)
        this.clickPageNum = this.clickPageNum.bind(this)
    }

    clickPageNum(event) {
        const page = event.target.innerText
        const {collegeid, courseid, teacherid} = this.props.match.params
        this.props.getPosts(collegeid, courseid, teacherid, page)
    }

    render() {
        return (
            <Card style={{
                margin: '20px 0'
            }}>
                {
                    this.props.posts.map((postItem) => (
                        <PostsListItem
                            pic={postItem.pic}
                            name={postItem.name}
                            postId={postItem.postId}
                            title={postItem.title}
                            postTime={postItem.postTime}
                            lastReplyTime={postItem.lastReplyTime}
                            replyNum={postItem.replyNum}
                        />
                    ))
                }
            </Card>
        )
    }
}

export default connect(
    (state) => ({
        currPage: state.forum.teacher.currPage,
        pageNum: state.forum.teacher.pageNum,
        posts: state.forum.teacher.posts
    }),
    (dispatch) => ({
        getPosts: (collegeId, courseId, teacherId, pageId) => {
            dispatch(getPosts(collegeId, courseId, teacherId, pageId))
        }
    })
)(PostsList)
