import React, { Component } from 'react';
import { Grid, Paper, Typography, withStyles, Divider, Input, Button, List, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui';
import MsgEntry from '../../components/msgentry';
import MsgHistory from '../../containers/msghistory';
import MsgEntryPanel from '../../containers/msgentrypanel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { selectEntry, getMsgEntries, postMsg, getContent, test } from './actions';
import { MainBody } from '../../components/util/MainBody';
import { Path } from '../../components/util/Path';

const styles = {
    box: {
        outlineWidth: 1,
        // margin: 30,
        // outlineColor: "#00ff00",
        // backgroundColor: "#f0f0f0",
    },
    container: {
        justifyContent: "center",
    },
    history: {
        backgroundColor: "#fcfcfc",
        display: "flex",
        justifyContent: "flex-end",
        padding: 10,
        height: 400,
    },
    inputpanel: {
        backgroundColor: "#fcfcfc",
        // justifyContent: "flex-end",
        padding: 15,
        // display: "flex",
        height: 130,
    },
    input: {
        overflowY: "auto",
        overflowX: "auto",
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
    title: {
        margin: 10,
    },
}

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            dialogContent: "",
        };
    }

    componentWillMount() {
        //TODO: user id
        // this.props.getMsgEntries(5, this.props.selectedId, this.props.pageSize);
    }

    render() {
        const { classes, entries, selectedId, selectedUsername, isFetchingEntries, isFetchingMsgs, postMsg, content,
            getContent, isEntering, pageSize } = this.props;
        const path = { 'messages': { 'name': '消息', 'link': '/forum/messages' } };
        const { isDialogOpen, dialogContent } = this.state;
        //TODO: uid
        const uid = 5;
        return (
            // <div>
                <MainBody>
                    <Path isMain path={path} />
                    <Grid container className={classes.container}>
                        <Grid item xs={12} sm={12} md={10} lg={8}>
                            <div className={classes.box}>
                                <Paper>
                                    <Grid container>
                                        <Grid item xs={4} sm={4} md={4} lg={3}>
                                            <MsgEntryPanel />
                                        </Grid>
                                        <Grid item xs={8} sm={8} md={8} lg={9}>
                                            <Typography align="center" variant="subheading" className={classes.title}>
                                                与 {selectedUsername} 的私信
                                </Typography>
                                            <main className={classes.history}>
                                                {
                                                    // isFetchingMsgs ?
                                                    isEntering ?
                                                        <div className={classes.outterpending}>
                                                            <CircularProgress className={classes.pending} />
                                                        </div>
                                                        :
                                                        <MsgHistory key={selectedId} />
                                                }
                                            </main>
                                            <Divider />
                                            <main className={classes.inputpanel}>
                                                <div className={classes.inputoutter}>
                                                    <div className={classes.input}>
                                                        <Input multiline={true} placeholder='请输入内容'
                                                            inputProps={{ style: { width: "100%", height: 100 } }}
                                                            disableUnderline={true} fullWidth={true}
                                                            onChange={(event) => {
                                                                getContent(event.target.value);
                                                            }} value={content}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={classes.send}>
                                                    <Button variant="raised" onClick={
                                                        (event) => {
                                                            event.preventDefault();
                                                            if (!content || content.length == 0) {
                                                                this.setState({ dialogContent: "消息内容不得为空", isDialogOpen: true });
                                                            }
                                                            else if (content.length > 500) {
                                                                this.setState({ dialogContent: "消息长度不得超过500", isDialogOpen: true });
                                                            }
                                                            else {
                                                                postMsg(uid, selectedId, content, pageSize);
                                                                getContent("");
                                                            }
                                                        }
                                                    }>发送</Button>
                                                </div>
                                                <Dialog open={isDialogOpen}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    onClose={() => {
                                                        this.setState({ isDialogOpen: false });
                                                    }}
                                                    fullWidth
                                                >
                                                    <DialogTitle id="alert-dialog-title" >私信</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            {dialogContent}
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button color='primary' onClick={() => { this.setState({ isDialogOpen: false }); }}>
                                                            确定
                                                    </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </main>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        </Grid>
                    </Grid>
                </MainBody>
            // </div>
        );
    }

    componentWillUnmount() {
        this.props.selectEntry(undefined, undefined, undefined);
    }
}

Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    testval: state.forum.messages.test,
    entries: state.forum.messages.entries,
    isFetchingEntries: state.forum.messages.isFetchingEntries,
    isFetchingMsgs: state.forum.messages.isFetchingMsgs,
    selectedId: state.forum.forumpersist.selectedId,
    // selectedId: state.forum.messages.selectedId,
    // selectedUsername: state.forum.messages.selectedUsername,
    selectedUsername: state.forum.forumpersist.selectedUsername,
    content: state.forum.messages.content,
    isEntering: state.forum.messages.isEntering,
    pageSize: state.forum.messages.pageSize,
});

const mapDispatchToProps = (dispatch) => ({
    getMsgEntries: (uid, selectedId, pageSize) => dispatch(getMsgEntries(uid, selectedId, pageSize)),
    postMsg: (from, to, content, pageSize) => {
        dispatch(postMsg(from, to, content, pageSize));
    },
    getContent: (content) => {
        dispatch(getContent(content));
    },
    selectEntry: (selectedId, selectedAvatar, selectedUsername) => {
        dispatch(selectEntry(selectedId, selectedAvatar, selectedUsername));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Messages);

