import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid } from 'material-ui';
import { Flag } from '@material-ui/icons';
import { SectionText, SectionTitle } from "../../components/util/SectionTitle"

const styles = {
    container: {
        marginTop: 20,
        // marginBottom: 20,
    },
};

class UserStatusPanel extends Component {
    render() {
        const { classes, userStates } = this.props;
        return (
            <div className={classes.container}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>用户名</TableCell>
                                <TableCell numeric>发帖数</TableCell>
                                <TableCell>最后登录时间</TableCell>
                                <TableCell>用户类别</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userStates.map((userState) => {
                                return (
                                    <TableRow>
                                        <TableCell>{userState.username}</TableCell>
                                        <TableCell numeric>{userState.replyNum}</TableCell>
                                        <TableCell>{userState.lastLoginTime}</TableCell>
                                        <TableCell>{userState.type}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
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
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(UserStatusPanel);

