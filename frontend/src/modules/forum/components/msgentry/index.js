import React, { Component } from 'react';
import { Grid, Typography, Paper, Avatar, withStyles, Button } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { selectEntry, getMsgs, clearMsgs } from '../../views/messages/actions';

const styles = {
    entry: {
        display: "flex",
        color: "primary",
        backgroundColor: "inherit",
        justifyContent: "flex-start",
    },
    selectedEntry: {
        display: "flex",
        color: "primary",
        backgroundColor: "#e0e0e0",
        justifyContent: "flex-start",
    },
    item: {
        display: "inline-block",
        color: "inherit",
        margin: 10,
    },
};

class MsgEntry extends Component {
    render() {
        const { avatar, username, lastMsgContent, id } = this.props.entry;
        const { classes, selectedId, selectEntry, getMsgs, pageSize, clearMsgs} = this.props;
        // TODO: uid
        const  uid = 5;
        return (
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button className={selectedId == id ? classes.selectedEntry : classes.entry}
                        onClick={(event) => { event.preventDefault(); 
                            selectEntry(id, avatar, username);
                            clearMsgs();
                            getMsgs(id, 1, pageSize); 
                             }}
                        fullWidth={true}>
                        <Avatar alt={username} src={avatar}>
                        </Avatar>
                        <div className={classes.item}>
                            <Typography variant='subheading' align="left">
                                {username}
                            </Typography>
                            <Typography variant='caption' align="left">
                                {lastMsgContent}
                            </Typography>
                        </div>
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

MsgEntry.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    selectedId: state.forum.messages.selectedId,
    pageSize: state.forum.messages.pageSize,
});

const mapDispatchToProps = (dispatch) => ({
    selectEntry: (selectedId,selectedAvatar, selectedUsername) => { 
        dispatch(selectEntry( selectedId, selectedAvatar, selectedUsername)); 
    },
    getMsgs: (uid, nextPageNum, pageSize) => {
        dispatch(getMsgs(uid, nextPageNum, pageSize));
    },
    clearMsgs:()=>{
        dispatch(clearMsgs());
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MsgEntry);

