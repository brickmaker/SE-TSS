import React, {Component, Fragment} from 'react'
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import {
    Avatar,
    Button,
    Card,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText
} from "material-ui"
import {Reply as ReplyIcon} from '@material-ui/icons'
import {connect} from "react-redux"
import {OPEN_COMMENT} from "../actions"
import {selectEntry} from "../../messages/actions";
import {ROOT_URL} from "../../../configs/config"

const style = {
    margin: '15px 0',
    display: 'flex'
}

class Reply extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {postId, id, uid, pic, name, college, postNum, content, time, file, replies} = this.props
        return (
            <Card style={style}>
                <div style={{
                    minHeight: 300,
                    maxWidth: 300,
                    width: 250,
                    padding: '30px 20px',
                    backgroundColor: '#7986CB',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'white'
                }}>
                    <Avatar
                        src={`${ROOT_URL}${pic}`}
                        style={{
                            width: 100,
                            height: 100,
                            cursor: "pointer",
                        }}
                        onClick={(event) => {
                            event.preventDefault();
                            this.props.history.push(`/forum/usercenter/${uid}`);
                        }}
                    />
                    <span style={{
                        marginTop: 10,
                        marginBottom: 10,
                        fontWeight: 300,
                        fontSize: '1.2em',
                    }}>{name}</span>
                    <span style={{
                        fontWeight: 400,
                    }}>{college}</span>
                    <span style={{
                        fontWeight: 400,
                        fontSize: '0.8em'
                    }}>发帖数量：{postNum}</span>
                    <Button
                        variant={'raised'}
                        color={'primary'}
                        onClick={(event) => {
                            event.preventDefault();
                            console.log("click msg", uid, pic, name);
                            this.props.selectEntry(uid, pic, name);
                            this.props.history.push(`/forum/messages`);
                        }}
                        style={{
                            margin: 15,
                            backgroundColor: '#3949AB'
                        }}>发送消息</Button>
                </div>
                <div style={{
                    padding: 20,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <div>{ReactHtmlParser(content)}</div>
                    <div>
                        <div style={{
                            fontSize: '0.8em',
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            alignItems: 'center',
                            color: '#9E9E9E'
                        }}>
                            {
                                this.props.disableComment ? null :
                                    <Button
                                        size={'small'}
                                        onClick={() => {
                                            this.props.openComment(postId, id, uid)
                                        }}
                                    >
                                        <ReplyIcon/>
                                        回复
                                    </Button>
                            }
                            发布于：{new Date(time).toISOString().slice(0, 10)} {new Date(time).toLocaleTimeString()}
                            {
                                file ? file : null
                            }
                        </div>
                        {
                            replies.length === 0 ? null :
                                <div style={{
                                    backgroundColor: '#f0f0f0'
                                }}>
                                    <List dense={true}>
                                        {
                                            replies.map(rr => (
                                                <ListItem>
                                                    <Avatar
                                                        src={`${ROOT_URL}${pic}`}
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            this.props.history.push(`/forum/usercenter/${uid}`);
                                                        }}
                                                    />
                                                    <ListItemText
                                                        primary={`${rr.from} 回复 ${rr.to} (${new Date(rr.time).toISOString().slice(0, 10)} ${new Date(time).toLocaleTimeString()}):`}
                                                        secondary={rr.content}/>
                                                    <ListItemSecondaryAction>
                                                        <IconButton
                                                            onClick={() => {
                                                                this.props.openComment(postId, id, rr.to)
                                                            }}
                                                            aria-label="Reply"
                                                        >
                                                            <ReplyIcon/>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </div>
                        }
                    </div>
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
    openComment: (postId, replyId, to) => {
        dispatch({
            type: OPEN_COMMENT,
            postId: postId,
            replyId: replyId,
            to: to
        })
    },
    selectEntry: (id, avatar, username) => {
        dispatch(selectEntry(id, avatar, username));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Reply)
