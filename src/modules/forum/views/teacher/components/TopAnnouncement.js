import React, {Component} from 'react'
import {Card} from "material-ui"
import PostsListItem from "../../../components/util/PostsListItem"

class TopAnnouncement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topAnnouncements: [
                {
                    pic: "https://api.adorable.io/avatars/144/userpic.png",
                    name: "梅骨竹心",
                    id: "111",
                    title: "【重要】软工设计报告 提交须知！！！",
                    postTime: "2012-04-23T18:25:43.511Z"
                },
                {
                    pic: "https://api.adorable.io/avatars/144/userpic.png",
                    name: "梅骨竹心",
                    id: "111",
                    title: "【重要】软工设计报告 提交须知！！！",
                    postTime: "2012-04-23T18:25:43.511Z"
                },
                {
                    pic: "https://api.adorable.io/avatars/144/userpic.png",
                    name: "梅骨竹心",
                    id: "111",
                    title: "【重要】软工设计报告 提交须知！！！",
                    postTime: "2012-04-23T18:25:43.511Z"
                },
                {
                    pic: "https://api.adorable.io/avatars/144/userpic.png",
                    name: "梅骨竹心",
                    id: "111",
                    title: "【重要】软工设计报告 提交须知！！！",
                    postTime: "2012-04-23T18:25:43.511Z"
                },
                {
                    pic: "https://api.adorable.io/avatars/144/userpic.png",
                    name: "梅骨竹心",
                    id: "111",
                    title: "【重要】软工设计报告 提交须知！！！",
                    postTime: "2012-04-23T18:25:43.511Z"
                }
            ]
        }
    }

    render() {
        return (
            <Card style={{
                margin: '20px 0'
            }}>
                {
                    this.state.topAnnouncements.map((announcementItem) => (
                        <PostsListItem
                            pic={announcementItem.pic}
                            name={announcementItem.name}
                            postId={announcementItem.id}
                            title={announcementItem.title}
                            postTime={announcementItem.postTime}
                            isAnnouncement={true}
                        />
                    ))
                }
            </Card>
        )
    }
}

export default TopAnnouncement
