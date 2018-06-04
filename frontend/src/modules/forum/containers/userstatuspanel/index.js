import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button, CircularProgress, TableFooter, TablePagination, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle } from 'material-ui';
import { Flag } from '@material-ui/icons';
import { SectionText, SectionTitle } from "../../components/util/SectionTitle"
// import { Input } from '@material-ui/icons/es';
import { Input } from 'material-ui';
import { PageNums } from '../../components/util/PageNums';
import { getUserStates } from '../../views/management/actions';


const styles = {
    container: {
        marginTop: 20,
        // marginBottom: 20,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
    },
    item: {
        minWidth: 120,
        marginLeft: 10,
        marginRight: 10,
        // display: "inline-block",
    },
    selectBar: {
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        // paddingTop: 20,
        display: 'flex',
        justifyContent: "space-between",
        verticalAlign: 'middle',
    },
    pageNums: {
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
    },
    button: {
        display: "inline-block",
        // display: "inline-flex",
        flexGrow: 1,
        maxHeight: 20,
        minWidth: 120,
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        display: "inline-block",
        // display: "inline-flex",
        flexGrow: 3,
        // maxHeight: 20,
        // minWidth: 120,
        // marginTop: 30,
        // marginLeft: 10,
        // marginRight: 10,
    },
};

class UserStatusPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pageSize: 5,
            pageNum: 0,
            isDialogOpen: false,
            dialogContent: "",
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes, userStates, getUserStates, isFetchingUserStates } = this.props;
        const { username, pageSize, pageNum, isDialogOpen, dialogContent } = this.state;
        return (
            <div className={classes.container}>
                <Paper style={{ paddingBottom: 10 }}>
                    <div className={classes.selectBar}>
                        <div  className={classes.input}>
                            <TextField
                                label="用户名"
                                name="username"
                                // className={classes.textField}
                                value={this.state.name}
                                onChange={this.handleChange}
                                margin="normal"
                                autoComplete='off'
                                className={classes.item}
                                // fullWidth
                                inputProps={{ style: { width: "100%" } }}
                            />
                        </div>
                        <div>
                            <Button color="primary" variant="raised"
                                className={classes.button}
                                onClick={(event) => {
                                    // console.log("management userstate", username);
                                    event.preventDefault();
                                    if (!username || username.length == 0) {
                                        this.setState({ dialogContent: "用户名不得为空", isDialogOpen: true });
                                    }
                                    else if (username.length > 20) {
                                        this.setState({ dialogContent: "用户名长度不得超过20", isDialogOpen: true });
                                    }
                                    else getUserStates(username);
                                }}
                            >统计</Button>
                            <Dialog open={isDialogOpen}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                onClose={() => {
                                    this.setState({ isDialogOpen: false });
                                }}
                                fullWidth
                            >
                                <DialogTitle id="alert-dialog-title" >用户发帖统计</DialogTitle>
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
                        </div>
                    </div>
                    {
                        // isFetchingUserStates? <CircularProgress/>:
                        userStates &&
                        <div>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>用户名</TableCell>
                                        <TableCell numeric>回复数</TableCell>
                                        <TableCell numeric>发帖数</TableCell>
                                        <TableCell>用户类别</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userStates.slice(pageSize * pageNum, pageSize * pageNum + pageSize).map((userState) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{userState.username}</TableCell>
                                                <TableCell numeric>{userState.replyNum}</TableCell>
                                                <TableCell numeric>{userState.postNum}</TableCell>
                                                <TableCell>{userState.type}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            colSpan={5}
                                            count={userStates.length}
                                            rowsPerPage={pageSize}
                                            page={pageNum}
                                            onChangePage={
                                                (event, pageNum) => {
                                                    this.setState({
                                                        pageNum: pageNum,
                                                    });
                                                }
                                            }
                                            onChangeRowsPerPage={(event) => {
                                                this.setState({ pageSize: event.target.value });
                                            }}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                            {/* <div
                                className={classes.pageNums}
                            >
                                <PageNums pageNum={8} currPage={1}
                                    clickPage={(event) => {
                                        const page = parseInt(event.target.innerText);
                                        // window.location.href = `/forum/search/${searchType}/${query}/${page}`
                                    }
                                    } />
                            </div> */}
                        </div>
                    }
                </Paper>
            </div>

        );
    };
}


UserStatusPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    userStates: state.forum.management.userStates,
    isFetchingUserStates: state.forum.management.isFetchingUserStates,
});

const mapDispatchToProps = (dispatch) => ({
    getUserStates: (username) => {
        dispatch(getUserStates(username));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(UserStatusPanel);

