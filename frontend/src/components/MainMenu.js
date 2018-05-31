import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';
import {browserHistory} from "react-router";
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Helmet} from "react-helmet";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function mapStateToProps(state) {
    return {
        status: state.auth.status,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = theme => ({
    Helmet: {
        background: '#EEEEEE',
    },
    Typography: {
        flex: 1,
    },
    Card: {
        width: "60%",
        marginLeft: "20%",
        marginTop: "5%",
    },
    SubCard: {
        width: '28%',
        height: 200,
        marginLeft: '4%',
        marginTop: '5%',
        marginBottom: '5%',
        textAlign: 'center',
        display: 'inline-block',
    },
    Button: {
        marginTop: "25%",
        marginLeft: '25%',
        alignItems: 'center',
        fontSize: 18,
        color: "#2196F3",
    }


});


@connect(mapStateToProps, mapDispatchToProps)
class MainMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userType: -1,
            dialogOpen: false,
            dialogText: '',
        };
    }

    handleClickOpen = () => {
        this.setState({dialogText: "当前的密码为默认密码（身份证后6位），请及时修改密码确保账户安全", dialogOpen: true});
    };

    handleClose = () => {
        this.setState({dialogOpen: false});
    };

    componentDidMount() {
        this.setState({userType: localStorage.getItem('type')});
        this.setState({userName: localStorage.getItem('userName')});
        if (this.props.status === 200) {
            this.handleClickOpen();
        }
    }


    dispatchNewRoute(e) {
        e.preventDefault();
        let route = '';
        if (this.state.userType === '4')
            route = '/admin';
        else if (this.state.userType === '1')
            route = '/student';
        else if (this.state.userType === '2')
            route = '/teacher';
        else if (this.state.userType === '3')
            route = '/staff';
        browserHistory.push(route);
    }

    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();
    }

    render() {
        const {classes, theme} = this.props;
        return (
            <div>
                <Helmet bodyAttributes={{style: 'background-color : #EEEEEE'}}/>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.Typography}>
                            InfoSys
                        </Typography>
                        <Button color="inherit" onClick={(e) => this.logout(e)}>退出</Button>
                    </Toolbar>
                </AppBar>
                <Card className={classes.Card}>

                    <Card className={classes.SubCard}>
                        <CardActions>
                            <Button variant='flat' className={classes.Button}
                                    onClick={(e) => this.dispatchNewRoute(e)}>基础信息系统</Button>
                        </CardActions>
                    </Card>
                    <Card className={classes.SubCard}>
                        <CardActions>
                            <Button variant='flat' className={classes.Button}>自助排课系统</Button>
                        </CardActions>
                    </Card>
                    <Card className={classes.SubCard}>
                        <CardActions>
                            <Button variant='flat' className={classes.Button}>学生选课系统</Button>
                        </CardActions>
                    </Card>
                    <Card className={classes.SubCard}>
                        <CardActions>
                            <Button variant='flat' className={classes.Button}>论坛交流系统</Button>
                        </CardActions>
                    </Card>
                    <Card className={classes.SubCard}>
                        <CardActions>
                            <Button variant='flat' className={classes.Button}>在线测试系统</Button>
                        </CardActions>
                    </Card>
                    <Card className={classes.SubCard}>
                        <CardActions>
                            <Button variant='flat' className={classes.Button}>成绩管理系统</Button>
                        </CardActions>
                    </Card>
                </Card>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                >
                    <DialogTitle>{"安全提示"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.dialogText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            关闭
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


MainMenu.propType = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(MainMenu);

