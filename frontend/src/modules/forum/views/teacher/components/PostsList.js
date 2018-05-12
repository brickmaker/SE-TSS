import React, {Component} from 'react'
import {Card} from "material-ui"
import {connect} from "react-redux"
import {getPosts} from "../actions"
import PostsListItem from "../../../components/util/PostsListItem"
import {PageNums} from "../../../components/util/PageNums"
import {withRouter} from "react-router-dom"

class PostsList extends Component {
    constructor(props) {
        super(props)
        this.clickPageNum = this.clickPageNum.bind(this)
    }

    clickPageNum(event) {
        const page = parseInt(event.target.innerText)
        const {collegeid, courseid, teacherid} = this.props.match.params
        this.props.getPosts(collegeid, courseid, teacherid, page)
    }

    render() {
        const {pageNum, currPage} = this.props
        return (
            <div>
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
                <PageNums pageNum={pageNum} currPage={currPage} clickPage={this.clickPageNum}/>
            </div>
        )
    }
}

export default withRouter(connect(
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
)(PostsList))
