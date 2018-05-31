import React from 'react';
import PropTypes from 'prop-types';

import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as actionCreators from "../../../actions/auth";
import {browserHistory} from "react-router";

import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

import StaffBar from "./StaffBar";
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
    Card,
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
    Menu,
} from '@material-ui/core';


import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import SelectIcon from '@material-ui/icons/SelectAll';
import StarIcon from '@material-ui/icons/Star';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import {lighten} from '@material-ui/core/styles/colorManipulator';


class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const columnData = [
            {value: 'username', label: '用户名'},
            {value: 'id_number', label: '身份证号'},
            {value: 'name', label: '姓名'},
            {value: 'gender', label: '性别'},
            {value: 'email', label: '邮箱'},
            {value: 'department', label: '部门'},

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
    const {numSelected, classes, handleAddOpen, handleFilterOpen, handleAccept, handleRefuse, handleDelete, type_anchorEl, handleTypeNormalClose, handleTypeStudentClose, handleTypeFacultyClose, handleTypeOpen} = props;

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
                        用户信息
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                <Menu
                    id="simple-menu"
                    anchorEl={type_anchorEl}
                    open={Boolean(type_anchorEl)}
                    onClose={handleTypeNormalClose}
                >
                    <MenuItem onClick={handleTypeStudentClose}>学生</MenuItem>
                    <MenuItem onClick={handleTypeFacultyClose}>教师</MenuItem>
                </Menu>


                <Tooltip title="类型">
                    <IconButton aria-label="Process" onClick={handleTypeOpen}>
                        <SelectIcon/>
                    </IconButton>
                </Tooltip>


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

const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    base: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1000,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    appFrame: {
        height: '90%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
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

@connect(mapStateToProps, mapDispatchToProps)
class AccountInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            order: 'asc',
            orderBy: 'username',
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
            username_filter: '',
            username_filter_state: false,
            name_filter: '',
            name_filter_state: false,
            id_number_filter: '',
            id_number_filter_state: false,
            gender_filter: 'M',
            gender_filter_state: false,
            department_filter: '',
            department_filter_state: false,
            email_filter_state: false,
            email_filter: '',
            account_type: 0,
            type_anchorEl: null,
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
        this.setState({dialogState: true, dialogText: '您没有注册用户权限，请联系系统管理员。'});
    };

    handleAddClose = () => {
        this.setState({dialog: false});
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
        if (this.state.username_filter_state) {
            filterData = filterData.filter(item => item.username.indexOf(this.state.username_filter) !== -1);
        }
        if (this.state.id_number_filter_state) {
            filterData = filterData.filter(item => item.id_number.indexOf(this.state.id_number_filter) !== -1);
        }
        if (this.state.name_filter_state) {
            filterData = filterData.filter(item => item.name.indexOf(this.state.name_filter) !== -1);
        }
        console.log(filterData);
        if (this.state.gender_filter_state) {
            filterData = filterData.filter(item => item.gender.toString() === this.state.gender_filter.toString());
        }if (this.state.email_filter_state) {
            filterData = filterData.filter(item => item.email.indexOf(this.state.email_filter) !== -1);
        }
        if (this.state.department_filter_state) {
            filterData = filterData.filter(item => item.department.indexOf(this.state.department_filter) !== -1);
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
            let data = {};
            data.course_id = this.state.course_id;
            data.name = this.state.course_name;
            data.credit = this.state.course_credit;
            data.capacity = this.state.course_cap;
            data.course_type = this.state.course_type;
            data.classroom = this.state.course_room;
            data.assessment = this.state.course_assessment;
            data.state = 2;
            data.faculty = this.state.chipLabel;
            fetch('/api/register_course', {
                method: 'post',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('token'),
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    let status = response.status;
                    if (status === 201) {
                        this.handleInitData();
                        this.setState({
                            dialogState: true,
                            dialogText: "课程添加成功",
                        });
                    } else {
                        this.setState({
                            dialogState: true,
                            dialogText: "课程添加失败"
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
        }
        else {
            this.setState({
                dialogState: true,
                dialogText: "课程信息参数错误",
            });
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

    handleTypeOpen = event => {
        this.setState({type_anchorEl: event.currentTarget});
    };

    handleTypeNormalClose = () => {
        this.setState({type_anchorEl: null});
        this.setState({account_type: this.state.account_type}, () => {
            this.handleInitData();
        });

    };

    handleTypeStudentClose = () => {
        this.setState({type_anchorEl: null});
        this.setState({account_type: 0}, () => {
            this.handleInitData();
        });
    };

    handleTypeFacultyClose = () => {
        this.setState({type_anchorEl: null});
        this.setState({account_type: 1}, () => {
            this.handleInitData();
        });
    };


    handleInitData = () => {


        console.log(this.state.account_type);
        let url = '/api/student/';
        if (this.state.account_type === 0) {
            url = '/api/student/';
        } else if (this.state.account_type === 1) {
            url = '/api/faculty/';
        } else if (this.state.account_type === 2) {
            url = '/api/staff/';
        } else if (this.state.account_type === 3) {
            url = '/api/admin/';
        }
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({originData: data.sort((a, b) => (a.username < b.username ? -1 : 1))});
                this.setState({data: this.state.originData});
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
            this.setState({selected: this.state.data.map(n => n.username)});
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
            if (name === 'gender_filter_state') {
                this.setState({gender_filter: 'M'});
            }
            else {
                this.setState({[name.substring(0, name.length - 6)]: ''});
            }
        }
        this.setState({[name]: event.target.checked});
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
        const ranges = [
            {
                value: 0,
                label: '公共通识课',
            },
            {
                value: 1,
                label: '专业选修课',
            },
            {
                value: 2,
                label: '专业必修课',
            },
        ];
        const gender = [
            {
                value: 'M',
                label: '男',
            },
            {
                value: 'F',
                label: '女',
            },
        ];
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <StaffBar click={this.handleMenuClick.bind(this)} open={this.state.open}/>
                    <Card
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-${anchor}`]]: open,
                        })}
                    >
                        <div className={classes.drawerHeader}/>
                        <Paper className={classes.base}>
                            <EnhancedTableToolbar numSelected={selected.length}
                                                  handleAddOpen={this.handleAddOpen.bind(this)}
                                                  handleAddClose={this.handleAddClose.bind(this)}
                                                  handleFilterOpen={this.handleFilterOpen.bind(this)}
                                                  handleFilterClose={this.handleFilterClose.bind(this)}
                                                  handleAccept={this.handleAccept.bind(this)}
                                                  handleRefuse={this.handleRefuse.bind(this)}
                                                  handleDelete={this.handleDelete.bind(this)}
                                                  type_anchorEl={this.state.type_anchorEl}
                                                  handleTypeNormalClose={this.handleTypeNormalClose.bind(this)}
                                                  handleTypeStudentClose={this.handleTypeStudentClose.bind(this)}
                                                  handleTypeFacultyClose={this.handleTypeFacultyClose.bind(this)}
                                                  handleTypeOpen={this.handleTypeOpen.bind(this)}/>
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
                                            const isSelected = this.isSelected(n.username);
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={event => this.handleSelectClick(event, n.username)}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.username}
                                                    selected={isSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox checked={isSelected}/>
                                                    </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {n.username}
                                                    </TableCell>
                                                    <TableCell>{n.id_number}</TableCell>
                                                    <TableCell>{n.name}</TableCell>
                                                    <TableCell>{n.gender}</TableCell>
                                                    <TableCell>{n.email}</TableCell>
                                                    <TableCell>{n.department}</TableCell>
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
                    </Card>
                </div>
                <div>
                    <Dialog
                        open={this.state.filter}
                        onClose={this.handleFilterClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">筛选用户</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                请输入相关用户信息，默认筛选方式为包含方式
                            </DialogContentText>

                            <div>
                                <Checkbox
                                    checked={this.state.username_filter_state}
                                    onChange={this.handleCheckChange('username_filter_state')}
                                />
                                <TextField
                                    label="用户名"
                                    value={this.state.username_filter}
                                    onChange={this.handleChange('username_filter')}
                                    disabled={!this.state.username_filter_state}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    checked={this.state.id_number_filter_state}
                                    onChange={this.handleCheckChange('id_number_filter_state')}
                                />
                                <TextField
                                    label="身份证号"
                                    value={this.state.id_number_filter}
                                    onChange={this.handleChange('id_number_filter')}
                                    disabled={!this.state.id_number_filter_state}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    checked={this.state.name_filter_state}
                                    onChange={this.handleCheckChange('name_filter_state')}
                                />
                                <TextField
                                    label="姓名"
                                    value={this.state.name_filter}
                                    onChange={this.handleChange('name_filter')}
                                    disabled={!this.state.name_filter_state}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    checked={this.state.gender_filter_state}
                                    onChange={this.handleCheckChange('gender_filter_state')}
                                />
                                <TextField
                                    select
                                    label="性别"
                                    value={this.state.gender_filter}
                                    onChange={this.handleChange('gender_filter')}
                                    disabled={!this.state.gender_filter_state}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    {gender.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </div>


                            <div>
                                <Checkbox
                                    checked={this.state.email_filter_state}
                                    onChange={this.handleCheckChange('email_filter_state')}
                                />
                                <TextField
                                    label="邮箱"
                                    value={this.state.email_filter}
                                    onChange={this.handleChange('email_filter')}
                                    disabled={!this.state.email_filter_state}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    checked={this.state.department_filter_state}
                                    onChange={this.handleCheckChange('department_filter_state')}
                                />
                                <TextField
                                    label="部门"
                                    value={this.state.department_filter}
                                    onChange={this.handleChange('department_filter')}
                                    disabled={!this.state.department_filter_state}
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
    }
}


AccountInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountInfo);
