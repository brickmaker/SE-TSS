import React, { Component } from 'react';
import { Grid, Paper, Typography, withStyles, Divider, Input, Button, List } from 'material-ui';
import MsgEntry from '../../components/msgentry';
import MsgHistory from '../../containers/msghistory';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { selectEntry } from './actions';

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
}

class Messages extends Component {
    render() {
        const { classes, entries, messages, selectedId } = this.props;
        return (<Grid container className={classes.container}>
            <Grid item xs={12} sm={10} md={8} lg={8}>
                <div className={classes.box}>
                    <Grid container>
                        <Grid item xs={4} sm={4} md={4} lg={3}>
                            <div className={classes.listcontainer}>
                                <List className={classes.list}>
                                    {Object.values(entries).map((entry, index) => {
                                        console.log(entry);
                                        return (<MsgEntry entry={entry} key={entry.id} />);
                                    })}
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={8} sm={8} md={8} lg={9}>
                        <Typography variant="title">
                                    {selectedId}
                        </Typography>
                            <main className={classes.history}>
                                <MsgHistory/>
                            </main>
                            <Divider />
                            <main className={classes.inputpanel}>
                                <div className={classes.inputoutter}>
                                    <div className={classes.input}>
                                        <Input multiline={true} placeholder='请输入内容'
                                            disableUnderline={true} fullWidth={true}
                                        />
                                    </div>
                                </div>
                                {/* <textarea className={classes.input}>
                                fff</textarea> */}
                                <div className={classes.send}>
                                TODO: 发送后刷新所有数据，selectedID不变
                                    <Button variant="raised">发送</Button>
                                </div>
                            </main>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
        );
    }
}


Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    entries: state.forum.messages.entries,
    selectedId: state.forum.messages.selectedId,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Messages);

