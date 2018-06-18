import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { List, CircularProgress, withStyles } from 'material-ui';
import MsgEntry from '../../components/msgentry';
import { getMsgEntries,selectEntry } from '../../views/messages/actions';
import moment from 'moment';


const styles = {
    listcontainer: {
        overflow: "hidden",
        height: 600,
        boxSizing: "content-box",
    },
    outterpending: {
        display: "flex",
        justifyContent: "center",
    },
    pending: {
        margin: 100,
    },
    list: {
        height: "100%",
        marginRight: -16,
        maxHeight: '100',
        overflowY: 'auto',
    },
};

class MsgEntryPanel extends Component {
    componentWillMount() {
        //TODO: user id
        this.props.getMsgEntries(5, this.props.selectedId, this.props.pageSize);
        console.log("sss", this.props.selectedId, this.props.pageSize);
    }

    render() {
        const { classes, isFetchingEntries, selectedId, entries } = this.props;
        return (
            <div>
                {isFetchingEntries ?
                    <div className={classes.outterpending}>
                        <CircularProgress className={classes.pending} />
                    </div>
                    :
                    entries && entries.length && <div className={classes.listcontainer}>
                        <List className={classes.list}>
                            {Object.values(entries).map((entry, index) => {
                                return (<MsgEntry entry={entry} key={entry.id} />);
                            })}
                        </List>
                    </div>
                }

            </div>
        )
    }
};


MsgEntryPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    // testval: state.forum.messages.test,
    entries: state.forum.messages.entries,
    isFetchingEntries: state.forum.messages.isFetchingEntries,
    // selectedId: state.forum.messages.selectedId,
    selectedId: state.forum.forumpersist.selectedId,
    pageSize: state.forum.messages.pageSize,
});

const mapDispatchToProps = (dispatch) => ({
    getMsgEntries: (uid, selectedId, pageSize) => dispatch(getMsgEntries(uid, selectedId, pageSize)),
    selectEntry: (selectedId) => {
        dispatch(selectEntry(selectedId));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(MsgEntryPanel);

