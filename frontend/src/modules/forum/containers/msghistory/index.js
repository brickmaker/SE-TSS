import React, { Component } from 'react';
import { Card, Grid, Avatar, CardContent, Typography, withStyles, Button, CircularProgress } from 'material-ui';
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
    pending:{
        margin: 100,
    },
}

class MsgHistory extends Component {
    render() {
        const { selectedId, msgs, classes, isFetchingMsgs } = this.props;
        return (
            <Grid container className={classes.history}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {isFetchingMsgs ? <CircularProgress className={classes.pending} /> :
                        <div>
                            <Typography className={classes.more}>
                                更多消息
                                 </Typography>
                            {msgs &&
                                Object.values(msgs).map((msg) => {
                                    return (<Msg isLeft={selectedId == msg["from"]} key={msg["from"] + msg['to'] + msg["time"]} message={msg} />);
                                })
                            }
                        </div>
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
    msgs: state.forum.messages.msgs,
    isFetchingMsgs: state.forum.messages.isFetchingMsgs,
});

const mapDispatchToProps = (dispatch) => ({
    // selectEntry: (selectedId) =>{
    //     dispatch(selectEntry(selectedId));
    // },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MsgHistory);

