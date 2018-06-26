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
        const {collegeId, courseId, teacherId, history} = this.props
        fetch(`${ROOT_URL}/api/forum/teacher_deleteforum?collegeid=${collegeId}&courseid=${courseId}&teacherid=${teacherId}`, {
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
            </div>
        )
    }
}

export default Manage