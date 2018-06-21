import React, {Component} from 'react'
import {Avatar, Card} from "material-ui"
import {dateFormat} from "../../../utils/time"
import {withRouter} from "react-router-dom"

class SubForum extends Component {
    super(props) {
        constructor(props)

        this.state = {
            isHover: false
        }
    }

    render() {
        const {id, name, pic, lastUpdate, postsNum, posts} = this.props
        return (
            <div
                onClick={() => {
                    this.props.history.push(`${this.props.match.url}/${id}`)
                }}
                onMouseOver={() => {
                    this.setState({isHover: true})
                }}
                onMouseLeave={() => {
                    this.setState({isHover: false})
                }}
                style={
                    // this.state.isHover ? {
                    //     cursor: 'hand',
                    //     width: 300,
                    //     height: 200,
                    // } :
                    {
                        cursor: 'pointer',
                    }
                }
            >
                <Card>
                    <div style={{
                        padding: '15px 20px',
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
                        <div>
                            <div style={{
                                fontWeight: 400,
                                fontSize: 18,
                            }}>{name}</div>
                            <div style={{
                                fontSize: 10,
                                fontWeight: 300,
                                color: 'white'
                            }}>
                                {lastUpdate ? `最后回复：${dateFormat(new Date(lastUpdate))}` : ``}
                                {postsNum ? ` 发帖数量：${postsNum}` : ``}
                            </div>
                        </div>
                    </div>
                    <div style={{
                        paddingLeft: 20,
                    }}>
                        <ul>
                            {
                                posts.map((p) => (
                                    <li>{p.title}</li>
                                ))
                            }
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}

export default withRouter(SubForum)