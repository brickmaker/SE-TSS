import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, withRouter} from 'react-router-dom'
import {
    Button,
    Menu,
    MenuItem,
} from '@material-ui/core';

import {
    AccountCircle,
} from '@material-ui/icons';
import * as actionCreators from "../../modules/info/actions/auth";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";


const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'absolute',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        zIndex: 10000
        // flexGrow: 1,
        // position: 'absolute',
        // marginLeft: drawerWidth,
        // [theme.breakpoints.up('md')]: {
        //     width: `calc(100% - ${drawerWidth}px)`,
        // },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        overflow: 'scroll',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
    flex: {
        flex: 1,
    },
});


function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


class Bar extends React.Component {
    state = {
        mobileOpen: false,
        anchorEl: null,
    };

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    logout = () => {
        this.props.logoutAndRedirect();
        this.props.history.push('/');
    };


    render() {
        const {classes, theme, listItems, otherItems, children, open} = this.props;
        const {anchorEl} = this.state;

        let drawerOpen = open;

        if (open === undefined) {
            drawerOpen = true;
        }

        const drawer = (
            <div>
                <div className={classes.toolbar}/>
                <Divider/>
                <List>{listItems}</List>
                <Divider/>
                <List>{otherItems}</List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon/>
                        </IconButton>


                        <Typography
                            className={classes.flex}
                            component={Link}
                            to="/main"
                            variant="title" color="inherit">
                            教学管理系统
                        </Typography>

                        <Button
                            component={Link}
                            raised
                            to="/info"
                            color="inherit">信息系统</Button>
                        <Button
                            component={Link}
                            raised
                            to=""
                            color="inherit">排课系统</Button>
                        <Button
                            component={Link}
                            raised
                            to="/xkxt"
                            color="inherit">选课系统</Button>
                        <Button
                            component={Link}
                            raised
                            to="/forum"
                            color="inherit">论坛交流</Button>
                        <Button
                            component={Link}
                            raised
                            to=""
                            color="inherit">在线测试</Button>
                        <Button
                            component={Link}
                            raised
                            to=""
                            color="inherit">成绩管理</Button>


                        <div>
                            <IconButton
                                aria-owns={Boolean(anchorEl) ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.logout}>退出系统</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen && drawerOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    {drawerOpen && <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>}
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} id={'top-content-container'}/>
                    {children}
                </main>
            </div>
        );
    }
}

Bar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default withRouter(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Bar)));
