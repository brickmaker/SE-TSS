import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { List, CircularProgress, withStyles, Card, ListItem, ListItemText, Avatar, Typography } from 'material-ui';
import { getNewMsgs, selectEntry } from '../../views/messages/actions';

const styles = {
};

class NewMsgPanel extends Component {
    componentWillMount() {
        //TODO: uid
        this.props.getNewMsgs(5);
        this.props.selectEntry(2);
    }

    render() {
        const { classes, newMsgs, isFetchingNewMsgs, selectEntry } = this.props;
        return (
            <Card style={{ marginTop: 10, marginBottom: 30 }}>
                {isFetchingNewMsgs ? <CircularProgress />
                    :
                    <List dense>
                        {newMsgs.map((msg) => {
                            return (
                                <ListItem button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        selectEntry(msg['from']['id']);
                                        window.location.href = `/forum/messages`;
                                    }}
                                >
                                    <Avatar>{msg["from"]['username'][0]}</Avatar>
                                    <ListItemText primary={msg['from']['username']} secondary={msg["content"]} />
                                </ListItem>
                            )
                        })}
                    </List>
                }
            </Card>
        )
    }
};


NewMsgPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    newMsgs: state.forum.messages.newMsgs,
    isFetchingNewMsgs: state.forum.messages.isFetchingNewMsgs,
    // entries: state.forum.messages.entries,
    // isFetchingEntries: state.forum.messages.isFetchingEntries,
    // selectedId: state.forum.messages.selectedId,
    // pageSize: state.forum.messages.pageSize,
});

const mapDispatchToProps = (dispatch) => ({
    selectEntry: (selectedId) => {
        dispatch(selectEntry(selectedId));
    },
    getNewMsgs: (uid) => {
        // console.log("newmsgs", uid);
        dispatch(getNewMsgs(uid));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(NewMsgPanel);
