import React, {Component} from 'react'
import {Button, Card, Grid, IconButton, Typography} from "material-ui"
import {withRouter} from "react-router-dom"

const SubSystem = ({uri, name, history, children}) => (
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
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <IconButton
                        // color={'primary'}
                        style={{
                            color: '#5C6BC0',
                            margin: 20,
                            width: 80,
                            height: 80
                        }}>
                        {children}
                    </IconButton>
                    <Typography color={'primary'} variant={'headline'}>
                        {name}
                    </Typography>
                </div>
            </Button>
        </Card>
    </Grid>
)

export default withRouter(SubSystem)