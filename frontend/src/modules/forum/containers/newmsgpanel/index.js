import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { List, CircularProgress, withStyles, Card, ListItem, ListItemText, Avatar, Typography } from 'material-ui';
import { getNewMsgs, selectEntry } from '../../views/messages/actions';
import { ROOT_URL } from '../../configs/config';
const styles = {
};

class NewMsgPanel extends Component {
    componentWillMount() {
        //TODO: uid
        this.props.getNewMsgs(5, 5);
        // this.props.selectEntry(2);
    }
    changeid(id, changeurl) {
        this.props.selectEntry(id);

    }
    render() {
        const { classes, newMsgs, isFetchingNewMsgs, selectEntry } = this.props;
        return (
            <Card style={{ marginTop: 10, marginBottom: 30 }}>
                {isFetchingNewMsgs ? <CircularProgress />
                    :
                    newMsgs && <List dense>
                        {newMsgs.map((msg) => {
                            return (
                                <ListItem button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        selectEntry(msg.from.id, msg.from.avatar, msg.from.username);
                                        this.props.history.push(`/forum/messages`);
                                    }}
                                >
                                    <Avatar alt={msg.from.username} src={`${ROOT_URL}${msg.from.avatar}`}></Avatar>
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
});

const mapDispatchToProps = (dispatch) => ({
    selectEntry: (selectedId, selectedAvatar, selectedUsername) => {
        dispatch(selectEntry(selectedId, selectedAvatar, selectedUsername));
    },
    getNewMsgs: (uid, pageSize) => {
        dispatch(getNewMsgs(uid, pageSize));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(NewMsgPanel);

