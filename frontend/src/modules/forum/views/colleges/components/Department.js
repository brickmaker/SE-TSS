import React from 'react'
import {SectionText, SectionTitle} from "../../../components/util/SectionTitle"
import {School} from "@material-ui/icons/es/index"
import {Avatar, Card, List, ListItem, ListItemText} from "material-ui"

export const Department = ({name, colleges}) => (
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
                        <ListItem key={c.collegeId}>
                            <Avatar
                                src={c.pic}
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