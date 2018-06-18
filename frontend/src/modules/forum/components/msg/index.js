import React, { Component } from 'react';
import { Card, Grid, Avatar, CardContent, Typography, withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import moment, { now } from 'moment';
import Link from 'react-router-dom/Link';
import { ROOT_URL } from '../../configs/config';

const styles = {
    left: {
        display: "flex",
        justifyContent: "flex-start",
        margin: 15,
        alignItems: "center",
    },
    right: {
        display: "flex",
        justifyContent: "flex-end",
        margin: 15,
        alignItems: "center",
    },
    item: {
        display: "inline-block",
        color: "inherit",
        margin: 10,
    },
    rightCard: {
        backgroundColor: "#3f51b5",
        color: "#ffffff",
        marginRight: 10,
    },
    leftCard: {
        // backgroundColor:"#303030",
        // color:"#ffffff",
        marginLeft: 10,
    },
    time: {
        margin: 10,
    },
};

class Msg extends Component {
    render() {
        const { isLeft, message, classes } = this.props;
        const { from, content, time } = message;
        const { currenttime } = moment(now());
        const { msgtime } = moment(time);

        moment.locale('zh-cn');
        if (isLeft) {
            return (
                <div className={classes.left}>
                    <Avatar alt="avatar" src={`${ROOT_URL}${from.avatar}`}
                        component={Link} to={`/forum/usercenter/${from.id}`}
                    ></Avatar>
                    <Card className={classes.leftCard}>
                        <div className={classes.item}>
                            <Typography variant='body1' align="left" color="inherit">
                                {content}
                            </Typography>
                        </div>
                    </Card>
                    <Typography className={classes.time} variant='caption' align="left" color="inherit">
                        {moment(time).calendar()}
                    </Typography>
                </div>
            );
        }
        else {
            return (
                <div className={classes.right}>
                    <Typography className={classes.time} variant='caption' align="left" color="inherit">
                        {moment(time).calendar()}
                    </Typography>
                    <Card className={classes.rightCard}>
                        <div className={classes.item} styles={{ color: "0x000000" }}>
                            <Typography variant='body1' align="left" color="inherit">
                                {content}
                            </Typography>
                        </div>
                    </Card>
                    <Avatar alt="avatar" src={`${ROOT_URL}${from.avatar}`}
                        component={Link} to={`/forum/usercenter/${from.id}`}>
                    </Avatar>
                </div>
            );
        }
    }
}

Msg.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Msg);