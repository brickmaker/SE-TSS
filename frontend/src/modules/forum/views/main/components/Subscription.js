import React from 'react'
import {Link, withRouter} from "react-router-dom"
import {Extension, Forum as ForumIcon} from '@material-ui/icons'
import {SectionText, SectionTitle} from "../../../components/util/SectionTitle"
import {Avatar, Card, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText} from "material-ui"

const Subscription = ({name, path, posts, history, match}) => {
    const url = `/forum/${path.college.id}/${path.course.id}/${path.teacher ? path.teacher.id : ''}`
    return (
        <Grid item xs={6}
              style={{
                  padding: '0 20px',
              }}
        >
            <div
                onClick={() => {
                    console.log('click')
                    history.push(url)
                }}
            >
                <SectionTitle>
                    <SectionText
                        onClick={() => {
                            console.log('click')
                            history.push(url)
                        }}
                        text={name}
                    >
                        <Extension color={'primary'} style={{fontSize: 40}}/>
                    </SectionText>
                </SectionTitle>
            </div>
            <Card style={{
                marginTop: 10,
                marginBottom: 30
            }}>
                <List dense>
                    {
                        posts.map((p) => (
                            <ListItem
                                button
                                onClick={() => {
                                    history.push(`/forum/p/${p.id}`)
                                }}
                                key={p.collegeId}
                            >
                                <ListItemIcon>
                                    <ForumIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={p.title}
                                />
                            </ListItem>
                        ))
                    }
                </List>
            </Card>
        </Grid>
    )
}

export default withRouter(Subscription)