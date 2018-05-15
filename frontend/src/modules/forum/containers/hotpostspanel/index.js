import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, TablePagination, TableFooter, TextField, InputLabel, Select, MenuItem, FormControl, Button } from 'material-ui';
import { Flag } from '@material-ui/icons';
import { SectionText, SectionTitle } from "../../components/util/SectionTitle"
import Link from 'react-router-dom/Link';

const styles = {
    container: {
        marginTop: 20,
        // marginBottom: 20,
    },
    link: {
        textDecoration: 'none',
        color: "#000000",
    },
};

class HotPostsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeName: "",
            courseName: "",
            teacherName: "",
            name: undefined,
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { classes, hotPosts } = this.props;
        return (
            <div className={classes.container}>
                <Paper>
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="college">学院</InputLabel>
                            <Select
                                value={this.state.collegeName}
                                onChange={this.handleChange}
                                inputProps={{
                                    // collegeName: "college",
                                    name: 'collegeName',
                                    id: 'college',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"计算机学院"}>计算机学院</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="course">课程</InputLabel>
                            <Select
                                value={this.state.courseName}
                                onChange={this.handleChange}
                                inputProps={{
                                    // collegeName: "college",
                                    name: 'courseName',
                                    id: 'course',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"软件工程"}>软件工程</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="teacher">教师</InputLabel>
                            <Select
                                value={this.state.teacherName}
                                onChange={this.handleChange}
                                inputProps={{
                                    // collegeName: "college",
                                    name: 'teacherName',
                                    id: 'teacher',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"王章野"}>王章野</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                    <Button color="primary" variant="raised"
                    >统计</Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>标题</TableCell>
                                <TableCell>版块</TableCell>
                                <TableCell>作者</TableCell>
                                <TableCell>发表时间</TableCell>
                                <TableCell>最后回复时间</TableCell>
                                <TableCell numeric>回复数</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hotPosts.map((hotPost) => {
                                var link;
                                const sectionPath = {};
                                const path = hotPost.path;
                                if (path["college"]) {
                                    sectionPath["college"] = { "name": path["college"]["name"], "link": `/forum/${path["college"]["id"]}` };
                                    link = sectionPath["college"]["link"];
                                };
                                if (path["course"]) {
                                    sectionPath["course"] = { "name": path["course"]["name"], "link": `/forum/${path["college"]["id"]}/${path["course"]["id"]}` };
                                    link = sectionPath["course"]["link"];
                                };
                                if (path["teacher"]) {
                                    sectionPath["teacher"] = { "name": path["teacher"]["name"], "link": `/forum/${path["college"]["id"]}/${path["course"]["id"]}/${path["teacher"]["id"]}` };
                                    link = sectionPath["teacher"]["link"];
                                };
                                return (<TableRow>
                                    <TableCell>
                                        <Link to={`/forum/p/${hotPost.postid}`} className={classes.link}>

                                            {hotPost.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={sectionPath["college"]["link"]} className={classes.link}>
                                            {sectionPath['college']["name"]} </Link>
                                        <Link to={sectionPath["course"]["link"]} className={classes.link}>
                                            > {sectionPath['course']["name"]} </Link>
                                        <Link to={sectionPath["teacher"]["link"]} className={classes.link}>
                                            > {sectionPath['teacher']["name"]} </Link>

                                    </TableCell>
                                    <TableCell>{hotPost.author.username}</TableCell>
                                    <TableCell>{hotPost.time}</TableCell>
                                    <TableCell>{hotPost.lastReplyTime}</TableCell>
                                    <TableCell numeric>{hotPost.replyNum}</TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                        {/* <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={hotPosts.length}
                                    // rowsPerPage={rowsPerPage}
                                    page={1}
                                    // onChangePage={this.handleChangePage}
                                    // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    // ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter> */}
                    </Table>
                </Paper>
            </div>

        );
    };
}


HotPostsPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    hotPosts: state.forum.management.hotPosts,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(HotPostsPanel);

