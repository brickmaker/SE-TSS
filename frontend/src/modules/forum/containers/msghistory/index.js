import React, { Component } from 'react';
import { Card, Grid, Avatar, CardContent, Typography, withStyles, Button } from 'material-ui';
import Msg from '../../components/msg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';

const styles = {
    history: {
        display: "flex",
        justifyContent: "flex-start",
        overflow: "auto",
    },
    more: {
        textDecoration: "underline",
        cursor: "pointer",
    },
}

class MsgHistory extends Component {
    render() {
        const { selectedId, messages, classes } = this.props;
        return (
            <Grid container className={classes.history}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography className={classes.more}>
                        更多消息
                </Typography>
                    {
                        Object.values(messages).map((msg) => {
                            return (<Msg isLeft={selectedId == msg["senderId"]} key={msg["senderId"] + msg["time"]} message={msg} />);
                        })
                    }
                </Grid>
            </Grid>
        )
    }
}


MsgHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    selectedId: state.forum.messages.selectedId,
    messages: state.forum.messages.messages,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MsgHistory);

