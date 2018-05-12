import React, {Component} from "react"
import {Avatar} from "material-ui"
import {dateFormat} from "../../utils/time"
import {DEBUG, ROOT_URL} from "../../configs/config"
import {withRouter} from "react-router-dom"

class PostsListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHover: false
        }
    }


    render() {
        const {pic, name, postId, title, postTime, lastReplyTime, replyNum, isAnnouncement} = this.props
        return (
            <div
                onClick={() => {
                    console.log('click')
                    // todo: announcement destination router
                    isAnnouncement ?
                        console.log('go to announcement detail') :
                        this.props.history.push(`/forum/p/${postId}`)
                }}
                onMouseOver={() => {
                    this.setState({isHover: true})
                }}
                onMouseLeave={() => {
                    this.setState({isHover: false})
                }}
                style={
                    this.state.isHover ? {
                        cursor: 'hand',
                        display: 'flex',
                        border: '1px solid #EEEEEE',
                        height: 60,
                    } : {
                        cursor: 'pointer',
                        display: 'flex',
                        border: '1px solid #EEEEEE',
                        height: 60,
                    }}
            >
                <div style={{
                    width: 140,
                    padding: '30px 20px',
                    backgroundColor: '#7986CB',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    color: 'white'
                }}>
                    <Avatar
                        src={pic}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                    <span style={{
                        marginLeft: 10,
                        fontSize: 17
                    }}>{name}</span>
                </div>
                <div style={{
                    paddingLeft: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <div>
                        <div style={{
                            fontWeight: 400,
                            fontSize: 18,
                        }}>{title}</div>
                        <div style={{
                            fontSize: 12,
                            fontWeight: 300,
                            color: '#757575'
                        }}> {postTime ? `- 发布时间：${dateFormat(new Date(postTime))}` : ``}
                            {lastReplyTime ? `  - 最后回复：${dateFormat(new Date(lastReplyTime))}` : ``}
                            {replyNum ? `  - 回复数量：${replyNum}` : ``}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(PostsListItem)
