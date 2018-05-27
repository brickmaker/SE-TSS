import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Button, Grid, Input, Card, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from 'material-ui';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { MainBody } from '../../components/util/MainBody';
import { Path } from '../../components/util/Path';
import { postAnnc, setHasFinished, getSectionNames } from '../announcements/actions';

const styles = {

    editorStyle: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        height: 300
    },
    input: {
        overflowY: "auto",
        overflowX: "auto",
        height: 100,
        // width:"100%",
        // marginRight: -17,
    },
    inputoutter: {
        // overflow: "hidden",
        height: 100,
        width: "100%",
        // boxSizing: "content-box",
        // backgroundColor: '#ffffff',
    },
};


class AnncEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // editorState: EditorState.createEmpty(),
            content: "",
            title: "",
            isDialogOpen: false,
            dialogContent: "",
        };
        // this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    componentWillMount() {
        const { collegeid, courseid, teacherid } = this.props.match.params;
        this.props.getSectionNames([collegeid, courseid, teacherid]);
    }

    // onEditorStateChange(editorState) {
    //     this.setState({
    //         editorState,
    //     });
    // };
    render() {
        const { editorState, content, title, isDialogOpen, dialogContent } = this.state;
        const { classes, postAnnc, hasFinished, isSuccess, setHasFinished, sectionNames } = this.props;
        const { collegeid, courseid, teacherid } = this.props.match.params;
        // console.log("match", this.props.match);
        //TODO: get corresponding names by ids
        const path = {};
        if (sectionNames) {
            path["college"] = { "name": sectionNames[0], "link": `/forum/${collegeid}` };
            path["course"] = { "name": sectionNames[1], "link": `/forum/${collegeid}/${courseid}` };
            path["teacher"] = { "name": sectionNames[2], "link": `/forum/${collegeid}/${courseid}/${teacherid}` };
        }
        path["annceditor"] = { "name": "新公告", "link": `/forum/annceditor/${collegeid}/${courseid}/${teacherid}` };
        return (
            <MainBody>
                <Path path={path} />
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <div style={{
                            paddingBottom: 80,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: "100%",
                        }}>
                            <Card style={{ backgroundColor: '#ffffff', paddingLeft: 20, paddingTop: 5, paddingBottom: 5, margin: 10, width: "100%" }}>
                                <Input fullWidth disableUnderline placeholder="请输入公告标题"
                                    inputProps={{
                                        style: {
                                            width: '100%',
                                            fontSize: 18,
                                            height: 40,
                                        }
                                    }}
                                    value={title} onChange={(event) => {
                                        event.preventDefault();
                                        this.setState({ title: event.target.value });
                                    }} />
                            </Card>
                            <Card
                                style={{
                                    paddingLeft: 20,
                                    // paddingRight: 20,
                                    height: 400,
                                    width: "100%",
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    margin: 10,

                                }}
                            >
                                <Input disableUnderline placeholder="请输入公告内容" multiline
                                    fullWidth
                                    inputProps={{
                                        style: {
                                            // margin: '10px 0',
                                            // border: 0,
                                            width: "100%",
                                            height: 400,
                                        }
                                    }}
                                    value={content} onChange={(event) => {
                                        event.preventDefault();
                                        this.setState({ content: event.target.value });
                                    }} />
                            </Card>
                            <Button
                                style={{ margin: 20 }}
                                color={'primary'}
                                variant={'raised'}
                                size={'large'}
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (title.length == 0) {
                                        this.setState({
                                            dialogContent: "标题不得为空",
                                            isDialogOpen: true,
                                        });
                                    }
                                    else if (title.length > 50) {
                                        this.setState({
                                            dialogContent: "标题长度不得超过50",
                                            isDialogOpen: true,
                                        });
                                    }
                                    else if (content.length > 300) {
                                        this.setState({
                                            dialogContent: "内容长度不得超过300",
                                            isDialogOpen: true,
                                        });
                                    }
                                    else {
                                        postAnnc(title, content, collegeid, courseid, teacherid);
                                        this.setState({
                                            title: "",
                                            content: "",
                                        });
                                    }
                                }}
                            >发布</Button>
                            <Dialog open={isDialogOpen}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                onClose={() => {
                                    this.setState({ isDialogOpen: false });
                                }}
                                fullWidth
                            >
                                <DialogTitle id="alert-dialog-title" >发布公告</DialogTitle>
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
                            <Dialog open={hasFinished}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                onClose={() => {
                                    setHasFinished(false);
                                }}
                                fullWidth
                            >
                                <DialogTitle id="alert-dialog-title" >发布公告</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {isSuccess ? "发布成功" : "发布失败"}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button color='primary' onClick={() => {
                                        setHasFinished(false);
                                    }}>
                                        确定
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Grid>
                </Grid>
            </MainBody>
        );
    };
}

AnncEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    hasFinished: state.forum.annc.hasFinished,
    isSuccess: state.forum.annc.isSuccess,
    sectionNames: state.forum.annc.sectionNames,
});

const mapDispatchToProps = (dispatch) => ({
    postAnnc: (title, content, collegeid, courseid, teacherid) => {
        dispatch(postAnnc(title, content, collegeid, courseid, teacherid));
    },
    setHasFinished: (hasFinished) => {
        dispatch(setHasFinished(hasFinished));
    },
    getSectionNames: (sectionids) => {
        dispatch(getSectionNames(sectionids));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(AnncEditor);

