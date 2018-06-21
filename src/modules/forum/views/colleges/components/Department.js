import React from 'react'
import {SectionText, SectionTitle} from "../../../components/util/SectionTitle"
import {School} from "@material-ui/icons/es/index"
import {Avatar, Card, List, ListItem, ListItemText} from "material-ui"
import {withRouter} from "react-router-dom"
import {ROOT_URL} from "../../../configs/config"

const Department = ({name, colleges, history, match}) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column'
    }}>
        <SectionTitle>
            <SectionText text={name}>
                <School color={'primary'} style={{fontSize: 40}}/>
            </SectionText>
        </SectionTitle>
        <Card style={{
            marginTop: 10,
            marginBottom: 30
        }}>
            <List>
                {
                    colleges.map((c) => (
                        <ListItem
                            button
                            onClick={() => {
                                history.push(`/forum/${c.collegeId}`)
                            }}
                            key={c.collegeId}
                        >
                            <Avatar
                                src={`${ROOT_URL}${c.pic}`}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                            <ListItemText
                                primary={c.name}
                                secondary={`今日发帖：${c.todayPostsNum}  累计发帖：${c.totalPostsNum}`}/>
                        </ListItem>
                    ))
                }
            </List>
        </Card>
    </div>
)

export default withRouter(Department)