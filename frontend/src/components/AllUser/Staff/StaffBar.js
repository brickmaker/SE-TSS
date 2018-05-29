import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import {browserHistory, Link} from "react-router";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';

function mapStateToProps(state) {
    return {
        status: state.auth.status,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: 600,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
    'appBarShift-right': {
        marginRight: drawerWidth,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },
    flex: {
        flex: 1,
    },
});

const ListItems = (
    <div>
        <Link to={'/staff'}>
        <ListItem button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="主页"/>
        </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="个人信息"/>
        </ListItem>
        <Link to={'/staff/lessons'}>
        <ListItem button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="课程信息"/>
        </ListItem>
        </Link>
        <Link to={'/staff/createLesson'}>
        <ListItem button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="添加课程"/>
        </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="删除课程"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="处理申请课程"/>
        </ListItem>
    </div>
);

const otherListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <StarIcon/>
            </ListItemIcon>
            <ListItemText primary="退出"/>
        </ListItem>
    </div>
);


@connect(mapStateToProps, mapDispatchToProps)
class StaffBar extends React.Component {
    state = {
        anchor: 'left',
        anchorEl: null,
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
    }

    render() {
        const {classes, theme, open, click} = this.props;
        const {anchor, anchorEl} = this.state;
        const drawer = (
            <Drawer
                variant="persistent"
                anchor={anchor}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={click}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>{ListItems}</List>
                <Divider/>
                <List>{otherListItems}</List>
            </Drawer>
        );

        let before = null;
        let after = null;

        if (anchor === 'left') {
            before = drawer;
        } else {
            after = drawer;
        }

        return (
            <div>
                <AppBar
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                        [classes[`appBarShift-${anchor}`]]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={click}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.flex} variant="title" color="inherit">
                            InfoSys
                        </Typography>
                        <Button color="inherit">信息系统</Button>
                        <Button color="inherit">排课系统</Button>
                        <Button color="inherit">选课系统</Button>
                        <Button color="inherit">论坛交流</Button>
                        <Button color="inherit">在线测试</Button>
                        <Button color="inherit">成绩管理</Button>
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
                                id="menu-appbar"
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
                                <MenuItem onClick={this.handleClose}>个人信息</MenuItem>
                                <MenuItem onClick={this.handleClose}>修改密码</MenuItem>
                                <MenuItem onClick={this.handleClose}>返回上层</MenuItem>
                                <MenuItem onClick={(e) => this.logout(e)}>退出系统</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                {before}

                {after}

            </div>

        );
    }
}

StaffBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(StaffBar);