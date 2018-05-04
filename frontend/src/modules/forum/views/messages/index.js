import React, { Component } from 'react';
import { Grid, Paper, Typography, withStyles, Divider, Input, Button, List, CircularProgress } from 'material-ui';
import MsgEntry from '../../components/msgentry';
import MsgHistory from '../../containers/msghistory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { selectEntry, getMsgEntries, postMsg, getContent, test } from './actions';

const styles = {
    box: {
        outlineWidth: 1,
        // outlineColor: "#00ff00",
        // backgroundColor: "#f0f0f0",
    },
    container: {
        justifyContent: "center",
    },
    history: {
        backgroundColor: "#fafafa",
        display: "flex",
        justifyContent: "flex-end",
        padding: 10,
        height: 500,
    },
    inputpanel: {
        backgroundColor: "#fafafa",
        // justifyContent: "flex-end",
        padding: 15,
        // display: "flex",
        height: 130,
    },
    input: {
        overflowY: "auto",
        // overflowY:"auto",
        overflowX: "hidden",
        height: 100,
        // width:"100%",
        marginRight: -17,
    },
    inputoutter: {
        overflow: "hidden",
        height: 100,
        boxSizing: "content-box",
    },
    send: {
        display: "flex",
        justifyContent: "flex-end",
    },
    list: {
        height: "100%",
        marginRight: -16,
        maxHeight: '100',
        overflowY: 'auto',
    },
    listcontainer: {
        overflow: "hidden",
        height: 700,
        boxSizing: "content-box",
    },
    pending: {
        margin: 100,
    },
}

class Messages extends Component {
    componentWillMount() {
        //TODO: user id
        this.props.getMsgEntries(5, this.props.selectedId);
        // this.
    }

    render() {
        const { classes,  entries, selectedId, isFetchingEntries, postMsg, content, getContent } = this.props;
        const uid = 5;
        return (<Grid container className={classes.container}>
            <Grid item xs={12} sm={10} md={8} lg={8}>
                <div className={classes.box}>
                    <Grid container>
                        <Grid item xs={4} sm={4} md={4} lg={3}>
                            {isFetchingEntries ? <CircularProgress className={classes.pending} /> :
                                entries && entries.length && <div className={classes.listcontainer}>
                                    <List className={classes.list}>
                                        {Object.values(entries).map((entry, index) => {
                                            return (<MsgEntry entry={entry} key={entry.id} />);
                                        })}
                                    </List>
                                </div>}
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={9}>
                            <Typography variant="title">
                                {selectedId}
                            </Typography>
                            <main className={classes.history}>
                                    <MsgHistory />
                            </main>
                            <Divider />
                            <main className={classes.inputpanel}>
                                <div className={classes.inputoutter}>
                                    <div className={classes.input}>
                                        <Input multiline={true} placeholder='请输入内容'
                                            disableUnderline={true} fullWidth={true}
                                            onChange={(event) => {
                                                getContent(event.target.value);
                                            }} value ={content}
                                        />
                                    </div>
                                </div>
                                <div className={classes.send}>
                                    <Button variant="raised" onClick={
                                        (event) => {
                                            event.preventDefault();
                                            postMsg(uid, selectedId, content);
                                            getContent("");
                                            // test(!testval);
                                        }
                                    }>发送</Button>
                                </div>
                            </main>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
        );
    }

    componentWillUnmount() {
        this.props.selectEntry(undefined);
    }
}

Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    testval: state.forum.messages.test,
    entries: state.forum.messages.entries,
    isFetchingEntries: state.forum.messages.isFetchingEntries,
    selectedId: state.forum.messages.selectedId,
    content: state.forum.messages.content,
});

const mapDispatchToProps = (dispatch) => ({
    getMsgEntries: (uid, selectedId) => dispatch(getMsgEntries(uid, selectedId)),
    postMsg: (from, to, content) => {
        dispatch(postMsg(from, to, content));
    },
    getContent: (content) => {
        dispatch(getContent(content));
    },
    selectEntry: (selectedId) => {
        dispatch(selectEntry(selectedId));
    },
    // test: (testvalue) => {
    //     dispatch(test(testvalue));
    // },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Messages);

