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
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/AccountBox';
import AccountIcon from '@material-ui/icons/SupervisorAccount';
import ClassIcon from '@material-ui/icons/Class';
import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    MenuItem,
} from '@material-ui/core';

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
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="主页"/>
            </ListItem>
        </Link>
        <ListItem button>
            <ListItemIcon>
                <UserIcon/>
            </ListItemIcon>
            <ListItemText primary="个人信息"/>
        </ListItem>
        <Link to={'/staff/accounts'}>
            <ListItem button>
                <ListItemIcon>
                    <AccountIcon/>
                </ListItemIcon>
                <ListItemText primary="用户信息"/>
            </ListItem>
        </Link>
        <Link to={'/staff/lessons'}>
            <ListItem button>
                <ListItemIcon>
                    <ClassIcon/>
                </ListItemIcon>
                <ListItemText primary="课程信息"/>
            </ListItem>
        </Link>
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
        userName: '',
        anchor: 'left',
        anchorEl: null,
        pwdDialog: false,
        Old_pwd: '',
        New_pwd: '',
        New_pwd_1: '',
        pwd_txt1: '',
        pwd_error: false,
        pwd_txt: '',
        dialogState: false,
        dialogText: '',
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    logout = (e) => {
        e.preventDefault();
        this.props.logoutAndRedirect();
    };

    handleBack = () => {
        browserHistory.push('/main');
    };

    handleDialogClose = () => {
        this.setState({dialogState: false});
    };

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }

    pwdDialogOpen = () => {
        this.setState({
            pwdDialog: true,
            Old_pwd: '',
            New_pwd: '',
            New_pwd_1: '',
            pwd_txt1: '',
            pwd_txt: '',
        });
    };

    pwdDialogClose = () => {
        this.setState({pwdDialog: false});
    };

    UploadpwdDialog = () => {
        if (this.state.New_pwd !== this.state.New_pwd_1){
            this.setState({
                dialogState: true,
                dialogText: "新密码不一致",
            });
        }
        else {
            this.setState({pwdDialog: false});

            let data = {};
            data.old_password = this.state.Old_pwd;
            data.new_password = this.state.New_pwd;
            fetch('/api/update_password', {
                method: 'put',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('token'),
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    let status = response.status;
                    if (status === 200) {
                        this.setState({
                            dialogState: true,
                            dialogText: "密码修改成功",
                        });
                    } else {
                        this.setState({
                            dialogState: true,
                            dialogText: response.statusText,
                        });
                    }
                    return response.json;
                })
                .catch(() => {
                    this.setState({
                        dialogState: true,
                        dialogText: "服务器无响应",
                    });
                    // browserHistory.push("/login");
                });
        }
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleChange_pwd = prop => event => {

        this.setState({[prop]: event.target.value});
        var p = /[0-9a-z]/i;
        var ifTrue = p.test(event.target.value);
        if(event.target.value.length < 8 || !ifTrue){
            this.setState({pwd_txt1: "密码至少8位，且包括数字和字母"});
        }
        else{
            this.setState({pwd_txt1: ""});
        }

    };

    _handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
        if(this.state.New_pwd === event.target.value){
            this.setState({pwd_error: false, pwd_txt: ""});
        }
        else{
            this.setState({pwd_error: true, pwd_txt: "密码不一致"});
        }
    };

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
                                {/*<Paper>*/}
                                    {/*<Typography align='center' color="inherit">*/}
                                        {/*{this.state.userName}*/}
                                    {/*</Typography>*/}
                                {/*</Paper>*/}


                                <MenuItem onClick={this.pwdDialogOpen}>修改密码</MenuItem>
                                <MenuItem onClick={this.handleBack}>返回上层</MenuItem>
                                <MenuItem onClick={(e) => this.logout(e)}>退出系统</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
                {before}

                {after}
                <div>
                    <Dialog
                        open={this.state.pwdDialog}
                        onClose={this.pwdDialogClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">修改密码</DialogTitle>
                        <DialogContent>


                            <div>
                                <TextField
                                    fullWidth
                                    label="旧密码"
                                    type = "password"
                                    value={this.state.Old_pwd}
                                    onChange={this.handleChange('Old_pwd')}

                                />
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    label="新密码"
                                    type = "password"
                                    value={this.state.New_pwd}
                                    onChange={this.handleChange_pwd('New_pwd')}
                                    helperText= {this.state.pwd_txt1}

                                />
                            </div>
                            <div>
                                <TextField
                                    fullWidth
                                    label="再次输入新密码"
                                    type = "password"
                                    value={this.state.New_pwd_1}
                                    onChange={this._handleChange('New_pwd_1')}
                                    error = {this.state.pwd_error}
                                    helperText= {this.state.pwd_txt}
                                >

                                </TextField>
                            </div>


                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.UploadpwdDialog} color="primary">
                                确定
                            </Button>
                            <Button onClick={this.pwdDialogClose} color="primary">
                                关闭
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={this.state.dialogState}
                        onClose={this.handleDialogClose}
                    >
                        <DialogTitle>{"提示"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {this.state.dialogText}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDialogClose} color="primary">
                                关闭
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>

        );
    }
}

StaffBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(StaffBar);