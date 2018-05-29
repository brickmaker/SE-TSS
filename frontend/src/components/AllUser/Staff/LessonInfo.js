import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import {browserHistory} from "react-router";

import StaffBar from "./StaffBar";

function mapStateToProps(state) {
    return {
        userName: state.auth.userName,
        data: state.auth.data,
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
        height: '90%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
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
    TextField: {
        marginLeft: '80%',
        width: 200,
    }
});

@connect(mapStateToProps, mapDispatchToProps)
class LessonInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lesson_data: [],
            anchor: 'left',
            userName: '',
            open: true,
        };
    }

    handleClick() {
        this.setState({open: !this.state.open});
    }

    componentDidMount() {
        fetch('/api/course/', {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({lesson_data: data})
            })
            .catch((e) => {
                browserHistory.push("/login");
                alert("身份验证失效，请重新登录");
            });
        this.setState({userName: localStorage.getItem('userName')});
    }


    render() {
        const {classes, theme} = this.props;
        const {anchor, open} = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <StaffBar click={this.handleClick.bind(this)} open={this.state.open}/>

                    <Card
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-${anchor}`]]: open,
                        })}
                    >
                        <div className={classes.drawerHeader}/>
                        <TextField
                            className={classes.TextField}
                            label="输入课程名"
                            floatingLabelText="搜索"
                            margin="normal"
                        />
                        <Table>
                            <TableHead adjustForCheckbox={false} displaySelectAll={false}>
                                <TableRow>
                                    <TableCell>课程号</TableCell>
                                    <TableCell>课程名</TableCell>
                                    <TableCell>学分</TableCell>
                                    <TableCell>教室</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody displayRowCheckbox={false}>
                                {this.state.lesson_data.map((row) => (
                                    <TableRow key={row.course_id}>
                                        <TableCell>{row.course_id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.credit}</TableCell>
                                        <TableCell>{row.classroom}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        );
    }
}


LessonInfo.propType = {
    userName: PropTypes.string,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(LessonInfo);


