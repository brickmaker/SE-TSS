import React, { Component } from 'react';
import { Grid, Typography, Paper, Avatar, withStyles, Button } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { selectEntry, getMsgs } from '../../views/messages/actions';

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
        const { classes, selectedId, selectEntry, getMsgs} = this.props;
        const  uid = 5;
        // TODO: uid
        return (
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button className={selectedId == id ? classes.selectedEntry : classes.entry}
                        onClick={(event) => { event.preventDefault(); 
                            selectEntry(id);
                            getMsgs(uid, id); 
                             }}
                        fullWidth={true}>
                        <Avatar>
                            {username[0]}
                        </Avatar>
                        <div className={classes.item}>
                            <Typography variant='title' align="left">
                                {username}
                            </Typography>
                            <Typography variant='body1' align="left">
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
});

const mapDispatchToProps = (dispatch) => ({
    selectEntry: (selectedId) => { dispatch(selectEntry( selectedId)) },
    getMsgs: (id1, id2) => {
        dispatch(getMsgs(id1, id2));
    }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MsgEntry);

