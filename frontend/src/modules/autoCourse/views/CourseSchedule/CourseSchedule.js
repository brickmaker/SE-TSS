import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Sidebar  from "../../component/Sidebar";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from "@material-ui/core/styles/colorManipulator";

import {connect} from "react-redux";
import {getAllScheduleInfo, getTeacherScheduleInfo} from "./actions";

import AutoCourseRoutes from "../../routes/AutoCourseRoutes";
import appStyle from "../../assets/jss/appStyle.jsx";

const columnData = [
    { id: 'id', numeric: true},
    { id: 'course_id', numeric: false, disablePadding: true, label: '课程代号' },
    { id: 'course', numeric: false, disablePadding: false, label: '课程名称' },
    { id: 'teacher', numeric: false, disablePadding: false, label: '教师姓名' },
    { id: 'semester', numeric: false, disablePadding: false, label: '学期' },
    { id: 'time', numeric: false, disablePadding: false, label: '上课时间' },
    { id: 'room', numeric: false, disablePadding: false, label: '上课地点' },
];
class CourseInListHead extends React.Component {
    render() {
        return (
            <TableHead>
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                {column.label}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}
CourseInListHead.propTypes = {
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});
let CourseInListToolbar = props => {
    const { classes } = props;
    return (
        <Toolbar>
            <div className={classes.title}>
                <Typography variant="title" id="tableTitle">
                    当前所有课程信息
                </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="Filter list">
                    <IconButton aria-label="Filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    );
};
CourseInListToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
};
CourseInListToolbar = withStyles(toolbarStyles)(CourseInListToolbar);

const CourseInTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
    },
    body: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#fafafa",
        },
        fontSize: 14,
    },
}))(TableCell);

const TIMES = ["第一节\n第二节", "第三节\n第四节\n第五节", "休息", "第六节\n第七节\n第八节", "第九节\n第十节", "休息", "第十一节\n第十二节\n第十三节", "休息"];
const courseInTableData = [];
for(let i=0; i<8; i++){
    courseInTableData.push({id:i+1,label:TIMES[i]});
}
const getCourse = (d, id) => {
    switch(id){
        case 1: return d["12"] ? d["12"] : "";
        case 2: return d["345"] ? d["345"] : (d["34"] ? d["34"] : "");
        case 4: return d["678"] ? d["678"] : (d["78"] ? d["78"] : "");
        case 5: return d["910"] ? d["910"] : "";
        case 7: return d["111213"] ? d["111213"] : (d["1112"] ? d["1112"] : "");
        default: return "";
    }
};

let idt=0;
const getCourseCell = (course) => {
    return (
        <CourseInTableCell>
            {course==="" ? "" : course.map( (text) => {
                return (
                    <Typography align="center" key={"ct_"+idt++}>
                        {text}
                    </Typography>
                );})}
        </CourseInTableCell>
    );
};

class CourseSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            mobileOpen: false,
            listMode: true,
            tableMode: false,
            courseInList: [],
            coursesInTable:[],
            page: 0,
            rowsPerPage: 6,
        };
    };
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    componentDidMount() {
        this.props.showAllCourseSchedule();
    }
    componentDidUpdate() {
    }
    printCourse = () =>{
        let courseToPrint = document.getElementById('allOfCourses');
        let newWin = window.open("");
        newWin.document.write(courseToPrint.outerHTML);
        newWin.document.close();
        newWin.print();
        newWin.close();
    };

    printCourseInTable = () =>{
        window.print();
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleChange = name => event => {
        if(name==='listMode') {
            if(this.state.listMode===false) {
                this.setState({[name]: event.target.checked});
                this.setState({'tableMode': false});
            }
        }
        else{
            if(this.state.tableMode===false){
                this.setState({[name]: event.target.checked});
                this.setState({'listMode': !event.target.checked});
            }
        }
    };
    render() {
        const { classes,  handleSearchButtonClick, showAllCourseSchedule, handleSearchInTableButtonClick, ...rest} = this.props;
        const { rowsPerPage, page, listMode} = this.state;
        const data = this.props.coursesInList;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        if(listMode){
            return (
                <div className={classes.wrapper}>
                    <Sidebar
                        routes={AutoCourseRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        open={this.state.mobileOpen}
                        color="blue"
                        {...rest}
                    />
                    <div className={classes.mainPanel}>
                        <div className={classes.content}>
                            <div className={classes.container}>
                                <div style={{ padding: 24, background: '#fff', minHeight: 550 }}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    color="primary"
                                                    value="listMode"
                                                    checked={this.state.listMode}
                                                    onChange={this.handleChange('listMode')}
                                                />
                                            }
                                            label="列表模式"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    color="primary"
                                                    value="tableMode"
                                                    checked={this.state.tableMode}
                                                    onChange={this.handleChange('tableMode')}
                                                />
                                            }
                                            label="表格模式"
                                        />
                                        <TextField
                                            id="searchTeacher"
                                            label="教师姓名"
                                            style={{marginLeft:500, marginBottom:25}}
                                        />
                                        <Button variant="outlined" color="primary" style={{marginLeft:10, marginTop:20, height:35}} onClick={handleSearchButtonClick}>
                                            搜索
                                        </Button>
                                    </FormGroup>
                                    <Paper className={classes.paper}>
                                        <CourseInListToolbar/>
                                        <div className={classes.tableWrapper}>
                                            <Table className={classes.table} aria-labelledby="tableTitle" id="allOfCourses">
                                                <CourseInListHead
                                                    rowCount={data.length}
                                                />
                                                <TableBody>
                                                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                                        return (
                                                            <TableRow
                                                                tabIndex={-1}
                                                                key={n.id}
                                                            >
                                                                <TableCell >{ }</TableCell>
                                                                <TableCell component="th" scope="row" padding="none">
                                                                    {n.course_id}
                                                                </TableCell>
                                                                <TableCell >{n.course}</TableCell>
                                                                <TableCell>{n.teacher}</TableCell>
                                                                <TableCell>{n.semester}</TableCell>
                                                                <TableCell>{n.time}</TableCell>
                                                                <TableCell>{n.room}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: 49 * emptyRows }}>
                                                            <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                        <TablePagination
                                            component="div"
                                            count={data.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            backIconButtonProps={{
                                                'aria-label': 'Previous Page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'Next Page',
                                            }}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                    <div style={{paddingTop: 20, textAlign:"end"}}>
                                        <Button variant="outlined" color="primary"  onClick={showAllCourseSchedule}>
                                            显示最新课表
                                        </Button>
                                        <Button variant="outlined" color="primary" style={{marginLeft: 50}} onClick={this.printCourse}>
                                            打印课表
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            const data = this.props.coursesInTable;
            console.log("In render: ", data)
            return (
                <div className={classes.wrapper}>
                    <Sidebar
                        routes={AutoCourseRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        open={this.state.mobileOpen}
                        color="blue"
                        {...rest}
                    />
                    <div className={classes.mainPanel}>
                        <div className={classes.content}>
                            <div className={classes.container}>
                                <div style={{ padding: 24, background: '#fff', minHeight: 550 }}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    color="primary"
                                                    value="listMode"
                                                    checked={this.state.listMode}
                                                    onChange={this.handleChange('listMode')}
                                                />
                                            }
                                            label="列表模式"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Radio
                                                    color="primary"
                                                    value="tableMode"
                                                    checked={this.state.tableMode}
                                                    onChange={this.handleChange('tableMode')}
                                                />
                                            }
                                            label="表格模式"
                                        />
                                        <TextField
                                            id="searchTeacher"
                                            label="教师姓名"
                                            style={{marginLeft:500, marginBottom:25}}
                                        />
                                        <Button variant="outlined" color="primary" style={{marginLeft:10, marginTop:20, height:35}} onClick={handleSearchButtonClick}>
                                            搜索
                                        </Button>
                                    </FormGroup>
                                    <Paper className={classes.paper}>
                                        <Table className={classes.table} style={{border:1}} id="allOfCourses">
                                            <TableHead>
                                                <TableRow>
                                                    <CourseInTableCell style={{width:30}}>时间</CourseInTableCell>
                                                    <CourseInTableCell className={classes.cell0}>星期一</CourseInTableCell>
                                                    <CourseInTableCell className={classes.cell0}>星期二</CourseInTableCell>
                                                    <CourseInTableCell className={classes.cell0}>星期三</CourseInTableCell>
                                                    <CourseInTableCell className={classes.cell0}>星期四</CourseInTableCell>
                                                    <CourseInTableCell className={classes.cell0}>星期五</CourseInTableCell>
                                                    <CourseInTableCell className={classes.cell0}>星期六</CourseInTableCell>
                                                    <CourseInTableCell className={classes.cell0}>星期日</CourseInTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {courseInTableData.map(n => {
                                                    return (
                                                        <TableRow className={classes.row} key={n.id}>
                                                            { n.id===3||n.id===6||n.id===8 ? <CourseInTableCell>{n.label}</CourseInTableCell>
                                                                : <CourseInTableCell className={classes.cell}>{n.label}</CourseInTableCell>}
                                                            {getCourseCell(data["mon"] ? getCourse(data["mon"], n.id) : "")}
                                                            {getCourseCell(data["tue"] ? getCourse(data["tue"], n.id) : "")}
                                                            {getCourseCell(data["wed"] ? getCourse(data["wed"], n.id) : "")}
                                                            {getCourseCell(data["thu"] ? getCourse(data["thu"], n.id) : "")}
                                                            {getCourseCell(data["fri"] ? getCourse(data["fri"], n.id) : "")}
                                                            {getCourseCell(data["sat"] ? getCourse(data["sat"], n.id) : "")}
                                                            {getCourseCell(data["sun"] ? getCourse(data["sun"], n.id) : "")}
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </div>
                                <div style={{paddingTop: 20, textAlign:"end"}}>
                                    <Button variant="outlined" color="primary" style={{marginLeft: 50}} onClick={() => this.printCourseInTable}>
                                        打印课表
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    return{
        coursesInList: state.courseSchedule.coursesInList,
        coursesInTable: state.courseSchedule.coursesInTable,
    }
}

const mapDispatchToProps = (dispatch) =>({
    handleSearchButtonClick: () => dispatch(getTeacherScheduleInfo(document.getElementById("searchTeacher").value)),
    showAllCourseSchedule : () => dispatch(getAllScheduleInfo()),
    handleSearchInTableButtonClick: () => dispatch(getTeacherScheduleInfo(document.getElementById("searchTeacher").value)),
});

CourseSchedule.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(appStyle)(connect( mapStateToProps,mapDispatchToProps)(CourseSchedule));

