import React, {Component} from 'react'
import {Button, Card, CardContent, Grid, TextField, Typography} from "material-ui"
import {ROOT_URL} from "../../../configs/config"
import {withAuthHeader} from "../../../utils/api"

class Manage extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        teacherId: '',
        teacherName: ''
    }

    deleteForum = () => {
        const {collegeId, courseId, history} = this.props
        fetch(`${ROOT_URL}/api/forum/course_deleteforum?collegeid=${collegeId}&courseid=${courseId}`, {
            headers: withAuthHeader()
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response)
                } else {
                    return response.json()
                }
            })
            .then(json => {
                history.goBack()
            })
            .catch(err => {
                console.log(err)
            })
    }


    submit = () => {
        const {collegeId, courseId, history} = this.props
        fetch(`${ROOT_URL}/api/forum/teacher_newforum`, {
            method: 'POST',
            headers: withAuthHeader(),
            body: JSON.stringify({
                collegeid: collegeId,
                courseid: courseId,
                id: this.state.teacherId,
                name: this.state.teacherName
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response)
                } else {
                    return response.json()
                }
            })
            .then(json => {
                this.props.update()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div style={{padding: '20px 0'}}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" color={'secondary'} component="h2">
                            删除本版块
                        </Typography>
                        <Grid container>
                            <Grid item xs={9}>
                                <Typography variant="body2" color={'secondary'} component="h2">
                                    请慎重，删除本版块将删除其所有的内容
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    color="secondary"
                                    variant={'raised'}
                                    style={{
                                        margin: 5
                                    }}
                                    onClick={this.deleteForum}
                                >
                                    删除
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" color={'secondary'} component="h2">
                            添加教师板块
                        </Typography>
                        <Grid container>
                            <Grid item xs={4}>
                                <TextField
                                    id="code"
                                    fullWidth={true}
                                    label="教师ID"
                                    value={this.state.teacherId}
                                    onChange={(e) => {
                                        this.setState({
                                            teacherId: e.target.value
                                        })
                                    }}
                                    style={{
                                        margin: 5
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="name"
                                    fullWidth={true}
                                    label="教师板块名称"
                                    value={this.state.teacherName}
                                    style={{
                                        margin: 5
                                    }}
                                    onChange={(e) => {
                                        this.setState({
                                            teacherName: e.target.value
                                        })
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    color="secondary"
                                    variant={'raised'}
                                    style={{
                                        margin: 5
                                    }}
                                    onClick={this.submit}
                                >
                                    添加
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Manage