import React, { Component } from 'react';
import { Card, Grid, Avatar, CardContent, Typography, withStyles } from 'material-ui';
import PropTypes from 'prop-types';

const styles = {
    left: {
        display: "flex",
        justifyContent: "flex-start",
        margin: 10,
    },
    right: {
        display: "flex",
        justifyContent: "flex-end",
        margin: 10,
    },
    item: {
        display: "inline-block",
        color: "inherit",
        margin: 10,
    },
};

class Msg extends Component {
    render() {
        const { isLeft, message, classes } = this.props;
        const { avatar, senderId, content, time } = message;
        if (isLeft) {
            return (
                <div className={classes.left}>
                    <Avatar alt="avatar" src={avatar}> {senderId} </Avatar>
                    <Card>
                        <div className={classes.item}>
                            <Typography variant='caption' align="left">
                                {time}
                            </Typography>
                            <Typography variant='body1' align="left">
                                {content}
                            </Typography>
                        </div>
                    </Card>
                </div>
            );
        }
        else {
            console.log(senderId);
            return (
                <div className={classes.right}>
                    <Card>
                        <div className={classes.item}>
                            <Typography variant='caption' align="left">
                                {time}
                            </Typography>
                            <Typography variant='body1' align="left">
                                {content}
                            </Typography>
                        </div>
                    </Card>
                    <Avatar> {senderId} </Avatar>
                </div>
            );
        }
    }
}

Msg.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Msg);