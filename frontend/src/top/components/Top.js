import React, {Component} from 'react'
import {Grid} from "material-ui"
import SubSystem from "./SubSystem"
import Bar from "./Bar"
import AppBar from '@material-ui/core/AppBar';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
    Button,
    Menu,
    MenuItem,
} from '@material-ui/core';
class Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchor: 'left',
            anchorEl: null,
        };
    }
    render() {
        const {classes, theme, history} = this.props;
        return (

            <Bar
                open={false}
                history={history}
                children={

                    <div style={{
                        maxWidth: 1200,
                        margin: 'auto'
                    }}>
                        <div style={{
                            marginTop: 120
                        }}>
                            <Grid container>
                                <SubSystem name={'基础信息'} uri={'info'}/>
                                <SubSystem name={'subsystem2'} uri={''}/>
                                <SubSystem name={'subsystem3'} uri={''}/>
                                <SubSystem name={'论坛'} uri={'forum'}/>
                                <SubSystem name={'subsystem5'} uri={''}/>
                                <SubSystem name={'成绩管理'} uri={'scorem'}/>
                            </Grid>
                        </div>
                    </div>
            
                }
            />

           
            



            
                


            

            
        )
    }
}

export default Top