import React, { Component } from 'react';
import { Card, Grid, Avatar, CardContent, Typography, withStyles, Button, CircularProgress } from 'material-ui';
import Msg from '../../components/msg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { getMsgs, setMsgEnd } from '../../views/messages/actions';

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
    outterpending: {
        display: "flex",
        justifyContent: "center",
    },
    pending: {
        margin: 100,
    },
}

class MsgHistory extends Component {
    componentDidMount() {
    //TODO: modules/forum/index.js minHeight: '100vh', causing the scrolling position bug.
        this.msgEnd.scrollIntoView();
    }

    render() {
        const { selectedId, msgs, classes, isFetchingMsgs, noMoreMsgs,
            currentPageNum, pageSize, getMsgs, setMsgEnd } = this.props;
            console.log("pagesize", pageSize);
        // TODO: uid
        const uid = 5;
        return (
            <Grid container className={classes.history}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {
                        isFetchingMsgs ?
                            <div className={classes.outterpending}>
                                <CircularProgress className={classes.pending} />
                            </div>
                            :
                            noMoreMsgs ?
                                <Typography align="center">
                                    已无更多消息
                            </Typography>
                                :
                                <Typography align="center" className={classes.more}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        getMsgs(uid, selectedId, currentPageNum + 1, pageSize);
                                    }}
                                >
                                    更多消息
                                 </Typography>
                    }
                    <div>
                        {msgs &&
                            Object.values(msgs).map((msg) => {
                                return (<Msg isLeft={selectedId ==msg.from.id} key={msg.from.id + msg.to.id + msg["time"]} message={msg} />);
                            })
                        }
                    </div>
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.msgEnd = el; }}>
                    </div>
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
    currentPageNum: state.forum.messages.currentPageNum,
    pageSize: state.forum.messages.pageSize,
    noMoreMsgs: state.forum.messages.noMoreMsgs,
});

const mapDispatchToProps = (dispatch) => ({
    getMsgs: (uid1, uid2, nextPageNum, pageSize) => {
        dispatch(getMsgs(uid1, uid2, nextPageNum, pageSize));
    },
    setMsgEnd: (msgEnd) => {
        dispatch(setMsgEnd(msgEnd));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MsgHistory);

