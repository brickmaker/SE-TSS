import React, {Component} from 'react'
import {Grid} from "material-ui"
import SubSystem from "./SubSystem"

class Top extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{
                maxWidth: 1200,
                margin: 'auto'
            }}>
                <div style={{
                    marginTop: 120
                }}>
                    <Grid container>
                        <SubSystem name={'基础信息'} uri={''}/>
                        <SubSystem name={'subsystem2'} uri={''}/>
                        <SubSystem name={'subsystem3'} uri={''}/>
                        <SubSystem name={'论坛'} uri={'forum'}/>
                        <SubSystem name={'subsystem5'} uri={''}/>
                        <SubSystem name={'subsystem6'} uri={''}/>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Top