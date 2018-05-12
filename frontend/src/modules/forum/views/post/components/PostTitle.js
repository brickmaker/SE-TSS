import React from 'react'
import {Button, Card, CardContent, Typography} from "material-ui"
import {goBottom} from "../../../utils/pageHandler"

const styles = {
    height: 68,
    marginBottom: 20,
    backgroundColor: '#ffffff'
}

export const PostTitle = ({title}) => {
    return (
        <Card style={styles}>
            <CardContent style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Typography variant="title" style={{lineHeight: '36px'}}>
                    {title}
                </Typography>
                <Button color={'primary'} onClick={goBottom} variant={'raised'}>回帖</Button>
            </CardContent>
        </Card>
    )
}