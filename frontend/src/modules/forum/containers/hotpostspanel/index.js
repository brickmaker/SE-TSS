
import 'rc-calendar/assets/index.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, TablePagination, TableFooter, TextField, InputLabel, Select, MenuItem, FormControl, Button, CircularProgress } from 'material-ui';
import { Flag } from '@material-ui/icons';
import { SectionText, SectionTitle } from "../../components/util/SectionTitle"
import Link from 'react-router-dom/Link';
import { PageNums } from '../../components/util/PageNums';
import { getColleges, getCourseList, getTeachers, getHotPosts } from '../../views/management/actions';

// import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
// import DatePicker from 'rc-calendar/lib/Picker';
// import MonthPicker from '../../components/monthpicker';
// import WeekPicker from '../../components/weekpicker';
import TimeRangePicker from "../../components/timerangepicker";

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

// const format = 'YYYY-MM';
// const cn = true;

const now = moment();
// if (cn) {
//     now.locale('zh-cn').utcOffset(8);
// } else {
//     now.locale('en-gb').utcOffset(0);
// }

// const defaultCalendarValue = now.clone();
// defaultCalendarValue.add(-1, 'month');


// function onStandaloneSelect(value) {
//     console.log('month-calendar select', (value && value.format(format)));
// }

// function onStandaloneChange(value) {
//     console.log('month-calendar change', (value && value.format(format)));
// }

// function disabledDate(value) {
//     return value.year() > now.year() ||
//         value.year() === now.year() && value.month() > now.month();
// }

// function onMonthCellContentRender(value) {
//     // console.log('month-calendar onMonthCellContentRender', (value && value.format(format)));
//     return `${value.month() + 1}月`;
// }


const styles = {
    container: {
        marginTop: 20,
        paddingBottom: 20,
        // marginBottom: 20,
    },
    link: {
        textDecoration: 'none',
        color: "#000000",
    },
    item: {
        minWidth: 120,
        marginLeft: 10,
        marginRight: 10,
        // display: "inline-block",
    },
    button: {
        maxHeight: 20,
        minWidth: 120,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    selectBar: {
        marginLeft: 20,
        // marginTop: 40,
        // marginBottom: 20,
        marginRight: 20,
        paddingBottom:20,
        paddingTop: 20,
        display: 'flex',
        justifyContent: "space-between",
        // verticalAlign: 'middle',
    },
    pageNums: {
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
    },
};

class HotPostsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collegeid: "",
            courseid: "",
            teacherid: "",
            year: "",
            week: "",
            month: "",
            pageNum: 0,
            pageSize: 25,
            date: new Date(),
        };
    }

    componentWillMount() {
        this.props.getColleges();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {
        const { classes, hotPosts, isFetchingHotPosts, collegeItems, courseItems, teacherItems, getCourseList, getTeachers, getHotPosts, startTime, endTime} = this.props;
        const { collegeid, courseid, teacherid, year, week, month, pageNum, pageSize } = this.state;
        return (
            <div className={classes.container}>
                <Paper style={{ paddingBottom: 10 }}>
                    <div className={classes.selectBar}>
                        <div  >
                            <form className={classes.root} autoComplete="off">
                                <FormControl className={classes.item}>
                                    <InputLabel htmlFor="college">学院</InputLabel>
                                    <Select
                                        value={this.state.collegeid}
                                        onChange={(event) => {
                                            this.setState({
                                                [event.target.name]: event.target.value,
                                                'courseid': "",
                                                'teacherid': "",
                                            });
                                            getCourseList(event.target.value);
                                        }}
                                        inputProps={{
                                            name: 'collegeid', id: 'college',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {collegeItems &&
                                            Object.values(collegeItems).map((college) => {
                                                return <MenuItem value={college.id}>{college.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.item}>
                                    <InputLabel htmlFor="course">课程</InputLabel>
                                    <Select
                                        value={this.state.courseid}
                                        onChange={(event) => {
                                            this.setState({
                                                [event.target.name]: event.target.value,
                                                "teacherid": "",
                                            });
                                            getTeachers(collegeid, event.target.value);
                                        }}
                                        inputProps={{
                                            name: 'courseid', id: 'course',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {courseItems &&
                                            Object.values(courseItems).map((course) => {
                                                return (<MenuItem value={course.id}>{course.name}</MenuItem>)
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.item}>
                                    <InputLabel htmlFor="teacher">教师</InputLabel>
                                    <Select
                                        value={this.state.teacherid}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'teacherid', id: 'teacher',
                                        }}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {teacherItems &&
                                            Object.values(teacherItems).map((teacher) => {
                                                return (<MenuItem value={teacher.id}>{teacher.name}</MenuItem>)
                                            })}
                                    </Select>
                                </FormControl>
                                {/* <MonthPicker defaultValue={now} /> */}
                                {/* <WeekPicker defaultValue={now} /> */}
                                <TimeRangePicker defaultValue={now}/>
                            </form>
                        </div>
                        <div style={{ textJustify: "right" }}>

                            <Button color="primary" variant="raised"
                                className={classes.button}
                                onClick={(event) => {
                                    event.preventDefault();
                                    getHotPosts(collegeid, courseid, teacherid, startTime, endTime);
                                }}
                            >统计</Button>
                        </div>
                    </div>
                    {
                        // isFetchingHotPosts ? <CircularProgress />:
                        hotPosts &&
                        <div>
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
                                    {hotPosts.slice(pageNum * pageSize, pageNum * pageSize + pageSize).map((hotPost) => {
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
                                            <TableCell>{moment(hotPost.time).format("YYYY-MM-DD")}</TableCell>
                                            <TableCell>{hotPost.lastReplyTime? moment(hotPost.lastReplyTime).format("YYYY-MM-DD"): "暂无回复"}</TableCell>
                                            <TableCell numeric>{hotPost.replyNum}</TableCell>
                                        </TableRow>)
                                    })}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            colSpan={5}
                                            count={hotPosts.length}
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
                                <PageNums pageNum={10} currPage={1}
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


HotPostsPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    hotPosts: state.forum.management.hotPosts,
    isFetchingHotPosts: state.forum.management.isFetchingHotPosts,
    collegeItems: state.forum.management.collegeItems,
    courseItems: state.forum.management.courseItems,
    teacherItems: state.forum.management.teacherItems,
    startTime: state.forum.management.startTime,
    endTime: state.forum.management.endTime,
});

const mapDispatchToProps = (dispatch) => ({
    getColleges: () => {
        dispatch(getColleges());
    },
    getCourseList: (collegeid) => {
        dispatch(getCourseList(collegeid));
    },
    getTeachers: (collegeid, courseid) => {
        dispatch(getTeachers(collegeid, courseid));
    },
    getHotPosts: (collegeid, courseid, teacherid, startTime, endTime) => {
        dispatch(getHotPosts(collegeid, courseid, teacherid, startTime, endTime));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(HotPostsPanel);

