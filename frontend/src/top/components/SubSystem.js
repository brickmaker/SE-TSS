import React, {Component} from 'react'
import {Button, Card, Grid, Typography} from "material-ui"
import {withRouter} from "react-router-dom"

const SubSystem = ({uri, name, history}) => (
    <Grid
        style={{
            padding: 20,
        }}
        item xs={4}>
        <Card style={{
            backgroundColor: 'white',
            height: 200,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <Button
                onClick={() => {
                    history.push(`/${uri}`)
                }}
                style={{
                    height: '100%',
                    width: '100%'
                }}
                size={'large'}
            >
                <Typography color={'primary'} variant={'headline'}>
                    {name}
                </Typography>
            </Button>
        </Card>
    </Grid>
)

export default withRouter(SubSystem)