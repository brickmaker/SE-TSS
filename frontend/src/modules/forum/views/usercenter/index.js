import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Path } from '../../components/util/Path';
import { MainBody } from '../../components/util/MainBody';
import { Route } from 'react-router-dom';
import { withStyles, Grid, Button, Paper, Tab, Tabs, CircularProgress, Avatar, Typography, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from 'material-ui';
import { requestUserInfo, setFinished, postUserInfo } from './actions';
import { selectEntry } from '../messages/actions';
import moment from 'moment';
import Link from 'react-router-dom/Link';
import PostItem from '../../components/postitem';

const styles = {
    container: {
        justifyContent: "center",
    },
    paper: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 30,
        paddingBottom: 30,
        verticalAlign: "middle",
        minHeight: 700,
    },
    bigAvatar: {
        width: 150,
        height: 150,
        margin: 20,
    },
    gridItem: {
        marginTop: 15,
        marginBottom: 15,
    },
    item: {
        display: "inline-block",
        width: 150,
    },
};

class Usercenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageFile: null,
            isEditing: false,
            imagePreviewUrl: null,
            isDialogOpen: false,
            dialogContent: "",
            newUsername: "",
            newSignature: "",
        };
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentWillMount() {
        this.props.requestUserInfo(this.props.match.params.uid);
    }

    handleImageChange(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        if (file.type.slice(0, 6) !== "image/") {
            this.setState({
                isDialogOpen: true,
                dialogContent: "需选择图片文件",
            });
            return;
        }
        if (file.size > 1000000) {
            this.setState({
                isDialogOpen: true,
                dialogContent: "头像图片大小不得超过1M",
            });
            return;
        }
        reader.onloadend = () => {
            this.setState({
                imageFile: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    handleTextChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { match, classes, isFetching, userInfo, history, selectEntry,
            requestUserInfo, hasFinished, hasSucceded, setFinished, postUserInfo } = this.props;
        const { isEditing, imageFile, imagePreviewUrl, isDialogOpen,
            dialogContent, newUsername, newSignature } = this.state;
        const { avatar, uid, username, signature, replyNum, postNum,
            posts, registrationTime, subscriptionNum } = userInfo;
        //TODO:
        const currentLoginUid = 5;
        var path = {};
        path['settings'] = { "name": `个人中心`, "link": `${match.url}` };

        return (
            <MainBody>
                <Path isMain path={path} />
                <Grid container className={classes.container}>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <Paper className={classes.paper}>
                            {/* {isFetching? <CircularProgress/>
                                :
                                } */}
                            <Grid container>
                                <Grid item xs={6} sm={4} md={3}>
                                    <Avatar alt={username} src={avatar} className={classes.bigAvatar} />
                                </Grid>
                                <Grid item xs={6} sm={8} md={9}>
                                    <div style={{
                                        // backgroundColor: "#f0f0f0",
                                        padding: 20,
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            verticalAlign: "middle",
                                            width: "100%",
                                            marginTop: 10,
                                            marginBottom: 10,
                                        }}>
                                            <Typography variant="title" style={{
                                                display: "inline-block",
                                            }}>{username}</Typography>
                                            <Button variant="raised" color="primary" style={{
                                                display: "inline-block",
                                            }}
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    selectEntry(uid, avatar, username);
                                                    history.push('/forum/messages');
                                                }}
                                            >私信</Button>
                                        </div>
                                        <Typography variant="subheading" style={{
                                            marginTop: 20,
                                            marginBottom: 20,
                                        }}>
                                            {signature}
                                        </Typography>
                                        <Grid container>
                                            <Grid item xs={6} className={classes.gridItem}>
                                                <Typography className={classes.item}>
                                                    回复数
                                        </Typography>
                                                <Typography className={classes.item}>
                                                    {replyNum}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} className={classes.gridItem}>
                                                <Typography className={classes.item}>
                                                    发帖数
                                        </Typography>
                                                <Typography className={classes.item}>
                                                    {postNum}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} className={classes.gridItem}>
                                                <Typography className={classes.item}>
                                                    订阅版块数
                                        </Typography>
                                                <Typography className={classes.item}>
                                                    {subscriptionNum}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6} className={classes.gridItem}>
                                                <Typography className={classes.item}>
                                                    注册时间
                                        </Typography>
                                                <Typography className={classes.item}>
                                                    {moment(registrationTime).format("YYYY-MM-DD HH:mm")}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                {currentLoginUid == uid &&
                                    <Grid item xs={12}>
                                        {!isEditing &&
                                            <Grid container justify="flex-end">
                                                <Button variant="raised" color="primary" style={{ marginLeft: 20, marginRight: 20 }} onClick={(event) => {
                                                    event.preventDefault();
                                                    this.setState({
                                                        isEditing: true,
                                                        newUsername: username,
                                                        newSignature: signature,
                                                        imageFile: null,
                                                        imagePreviewUrl: "",
                                                    });
                                                }}>编辑资料</Button>
                                            </Grid>
                                        }
                                        {isEditing &&
                                            <Grid container style={{ backgroundColor: "#f0f0f0", marginTop: 10, marginBottom: 10 }}>
                                                <Grid item xs={6} sm={4} md={3} >
                                                    <input
                                                        accept="image/*"
                                                        className={classes.input}
                                                        id="raised-button-avatar-file"
                                                        multiple
                                                        type="file"
                                                        style={{
                                                            width: 0,
                                                            height: 0,
                                                            opacity: 0,
                                                            overflow: "hidden",
                                                            position: "absolute",
                                                            zIndex: 1,
                                                        }}
                                                        onChange={this.handleImageChange}
                                                    />
                                                    <label htmlFor="raised-button-avatar-file">
                                                        <Button color="primary" component="span">
                                                            选择本地图片
                                                    </Button>
                                                    </label>
                                                    {imagePreviewUrl &&
                                                        <Avatar alt={username} src={imagePreviewUrl} className={classes.bigAvatar} />
                                                    }
                                                </Grid>
                                                <Grid item xs={6} sm={8} md={9}>
                                                    <div style={{
                                                        // backgroundColor: "#f0f0f0",
                                                        padding: 20,
                                                        marginTop: 21,
                                                        marginBottom: 21,
                                                    }}>
                                                        <TextField
                                                            id="usercenter-name"
                                                            label="昵称"
                                                            // className={classes.textField}
                                                            value={newUsername}
                                                            onChange={this.handleTextChange('newUsername')}
                                                            margin="normal"
                                                            fullWidth
                                                        />
                                                        <TextField
                                                            id="usercenter-sign"
                                                            label="签名档"
                                                            // className={classes.textField}
                                                            value={newSignature}
                                                            onChange={this.handleTextChange('newSignature')}
                                                            margin="normal"
                                                            fullWidth
                                                            multiline
                                                        />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        }
                                        {isEditing &&
                                            <Grid container justify="flex-end">
                                                <Button variant="raised" color="primary" style={{ marginLeft: 20, marginRight: 20 }} onClick={(event) => {
                                                    event.preventDefault();
                                                    let content = "";
                                                    if (newUsername.length < 1) {
                                                        content = "昵称不得为空";
                                                    }
                                                    else if (newUsername.length > 20) {
                                                        content = "昵称长度不得超过20";
                                                    }
                                                    else if (newSignature.length > 100) {
                                                        content = "签名档长度不得超过100";
                                                    }
                                                    if (content) {
                                                        this.setState({
                                                            dialogContent: content,
                                                            isDialogOpen: true,
                                                        });
                                                        return;
                                                    }
                                                    postUserInfo(uid, newUsername, newSignature, imageFile);
                                                    this.setState({ isEditing: false });
                                                }}>确定</Button>
                                                <Button variant="raised" color="secondary" style={{ marginLeft: 20, marginRight: 20 }} onClick={(event) => {
                                                    event.preventDefault();
                                                    this.setState({ isEditing: false });
                                                }}>取消</Button>
                                            </Grid>
                                        }
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    <div style={{
                                        marginTop: 30,
                                        marginBottom: 30,
                                    }}>
                                        <Typography variant="title">
                                            发表的主题
                                        </Typography>
                                        {posts && Object.values(posts).map((post) => {
                                            return (
                                                <div style={{
                                                    marginLeft: 40,
                                                }}>
                                                    <PostItem post={post} />
                                                </div>)
                                        })}
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Dialog open={isDialogOpen}
                    aria-labelledby="forum-usercenter-title-set"
                    aria-describedby="forum-usercenter-description-set"
                    onClose={() => {
                        this.setState({ isDialogOpen: false });
                    }}
                    fullWidth
                >
                    <DialogTitle id="forum-usercenter-title-set" >修改资料</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="forum-usercenter-description-set">
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
                    aria-labelledby="forum-usercenter-title-upload"
                    aria-describedby="forum-usercenter-description-upload"
                    onClose={() => {
                        setFinished(false);
                        requestUserInfo(uid);
                    }}
                    fullWidth
                >
                    <DialogTitle id="forum-usercenter-title-image" >修改资料</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="forum-usercenter-description-image">
                            {hasSucceded ? "成功" : "失败"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={() => { setFinished(false); requestUserInfo(uid); }}>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </MainBody>
        );
    };
}

Usercenter.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    userInfo: state.forum.usercenter.userInfo,
    isFetching: state.forum.usercenter.isFetching,
    hasFinished: state.forum.usercenter.hasFinished,
    hasSucceded: state.forum.usercenter.hasSucceded,
});

const mapDispatchToProps = (dispatch) => ({
    requestUserInfo: (uid) => { dispatch(requestUserInfo(uid)); },
    selectEntry: (selectedId, selectedAvatar, selectedUsername) => {
        dispatch(selectEntry(selectedId, selectedAvatar, selectedUsername));
    },
    setFinished: (finished) => {
        dispatch(setFinished(finished));
    },
    postUserInfo: (uid, newUsername, newSignature, imageFile) => {
        dispatch(postUserInfo(uid, newUsername, newSignature, imageFile));
    }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Usercenter);

