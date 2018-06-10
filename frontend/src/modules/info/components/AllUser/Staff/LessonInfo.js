import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as actionCreators from "../../../actions/auth";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

import Bar from "../Bar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    Typography,
    Paper,
    Checkbox,
    IconButton,
    Tooltip,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    MenuItem,
    Chip,
    FormControlLabel,
    FormGroup,
    Input,
    FormControl,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import SelectIcon from '@material-ui/icons/SelectAll';
import StarIcon from '@material-ui/icons/Star';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import {lighten} from '@material-ui/core/styles/colorManipulator';

import {listItems, otherItems, ranges, credit} from "./StaffData";


// 增强的表头
class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const columnData = [
            {value: 'course_id', label: '课程号'},
            {value: 'name', label: '课程名'},
            {value: 'credit', label: '学分'},
            {value: 'classroom', label: '教室'},
            {value: 'state', label: '状态'},
        ];
        const {onSelectAllClick, order, orderBy, numSelected, rowCount} = this.props;

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
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.value}
                                sortDirection={orderBy === column.value ? order : false}
                            >
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.value}
                                        direction={order}
                                        onClick={this.createSortHandler(column.value)}
                                    >
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

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
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

let EnhancedTableToolbar = props => {
    const {numSelected, classes, handleAddOpen, handleFilterOpen, tableState, handleTableData, handleAccept, handleRefuse, handleDelete} = props;

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
                        课程信息
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {tableState && (
                    <Tooltip title="同意">
                        <IconButton aria-label="Accept" onClick={handleAccept}>
                            <DoneIcon/>
                        </IconButton>
                    </Tooltip>
                )
                }
            </div>
            <div className={classes.actions}>
                {tableState && (
                    <Tooltip title="拒绝">
                        <IconButton aria-label="Refuse" onClick={handleRefuse}>
                            <ClearIcon/>
                        </IconButton>
                    </Tooltip>
                )
                }
            </div>


            <div className={classes.actions}>
                {!tableState ? (
                    <Tooltip title="审批">
                        <IconButton aria-label="Process" onClick={handleTableData}>
                            <SelectIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="普通">
                        <IconButton aria-label="Normal" onClick={handleTableData}>
                            <StarIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="删除">
                        <IconButton aria-label="Delete" onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="筛选">
                        <IconButton aria-label="Filter list" onClick={handleFilterOpen}>
                            <FilterListIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
            <div className={classes.actions}>
                <Tooltip title="添加">
                    <IconButton aria-label="Add Course" onClick={handleAddOpen}>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    base: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});


function mapStateToProps(state) {
    return {
        userName: state.auth.userName,
        data: state.auth.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}



class LessonInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            order: 'asc',
            orderBy: 'course_id',
            selected: [],
            allowSelected: true,
            anchor: 'left',
            userName: '',
            open: true,
            add: false,
            filter: false,
            dialogState: false,
            originData: [],
            data: [],
            page: 0,
            rowsPerPage: 5,
            course_id: '',
            course_name: '',
            course_credit: -1,
            course_cap: -1,
            course_room: '',
            course_assessment: '',
            course_teacher: '',
            course_type: -1,
            id_error: false,
            name_error: false,
            credit_error: false,
            cap_error: false,
            room_error: false,
            dialogText: '',
            disabled: true,
            chipData: [],
            chipLabel: [],
            tableState: false,
            acceptState: true,
            id_filter: '',
            id_filter_state: false,
            name_filter: '',
            name_filter_state: false,
            credit_filter: 1,
            credit_filter_state: false,
            classroom_filter: '',
            classroom_filter_state: false,
            type_filter: 0,
            type_filter_state: false,
            faculty_filter_state: false,
            faculty_filter: '',
        };
    }

    isDisabled = () => {
        let id_valid = (this.state.course_id !== '' && this.state.course_id.length < 10);
        let name_valid = (this.state.course_name !== '' && this.state.course_name.length < 40);
        let credit_valid = (this.state.course_credit !== -1 && (this.state.course_credit <= 10 && this.state.course_credit > 0));
        let cap_valid = (this.state.course_cap !== -1 && (this.state.course_cap <= 300 && this.state.course_cap > 0));
        let room_valid = (this.state.course_room !== '');

        this.setState({
            id_error: !id_valid,
            name_error: !name_valid,
            credit_error: !credit_valid,
            cap_error: !cap_valid,
            room_error: !room_valid,
            disabled: !(id_valid && name_valid && credit_valid && room_valid && cap_valid)
        });
        return !(id_valid && name_valid && credit_valid && room_valid && cap_valid);
    };

    handleAddOpen = () => {
        this.setState({add: true});
    };

    handleAddClose = () => {
        this.setState({add: false});
        const chipData = [...this.state.chipData];
        chipData.splice(0, chipData.length);
        this.setState({chipData});
        const chipLabel = [...this.state.chipLabel];
        chipLabel.splice(0, chipLabel.length);
        this.setState({chipLabel});
        this.setState({course_type: -1});
    };

    handleFilterOpen = () => {
        this.setState({filter: true});
    };

    handleFilterClose = () => {
        this.setState({filter: false});
    };

    handleFilterSubmit = () => {
        let data = this.state.originData;
        let filterData = data;
        if (this.state.id_filter_state) {
            filterData = filterData.filter(item => item.course_id.indexOf(this.state.id_filter) !== -1);
        }
        if (this.state.name_filter_state) {
            filterData = filterData.filter(item => item.name.indexOf(this.state.name_filter) !== -1);
        }
        if (this.state.classroom_filter_state) {
            filterData = filterData.filter(item => item.classroom.indexOf(this.state.classroom_filter) !== -1);
        }
        if (this.state.credit_filter_state) {
            filterData = filterData.filter(item => item.credit.toString() === this.state.credit_filter.toString());
        }
        if (this.state.type_filter_state) {
            filterData = filterData.filter(item => item.course_type.toString() === this.state.type_filter.toString());
        }
        console.log(this.state.faculty_filter);
        if (this.state.faculty_filter_state) {
            filterData = filterData.filter(item => item.faculty.filter(subItem => subItem.name.toString() === this.state.faculty_filter.toString()).length > 0);
        }
        this.setState({data: filterData});
        this.handleFilterClose();
    };

    handleDialogClose = () => {
        this.setState({dialogState: false});
    };

    handleChipDelete = data => () => {
        const chipData = [...this.state.chipData];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.setState({chipData});
    };

    handleAddSubmit = () => {
        // 这句话很关键
        let true_state = this.isDisabled();
        if (!true_state) {
        //     let data = {};
        //     data.course_id = this.state.course_id;
        //     data.name = this.state.course_name;
        //     data.credit = this.state.course_credit;
        //     data.capacity = this.state.course_cap;
        //     data.course_type = this.state.course_type;
        //     data.classroom = this.state.course_room;
        //     data.assessment = this.state.course_assessment;
        //     data.state = 2;
        //     data.faculty = this.state.chipLabel;
        //     fetch('/api/register_course', {
        //         method: 'post',
        //         headers: {
        //             'Authorization': 'JWT ' + localStorage.getItem('token'),
        //             'Accept': 'application/json, text/plain, */*',
        //             'Content-Type': 'application/json',
        //
        //         },
        //         body: JSON.stringify(data)
        //     })
        //         .then(response => {
        //             let status = response.status;
        //             if (status === 201) {
        //                 this.handleInitData();
        //                 this.setState({
        //                     dialogState: true,
        //                     dialogText: "课程添加成功",
        //                 });
        //             } else {
        //                 this.setState({
        //                     dialogState: true,
        //                     dialogText: "课程添加失败"
        //                 });
        //             }
        //             return response.json;
        //         })
        //         .catch(() => {
        //             this.setState({
        //                 dialogState: true,
        //                 dialogText: "服务器无响应",
        //             });
        //             // browserHistory.push("/login");
        //         });
        // }
        // else {
        //     this.setState({
        //         dialogState: true,
        //         dialogText: "课程信息参数错误",
        //     });
        }
        this.handleAddClose();
    };

    handleFacultySearch = () => {
        let faculty = this.state.course_teacher;
        let status;
        if (faculty === '') {
            return;
        } else {
            let url = '/api/faculty/' + faculty + '/';
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    status = response.status;
                    return response.json;
                })
                .then((data) => {
                    if (status === 200) {
                        const chipLabel = [...this.state.chipLabel];
                        const chipData = [...this.state.chipData];
                        if (chipLabel.indexOf(faculty) === -1) {
                            const chipToAdd = {key: chipData.length, label: faculty};
                            chipData.push(chipToAdd);
                            this.setState({chipData});
                            chipLabel.push(faculty);
                            this.setState({chipLabel});
                        }
                    } else {
                        this.setState({
                            dialogState: true,
                            dialogText: "未找到该教师",
                        });
                    }
                })
                .catch(() => {
                    this.setState({
                        dialogState: true,
                        dialogText: "服务器无响应",
                    });
                    // browserHistory.push("/login");
                });
        }
    };

    handleInitData = () => {
        fetch('/api/course/', {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({originData: data.sort((a, b) => (a.course_id < b.course_id ? -1 : 1))});
                if (!this.state.tableState) {
                    this.setState({data: this.state.originData});
                } else {
                    this.setState({data: this.state.originData.filter(item => item.state === 1).sort((a, b) => (a.course_id < b.course_id ? -1 : 1))});
                }

            })
            .catch(() => {
                this.setState({
                    dialogState: true,
                    dialogText: "服务器无响应",
                });
                // browserHistory.push("/login");
            });
    };

    componentDidMount() {
        // 获取初始课程数据
        this.handleInitData();
        this.setState({userName: localStorage.getItem('userName')});
    };

    handleMenuClick = () => {
        this.setState({open: !this.state.open});
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({data, order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        if (!this.state.allowSelected) {
            this.setState({
                dialogState: true,
                dialogText: "只允许单选操作",
            });
            return;
        }

        if (checked) {
            this.setState({selected: this.state.data.map(n => n.course_id)});
            return;
        }
        this.setState({selected: []});
    };

    handleSelectClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selected.length === 1 && selectedIndex === -1 && !this.state.allowSelected) {
            this.setState({
                dialogState: true,
                dialogText: "只允许单选操作",
            });
            return;
        }
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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
        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleCheckChange = name => event => {
        if (!event.target.checked) {
            if (name === 'type_filter_state') {
                this.setState({type_filter: 0});
            }
            else if (name === 'credit_filter_state') {
                this.setState({credit_filter: 1});
            }
            else {
                this.setState({[name.substring(0, name.length - 6)]: ''});
            }
        }
        this.setState({[name]: event.target.checked});
    };

    handleTableData = () => {
        if (!this.state.tableState) {
            this.setState({
                data: this.state.originData.filter(item => item.state === 1).sort((a, b) => (a.course_id < b.course_id ? -1 : 1)),
                allowSelected: false
            });
        } else {
            this.setState({data: this.state.originData, allowSelected: true});
        }
        this.setState({tableState: !this.state.tableState});
        this.setState({selected: []});
    };

    handleAccept = () => {
        this.setState({acceptState: true}, () => {
            this.handleProcess();
        });
    };

    handleRefuse = () => {
        this.setState({acceptState: false}, () => {
            this.handleProcess();
        });
    };

    handleProcess = () => {
        let selected = this.state.selected;
        this.setState({selected: []});
        selected.forEach((value, index) => {
            let url = '/api/course/' + value + '/';
            let data = this.state.data.filter(item => item.course_id === value)[0];
            data.state = this.state.acceptState ? 2 : 0;
            fetch(url, {
                method: 'put',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('token'),
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    let status = response.status;
                    if (status === 200) {
                        this.setState({
                            dialogState: true,
                            dialogText: "课程审批成功",
                        });
                        this.handleInitData();
                    } else {
                        this.setState({
                            dialogState: true,
                            dialogText: response.statusText,
                        });
                    }
                    return response.json;
                })
                .catch(() => {
                    this.setState({
                        dialogState: true,
                        dialogText: "服务器无响应",
                    });
                    // browserHistory.push("/login");
                });
        });
    };

    handleDelete = () => {
        let selected = this.state.selected;
        this.setState({selected: []});
        selected.forEach((value, index) => {
            let url = '/api/course/' + value + '/';
            fetch(url, {
                method: 'delete',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('token'),
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    let status = response.status;
                    if (status === 204) {
                        this.handleInitData();
                        this.setState({
                            dialogState: true,
                            dialogText: "课程删除成功",
                        });
                    } else {
                        this.setState({
                            dialogState: true,
                            dialogText: response.statusText,
                        });
                    }
                    return response.json;
                })
                .catch(() => {
                    this.setState({
                        dialogState: true,
                        dialogText: "服务器无响应",
                    });
                    // browserHistory.push("/login");
                });
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, theme} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, anchor, open, tableState} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        const children = (
            <div>
                <Paper className={classes.base}>
                    <EnhancedTableToolbar numSelected={selected.length}
                                          handleAddOpen={this.handleAddOpen.bind(this)}
                                          handleAddClose={this.handleAddClose.bind(this)}
                                          handleFilterOpen={this.handleFilterOpen.bind(this)}
                                          handleFilterClose={this.handleFilterClose.bind(this)}
                                          tableState={tableState}
                                          handleTableData={this.handleTableData.bind(this)}
                                          handleAccept={this.handleAccept.bind(this)}
                                          handleRefuse={this.handleRefuse.bind(this)}
                                          handleDelete={this.handleDelete.bind(this)}/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    const isSelected = this.isSelected(n.course_id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleSelectClick(event, n.course_id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.course_id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected}/>
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.course_id}
                                            </TableCell>
                                            <TableCell>{n.name}</TableCell>
                                            <TableCell>{n.credit}</TableCell>
                                            <TableCell>{n.classroom}</TableCell>
                                            <TableCell>{n.state}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 49 * emptyRows}}>
                                        <TableCell colSpan={6}/>
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
                        rowsPerPageOptions={[5, 10]}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <div>
                    <Dialog
                        open={this.state.add}
                        onClose={this.handleAddClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">添加课程</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                请输入课程信息（教师信息输入后通过搜索教师添加）
                            </DialogContentText>
                            <TextField
                                autoFocus
                                fullWidth
                                label="课程号"
                                onChange={this.handleChange('course_id')}
                                margin="normal"
                                error={this.state.id_error}
                            />
                            <TextField
                                fullWidth
                                label="课程名"
                                onChange={this.handleChange('course_name')}
                                margin="normal"
                                error={this.state.name_error}
                            />
                            <TextField
                                fullWidth
                                select='true'
                                label="课程类型"
                                margin="normal"
                                value={this.state.course_type}
                                onChange={this.handleChange('course_type')}
                            >
                                {ranges.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                label="学分"
                                onChange={this.handleChange('course_credit')}
                                margin="normal"
                                error={this.state.credit_error}
                            />
                            <TextField
                                fullWidth
                                label="容量"
                                onChange={this.handleChange('course_cap')}
                                margin="normal"
                                error={this.state.cap_error}
                            />
                            <TextField
                                fullWidth
                                label="教室"
                                onChange={this.handleChange('course_room')}
                                margin="normal"
                                error={this.state.room_error}
                            />
                            <TextField
                                fullWidth
                                label="考核方式"
                                onChange={this.handleChange('course_assessment')}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="教师"
                                onChange={this.handleChange('course_teacher')}
                                margin="normal"
                            />
                            {this.state.chipData.map(data => {
                                let avatar = null;

                                return (
                                    <Chip
                                        key={data.key}
                                        avatar={avatar}
                                        label={data.label}
                                        onDelete={this.handleChipDelete(data)}
                                        className={classes.chip}
                                    />
                                );
                            })}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => this.handleFacultySearch(e)} color="primary">
                                添加教师
                            </Button>
                            <Button onClick={this.handleAddClose} color="primary">
                                关闭
                            </Button>
                            <Button onClick={(e) => this.handleAddSubmit(e)} color="primary">
                                提交
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={this.state.filter}
                        onClose={this.handleFilterClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">筛选课程</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                请输入相关课程信息，默认筛选方式为包含方式
                            </DialogContentText>

                            <div>
                                <Checkbox
                                    checked={this.state.id_filter_state}
                                    onChange={this.handleCheckChange('id_filter_state')}
                                />
                                <TextField
                                    label="课程号"
                                    value={this.state.id_filter}
                                    onChange={this.handleChange('id_filter')}
                                    disabled={!this.state.id_filter_state}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    checked={this.state.name_filter_state}
                                    onChange={this.handleCheckChange('name_filter_state')}
                                />
                                <TextField
                                    label="课程名"
                                    value={this.state.name_filter}
                                    onChange={this.handleChange('name_filter')}
                                    disabled={!this.state.name_filter_state}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    checked={this.state.type_filter_state}
                                    onChange={this.handleCheckChange('type_filter_state')}
                                />
                                <TextField
                                    select
                                    label="类型"
                                    value={this.state.type_filter}
                                    onChange={this.handleChange('type_filter')}
                                    disabled={!this.state.type_filter_state}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    {ranges.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </div>
                            <div>
                                <Checkbox
                                    checked={this.state.credit_filter_state}
                                    onChange={this.handleCheckChange('credit_filter_state')}
                                />
                                <TextField
                                    select
                                    label="学分"
                                    value={this.state.credit_filter}
                                    onChange={this.handleChange('credit_filter')}
                                    disabled={!this.state.credit_filter_state}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    {credit.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </div>

                            <div>
                                <Checkbox
                                    checked={this.state.classroom_filter_state}
                                    onChange={this.handleCheckChange('classroom_filter_state')}
                                />
                                <TextField
                                    label="教室"
                                    value={this.state.classroom_filter}
                                    onChange={this.handleChange('classroom_filter')}
                                    disabled={!this.state.classroom_filter_state}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    checked={this.state.faculty_filter_state}
                                    onChange={this.handleCheckChange('faculty_filter_state')}
                                />
                                <TextField
                                    label="教师"
                                    value={this.state.faculty_filter}
                                    onChange={this.handleChange('faculty_filter')}
                                    disabled={!this.state.faculty_filter_state}
                                />
                            </div>

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={this.handleFilterClose} color="primary">
                                关闭
                            </Button>
                            <Button onClick={this.handleFilterSubmit} color="primary">
                                筛选
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <div>
                    <Dialog
                        open={this.state.dialogState}
                        onClose={this.handleDialogClose}
                    >
                        <DialogTitle>{"提示"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {this.state.dialogText}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDialogClose} color="primary">
                                关闭
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>


        );
        return (

            <Bar
                listItems={listItems}
                otherItems={otherItems}
                children={
                    children
                }
            />

        );
    }
}


LessonInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LessonInfo));



