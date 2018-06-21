import React from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';
import { withStyles } from "@material-ui/core";
import Sidebar  from "../../component/Sidebar";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import AutoCourseRoutes from "../../routes/AutoCourseRoutes";
import appStyle from "../../assets/jss/appStyle.jsx";

import {addClassroom, getClassroomInfoWithName, modifyClassroom, deleteClassroomInfo, getAllClassroomInfo} from "./actions";
import {connect} from "react-redux";

const columnData = [
    { id: 'id', numeric: true},
    { id: 'campus', numeric: false, disablePadding: true, label: '校区' },
    { id: 'building', numeric: false, disablePadding: false, label: '教学楼' },
    { id: 'room', numeric: false, disablePadding: false, label: '教室' },
    { id: 'capacity', numeric: false, disablePadding: false, label: '容量'}
];

let ClassroomModifyTableHead = props => {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox"/>
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
let ClassroomModifyTableToolbar = props => {
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
                        当前所有教室信息
                    </Typography>
                )}
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
ClassroomModifyTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};
ClassroomModifyTableToolbar = withStyles(toolbarStyles)(ClassroomModifyTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        border: "1",
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class RoomResource extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            selected: [],
            selectedData:[],
            rooms: [],
            page: 0,
            rowsPerPage: 5,
            open: false,
        };
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    componentDidMount() {
    };
    componentDidUpdate() {
    };
    componentWillMount() {
        this.props.handleShowAllClick();
    }

    handleClose = () => {
        this.setState({open: false})
    };
    handleClick = (event, n, capacityValue) => {
        const { selected } = this.state;
        let modifiedData={id: n.id, campus: n.campus, building: n.building, room: n.room, capacity: capacityValue}
        const selectedIndex = selected.indexOf(n.id);
        if(event.target.checked)
            this.setState({selectedData: this.state.selectedData.concat(modifiedData)});
        else {
            let deletedIndex = this.state.selectedData.indexOf(modifiedData);
            console.log(deletedIndex);
            this.state.selectedData.splice(deletedIndex, 1);
        }
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, n.id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });
    };
    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    render() {
        const { classes, handleAddClick, handleSearchClick, handleSubmitClick, handleShowAllClick,handleDeleteClick, ...rest } = this.props;
        const { selected, rowsPerPage, page } = this.state;
        const data = this.props.rooms;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const campusExist=[
            '紫金港', '玉泉', '西溪', '之江'
        ];
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
                            <div style={{padding: 24, background: '#FFF', minHeight: 550}}>
                                <FormControl >
                                    <TextField
                                        id="campus"
                                        label="校区"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                    />
                                </FormControl>
                                <FormControl style={{ minWidth: 120, marginLeft: 70}}>
                                    <TextField
                                        id="building"
                                        label="教学楼"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                    />
                                </FormControl>
                                <div/>
                                <FormControl style={{ minWidth: 120}}>
                                    <TextField
                                        id="room"
                                        label="教室"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                    />
                                </FormControl>
                                <FormControl style={{ minWidth: 120, marginLeft: 70}}>
                                    <TextField
                                        id="capacity"
                                        label="教室容量"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        margin="normal"
                                    />
                                </FormControl>
                                <FormControl style={{ minWidth: 120, marginLeft: 70}}>
                                    <Button variant="outlined" color="primary" onClick={()=>handleAddClick(
                                        document.getElementById("campus").value,
                                        document.getElementById("building").value,
                                        document.getElementById("room").value,
                                        document.getElementById("capacity").value,
                                    )}>
                                        录入
                                    </Button>
                                </FormControl>
                                <div>
                                    <TextField
                                        id="searchedCampus"
                                        label="校区"
                                        style={{marginBottom:25}}
                                    />
                                    <TextField
                                        id="searchedBuilding"
                                        label="教学楼"
                                        style={{marginBottom:25, marginLeft: 70}}
                                    />
                                    <TextField
                                        id="searchedRoom"
                                        label="教室"
                                        style={{marginBottom:25, marginLeft: 70}}
                                    />
                                    <Button variant="outlined" color="primary"
                                            style={{marginLeft:65, marginTop:5, height:35}}
                                            onClick={() => handleSearchClick(
                                                document.getElementById("searchedCampus").value,
                                                document.getElementById("searchedBuilding").value,
                                                document.getElementById("searchedRoom").value
                                            )}>
                                        搜索
                                    </Button>
                                </div>
                                <div className={classes.root}>
                                    <Paper className={classes.paper}>
                                        <ClassroomModifyTableToolbar numSelected={selected.length} />
                                        <div className={classes.tableWrapper}>
                                            <Table className={classes.table} aria-labelledby="tableTitle">
                                                <ClassroomModifyTableHead
                                                    numSelected={selected.length}
                                                    rowCount={data.length}
                                                />
                                                <TableBody>
                                                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                                        const isSelected = this.isSelected(n.id);
                                                        return (
                                                            <TableRow
                                                                hover
                                                                onClick={event => this.handleClick(event, n, document.getElementById(n.id+'capacityModified').value)}
                                                                role="checkbox"
                                                                aria-checked={isSelected}
                                                                tabIndex={-1}
                                                                key={n.id}
                                                                selected={isSelected}
                                                            >
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox checked={isSelected} />
                                                                </TableCell>
                                                                <TableCell/>
                                                                <TableCell component="th" scope="row" padding="none">
                                                                    {n.campus}
                                                                </TableCell>
                                                                <TableCell >{n.building}</TableCell>
                                                                <TableCell >{n.room}</TableCell>
                                                                <TableCell style={{width:"13%", textAlign: 'center'}}>
                                                                    {
                                                                        <TextField
                                                                            id={n.id+'capacityModified'}
                                                                            type="number"
                                                                            defaultValue={n.capacity}
                                                                            margin="dense"
                                                                        />
                                                                    }</TableCell>
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
                                        <Button variant="outlined" color="primary" onClick={(e) => handleShowAllClick}>
                                            显示当前所有教室信息
                                        </Button>
                                        <Button variant="outlined" color="primary" style={{marginLeft:50}} onClick={(e)=>handleDeleteClick(this.state.selectedData)}>
                                            删除
                                        </Button>
                                        <Button variant="outlined" color="primary" style={{marginLeft:50}} onClick={(e)=>handleSubmitClick(this.state.selectedData)}>
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

RoomResource.propTypes = {
    classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return{
        rooms: state.roomResource.rooms
    }
}

const mapDispatchToProps = (dispatch) =>({
    handleShowAllClick: () => dispatch(getAllClassroomInfo()),
    handleAddClick: (campus, building, room, capacity) => dispatch(
        addClassroom(campus, building, room, capacity)
    ),
    handleSearchClick: (campus, building, room) => dispatch(
        getClassroomInfoWithName(
            campus, building, room
        )
    ),
    handleSubmitClick: (arr) => dispatch(modifyClassroom(arr)),
    handleDeleteClick: (arr) => dispatch(deleteClassroomInfo(arr))
});

export default withStyles(appStyle)(connect(mapStateToProps, mapDispatchToProps)(RoomResource));
