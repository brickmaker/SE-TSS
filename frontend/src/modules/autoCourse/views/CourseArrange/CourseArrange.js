import React from "react";
import PropTypes from "prop-types";
import appStyle from "../../assets/jss/appStyle.jsx";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {connect} from "react-redux";
import {ShowAllRestCourse, arrangeTeacherScheduleInfo,ArrangeAllRestCourse,HandIn} from "./actions";


const columnDataM = [
    { id: 'id', numeric: true},
    { id: 'teacher', numeric: false, disablePadding: true, label: '教师姓名' },
    { id: 'course_id', numeric: false, disablePadding: true, label: '课程代号' },
    { id: 'course', numeric: false, disablePadding: true, label: '课程名称' },
    { id: 'room', numeric: false, disablePadding: false, label: '上课教室' },
    { id: 'time', numeric: false, disablePadding: false, label: '上课时间'}
];
const columnData = [
    { id: 'id', numeric: true},
    { id: 'courseId', numeric: false, disablePadding: true, label: '课程代号' },
    { id: 'courseName', numeric: false, disablePadding: false, label: '课程名称' },
    { id: 'teacherName', numeric: false, disablePadding: true, label: '任课教师' },
    { id: 'courseLen', numeric: true, disablePadding: false, label: '课时' },
    { id: 'semester', numeric: false, disablePadding: false, label: '学期' },
    { id: 'capacity', numeric: true, disablePadding: false, label: '课程容量'}
];

class ArrangingHead extends React.Component {
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
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel>
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}
class ModifyTableHead extends React.Component {

    render() {
        const { onSelectAllClick, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnDataM.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                padding={column.disablePadding ? 'none' : 'default'}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel>
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}
ModifyTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};
ArrangingHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
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

let ArrangingToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        所有未排课程
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};
let ModifyTableToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="title" id="tableTitle">
                        指定老师的课程列表
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

ArrangingToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};
ModifyTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};
ArrangingToolbar = withStyles(toolbarStyles)(ArrangingToolbar);
ModifyTableToolbar = withStyles(toolbarStyles)(ModifyTableToolbar);

class CourseArrange extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: [],
            data: [

            ],
            dataM: [

            ],
            page: 0,
            pageM:0,
            rowsPerPage: 5,
            rowsPerPageM:5,
            selectedData:[],
        };
    };


    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, n, time,place) => {
        const { selected } = this.state;
        let modifiedData={id: n.id, course_id: n.course_id,teacher:n.teacher,teacher_username:n.teacher_username,semester:n.semester,course:n.course, room:place, room_id:n.room_id,time:time}
        const selectedIndex = selected.indexOf(n.id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, n.id);
            console.log("selected");
            this.setState({selectedData: this.state.selectedData.concat(modifiedData)});
            console.log(this.state.selectedData);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            console.log("the first one is dropped");
            let deletedIndex = this.state.selectedData.indexOf(modifiedData);
            console.log(deletedIndex);
            if(deletedIndex===0)
                this.state.selectedData.shift();
            else
                this.state.selectedData.splice(deletedIndex, 1);
            console.log(this.state.selectedData);
        } else if (selectedIndex === selected.length - 1) {
            console.log("last selected last dropped");
            newSelected = newSelected.concat(selected.slice(0, -1));
            let deletedIndex = this.state.selectedData.indexOf(modifiedData);
            console.log(deletedIndex);
            this.state.selectedData.splice(deletedIndex, 1);
            console.log(this.state.selectedData);
        } else if (selectedIndex > 0) {
            console.log("last selected not last dropped");
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            let deletedIndex = this.state.selectedData.indexOf(modifiedData);
            console.log(deletedIndex);
            this.state.selectedData.splice(deletedIndex, 1);
            console.log(this.state.selectedData);
        }
        this.setState({ selected: newSelected });
    };


    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangePageM = (event, pageM) => {
        this.setState({ pageM });
    };


    state = {
        mobileOpen: false
    };
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    componentDidMount() {
        this.props.showAllRestCourse();
    }
    componentDidUpdate() {
    }
    isSelected = id => this.state.selected.indexOf(id) !== -1;
    render() {
        const {   selected, rowsPerPageM,rowsPerPage, pageM,page } = this.state;
        const { classes, showAllRestCourse,arrangeAllRestCourse,handleSearchButtonClick,handIn,...rest } = this.props;
        const data = this.props.data;
        const dataM = this.props.dataM;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const emptyRowsM = rowsPerPageM - Math.min(rowsPerPageM, dataM.length - pageM * rowsPerPageM);
        return (
            <div className={classes.wrapper}>
                <div className={classes.mainPanel}>
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <div style={{padding: 24, background: '#fff', minHeight: 550}}>
                                <Paper className={classes.root}>
                                    <ArrangingToolbar  />
                                    <div className={classes.tableWrapper}>
                                        <Table className={classes.table} aria-labelledby="tableTitle">
                                            <ArrangingHead
                                                rowCount={data.length}
                                            />
                                            <TableBody>
                                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={n.id}
                                                        >
                                                            <TableCell/>
                                                            <TableCell component="th" scope="row" padding="none">
                                                                {n.courseId}
                                                            </TableCell>
                                                            <TableCell >{n.courseName}</TableCell>
                                                            <TableCell >{n.teacherName}</TableCell>
                                                            <TableCell numeric>{n.courseLen}</TableCell>
                                                            <TableCell numeric>{n.semester}</TableCell>
                                                            <TableCell numeric>{n.capacity}</TableCell>
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
                                    />
                                    <Button variant="outlined" color="primary" onClick={(e)=>showAllRestCourse}>
                                        显示未排课程
                                    </Button>
                                    <Button variant="outlined" color="primary" onClick={arrangeAllRestCourse}>
                                        自动排课
                                    </Button>
                                </Paper>
                                <div style={{padding: 10, height: 35}}/>
                                <TextField
                                    id="searchTeacher"
                                    label="教师姓名"
                                />
                                <Button variant="outlined" color="primary" style={{marginLeft: 10, height: 35}} onClick={handleSearchButtonClick}>
                                    搜索
                                </Button>
                                <div className={classes.root}>
                                    <Paper className={classes.paper}>
                                        <ModifyTableToolbar numSelected={selected.length} />
                                        <div className={classes.tableWrapper}>
                                            <Table className={classes.table} aria-labelledby="tableTitle">
                                                <ModifyTableHead
                                                    numSelected={selected.length}
                                                    onSelectAllClick={this.handleSelectAllClick}
                                                    rowCount={data.length}
                                                />
                                                <TableBody>
                                                    {dataM.slice(pageM * rowsPerPageM, pageM * rowsPerPageM + rowsPerPageM).map(n => {
                                                        const isSelected = this.isSelected(n.id);
                                                        return (
                                                            <TableRow
                                                                hover
                                                                role="checkbox"
                                                                aria-checked={isSelected}
                                                                tabIndex={-1}
                                                                key={n.id}
                                                                selected={isSelected}
                                                                onClick={event => this.handleClick(event, n,document.getElementById(n.id+'enterTime').value,document.getElementById(n.id+'enterRoom').value)}
                                                            >
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox checked={isSelected} />
                                                                </TableCell>
                                                                <TableCell/>
                                                                <TableCell component="th" scope="row" padding="none">
                                                                    {n.teacher}
                                                                </TableCell>
                                                                <TableCell component="th" scope="row" padding="none">
                                                                    {n.course_id}
                                                                </TableCell>
                                                                <TableCell component="th" scope="row" padding="none">
                                                                    {n.course}
                                                                </TableCell>
                                                                <TableCell style={{width:"13%", textAlign: 'center'}}>
                                                                    {
                                                                        <TextField
                                                                            id={n.id+"enterRoom"}
                                                                            defaultValue={n.room}
                                                                            margin="dense"
                                                                        />
                                                                    }</TableCell>
                                                                <TableCell style={{width:"13%", textAlign: 'center'}}>
                                                                    {
                                                                        <TextField
                                                                            id={n.id+"enterTime"}
                                                                            defaultValue={n.time}
                                                                            margin="dense"
                                                                        />
                                                                    }</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                    {emptyRowsM > 0 && (
                                                        <TableRow style={{ height: 49 * emptyRowsM }}>
                                                            <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                        <TablePagination
                                            component="div"
                                            count={dataM.length}
                                            rowsPerPage={rowsPerPageM}
                                            page={pageM}
                                            backIconButtonProps={{
                                                'aria-label': 'Previous Page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'Next Page',
                                            }}
                                            onChangePage={this.handleChangePageM}
                                        />
                                    </Paper>
                                    <div style={{paddingTop: 20, textAlign:"end"}}>
                                        <Button variant="outlined" color="primary" style={{marginLeft:50}} onClick={(e)=>handIn(this.state.selectedData)}>
                                            提交
                                        </Button>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CourseArrange.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return{
        data: state.courseArrange.data,
        dataM:state.courseArrange.dataM,
    }
}

const mapDispatchToProps = (dispatch) =>({
    handleSearchButtonClick: () => dispatch(
        arrangeTeacherScheduleInfo(document.getElementById("searchTeacher").value),
    ),
    showAllRestCourse : () => dispatch(ShowAllRestCourse()),
    arrangeAllRestCourse:()=>dispatch(ArrangeAllRestCourse()),
    handIn:(newData)=>dispatch(HandIn(newData))
});

export default withStyles(appStyle)(connect(mapStateToProps, mapDispatchToProps)(CourseArrange));
