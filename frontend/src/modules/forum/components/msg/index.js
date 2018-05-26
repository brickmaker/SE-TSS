import React, { Component } from 'react';
import { Card, Grid, Avatar, CardContent, Typography, withStyles } from 'material-ui';
import PropTypes from 'prop-types';

const styles = {
    left: {
        display: "flex",
        justifyContent: "flex-start",
        margin: 10,
        alignItems: "center",
    },
    right: {
        display: "flex",
        justifyContent: "flex-end",
        margin: 10,
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
        const {  from, content, time } = message;
        if (isLeft) {
            return (
                <div className={classes.left}>
                    <Avatar alt="avatar" src={from.avatar}></Avatar>
                    <Card className={classes.leftCard}>
                        <div className={classes.item}>
                            <Typography variant='body1' align="left" color="inherit">
                                {content}
                            </Typography>
                        </div>
                    </Card>
                    <Typography className={classes.time} variant='caption' align="left" color="inherit">
                        {time}
                    </Typography>
                </div>
            );
        }
        else {
            return (
                <div className={classes.right}>
                    <Typography className={classes.time} variant='caption' align="left" color="inherit">
                        {time}
                    </Typography>
                    <Card className={classes.rightCard}>
                        <div className={classes.item} styles={{ color: "0x000000" }}>
                            <Typography variant='body1' align="left" color="inherit">
                                {content}
                            </Typography>
                        </div>
                    </Card>
                    <Avatar alt="avatar" src={from.avatar}></Avatar>
                </div>
            );
        }
    }
}

Msg.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Msg);