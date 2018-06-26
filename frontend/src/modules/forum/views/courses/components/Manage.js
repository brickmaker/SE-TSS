import React, {Component} from 'react'
import {Button, Card, CardContent, Grid, TextField, Typography} from "material-ui"
import {ROOT_URL} from "../../../configs/config"
import {withAuthHeader} from "../../../utils/api"

class Manage extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        courseCode: '',
        courseName: ''
    }

    submit = () => {
        return fetch(`${ROOT_URL}/api/forum/course_newforum`, {
            method: 'POST',
            headers: withAuthHeader(),
            body: JSON.stringify({
                collegeid: this.props.collegeId,
                code: this.state.courseCode,
                name: this.state.courseName
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
                this.props.changeCourses()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="headline" color={'secondary'} component="h2">
                            添加课程板块
                        </Typography>
                        <Grid container>
                            <Grid item xs={4}>
                                <TextField
                                    id="code"
                                    fullWidth={true}
                                    label="课程代号"
                                    value={this.state.courseCode}
                                    onChange={(e) => {
                                        this.setState({
                                            courseCode: e.target.value
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
                                    label="课程名称"
                                    value={this.state.courseName}
                                    style={{
                                        margin: 5
                                    }}
                                    onChange={(e) => {
                                        this.setState({
                                            courseName: e.target.value
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