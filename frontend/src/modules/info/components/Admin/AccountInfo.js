import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as actionCreators from "../../actions/auth";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import DropZone from "../DropZone"
import Bar from "../../../../top/components/Bar";
import {gender, listItems, otherItems, grade, ranges} from "./AdminData";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';


import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import SelectIcon from '@material-ui/icons/SelectAll';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import {BACKEND_API, BACKEND_SERVER_URL} from "../../config";


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
    const {numSelected, classes, handleAddOpen, handleAddStudentBatchOpen, handleAddFacultyBatchOpen, handleAddStaffBatchOpen, handleBatchAddOpen, Open, handleFilterOpen, handleDelete, type_anchorEl, handleTypeNormalClose, handleTypeStudentClose, handleTypeFacultyClose, handleTypeStaffClose, handleTypeOpen} = props;

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
                    <MenuItem onClick={handleTypeStaffClose}>教务</MenuItem>
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
            <div className={classes.actions}>
                <Tooltip title="批量添加">
                    <IconButton aria-label="Add Batch" onClick={handleBatchAddOpen}>
                        <GroupAddIcon/>
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
        username: state.info.auth.username,
        data: state.info.auth.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


class AccountInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            order: 'asc',
            orderBy: 'username',
            selected: [],
            allowSelected: true,
            anchor: 'left',
            username: '',
            open: true,
            addStudent: false,
            addStaff: false,
            addStaffBatch: false,
            addStudentBatch: false,
            addFacultyBatch: false,
            addFaculty: false,
            filter: false,
            dialogState: false,
            originData: [],
            data: [],
            page: 0,
            tableState: 0,
            rowsPerPage: 5,
            dialogText: '',
            disabled: true,
            chipData: [],
            chipLabel: [],
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
            username: '',
            id_number: '',
            email: '',
            name: '',
            gender: 'M',
            department: '',
            grade: 2015,
            major: '',
            class_name: '',
            img: null,
            username_error: false,
            id_number_error: false,
            email_error: false,
            name_error: false,
            department_data: [],
            major_data: [],
            department_list: [],
            major_list: [],
            class_list: [],
        };
    }

    isDisabled = () => {
        let username_valid = (this.state.username !== '' && this.state.username.length < 20);
        let id_number_valid = (this.state.id_number.length === 18);
        let email_valid = (this.state.email !== '' && this.state.email.length < 20);
        let name_valid = (this.state.name !== '' && this.state.name.length < 20);
        console.log(username_valid);
        console.log(id_number_valid);
        console.log(email_valid);
        console.log(name_valid);
        this.setState({
            username_error: !username_valid,
            id_number_error: !id_number_valid,
            email_error: !email_valid,
            name_error: !name_valid,
            disabled: !(username_valid && id_number_valid && email_valid && name_valid)
        });
        return !(username_valid && id_number_valid && email_valid && name_valid);
    };

    handleDepartData = () => {

        fetch(BACKEND_SERVER_URL + BACKEND_API.get_department, {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({department_data: data}, () => {
                    let s = [];
                    data.forEach((value, index) => {
                        let t = {};
                        t.value = value.name;
                        t.label = value.name;
                        s.push(t);
                    });
                    this.setState({department_list: s});
                });
            })
            .catch(() => {
                this.setState({
                    dialogState: true,
                    dialogText: "服务器无响应",
                });
                // browserHistory.push("/login");
            });
        fetch(BACKEND_SERVER_URL + BACKEND_API.get_major, {
            method: 'GET',
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({major_data: data});
            })
            .catch(() => {
                this.setState({
                    dialogState: true,
                    dialogText: "服务器无响应",
                });
                // browserHistory.push("/login");
            });
    };


    handleAddOpen = () => {
        this.handleDepartData();
        if (this.state.account_type === 0) {
            this.handleAddStudentOpen();
        }
        if (this.state.account_type === 1) {
            this.handleAddFacultyOpen();
        }
        if (this.state.account_type === 2) {
            this.handleAddStaffOpen();
        }


    };

    handleBatchAddOpen = () => {
        if (this.state.account_type === 0) {
            this.handleAddStudentBatchOpen();
        } 
         else   if (this.state.account_type === 1) {
                this.handleAddFacultyBatchOpen();
            }
            else{
                this.handleAddStaffBatchOpen();

        }
    };

    handleAddClose = () => {
        if (this.state.account_type === 0) {
            this.handleAddStudentClose();
            this.setState({
                department: '',
                major: '',
                class_name: '',
            });
        }
        if (this.state.account_type === 1) {
            this.handleAddFacultyClose();
            this.setState({
                department: '',
            });
        }
        if (this.state.account_type === 2) {
            this.handleAddStaffClose();
            this.setState({
                department: '',
            });
        }

    };

    handleAddStudentSubmit = () => {
        // 这句话很关键
        let true_state = this.isDisabled();
        if (!true_state) {
            let data = {};
            data.username = this.state.username;
            data.id_number = this.state.id_number;
            data.email = this.state.email;
            data.name = this.state.name;
            data.gender = this.state.gender;
            data.department = this.state.department;
            data.grade = this.state.grade;
            data.major = this.state.major;
            data.class_name = this.state.class_name;
            data.user_type = this.state.account_type + 1;
            data.img = this.state.img;
            console.log(data);
            fetch(BACKEND_SERVER_URL + BACKEND_API.register_student, {
                method: 'POST',
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
                            dialogText: "学生添加成功",
                        });
                    } else {
                        this.setState({
                            dialogState: true,
                            dialogText: "学生添加失败"
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
            this.handleAddClose();
        }
        else {
            this.setState({
                dialogState: true,
                dialogText: "学生信息参数错误",
            });
        }
    };

    handleAddFacultySubmit = () => {
        // 这句话很关键
        let true_state = this.isDisabled();
        if (!true_state) {
            let data = {};
            data.username = this.state.username;
            data.id_number = this.state.id_number;
            data.email = this.state.email;
            data.name = this.state.name;
            data.gender = this.state.gender;
            data.department = this.state.department;
            data.user_type = this.state.account_type + 1;
            data.img = this.state.img;
            console.log(data);
            fetch(BACKEND_SERVER_URL + BACKEND_API.register_faculty, {
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
                            dialogText: "教师添加成功",
                        });
                    } else {
                        this.setState({
                            dialogState: true,
                            dialogText: "教师添加失败"
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
            this.handleAddClose();
        }
        else {
            this.setState({
                dialogState: true,
                dialogText: "教师信息参数错误",
            });
        }
    };

    handleAddStaffSubmit = () => {
        // 这句话很关键
        let true_state = this.isDisabled();
        if (!true_state) {
            let data = {};
            data.username = this.state.username;
            data.id_number = this.state.id_number;
            data.email = this.state.email;
            data.name = this.state.name;
            data.gender = this.state.gender;
            data.department = this.state.department;
            data.user_type = this.state.account_type + 1;
            data.img = this.state.img;
            fetch(BACKEND_SERVER_URL + BACKEND_API.register_staff, {
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
                            dialogText: "教务管理员添加成功",
                        });
                    } else {
                        this.setState({
                            dialogState: true,
                            dialogText: "教务管理员添加失败"
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
            this.handleAddClose();
        }
        else {
            this.setState({
                dialogState: true,
                dialogText: "教务管理员信息参数错误",
            });
        }
    };

    handleAddStudentOpen = () => {
        this.setState({addStudent: true});
    };

    handleAddStudentClose = () => {
        this.setState({addStudent: false});
    };

    handleAddStaffOpen = () => {
        this.setState({addStaff: true});
    };

    handleAddStaffClose = () => {
        this.setState({addStaff: false});
    };

    handleAddStaffBatchOpen = () => {
        this.setState({addStaffBatch: true});
    };

    handleAddStaffBatchClose = () => {
        this.setState({addStaffBatch: true});
    };


    handleAddStudentBatchOpen = () => {
        this.setState({addStudentBatch: true});
    };
    handleAddFacultyBatchOpen = () => {
        this.setState({addFacultyBatch: true});
    };

    handleAddStudentBatchClose = () => {
        this.setState({addStudentBatch: false});
    };
    handleAddFacultyBatchClose = () => {
        this.setState({addFacultyBatch: false});
    };

    handleAddStaffBatchClose = () => {
        this.setState({addStaffBatch: false});
    };

    handleAddFacultyOpen = () => {
        this.setState({addFaculty: true});
    };

    handleAddFacultyClose = () => {
        this.setState({addFaculty: false});
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
        if (this.state.gender_filter_state) {
            filterData = filterData.filter(item => item.gender.toString() === this.state.gender_filter.toString());
        }
        if (this.state.email_filter_state) {
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

    handleTypeStaffClose = () => {
        this.setState({type_anchorEl: null});
        this.setState({account_type: 2}, () => {
            this.handleInitData();
        });
    };

//TODO:
    handleInitData = () => {
        let url = BACKEND_API.get_student_info;
        if (this.state.account_type === 0) {
            url = BACKEND_API.get_student_info;
        } else if (this.state.account_type === 1) {
            url = BACKEND_API.get_faculty_info;
        } else if (this.state.account_type === 2) {
            url = BACKEND_API.get_staff_info;
        } else if (this.state.account_type === 3) {
            url = BACKEND_API.get_admin_info;
        }
        url = BACKEND_SERVER_URL + url;
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
        this.setState({username: localStorage.getItem('username')});
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

    handleDepartmentChange = prop => event => {
        this.setState({[prop]: event.target.value});
        let department = this.state.department_data.filter(item => item.name === event.target.value)[0];
        let s = [];
        department.major_for.forEach((value, index) => {
            let t = {};
            t.value = value;
            t.label = value;
            s.push(t);
        });
        this.setState({
            major_list: s,
            class_list: [],
            major: '',
            class_name: ''
        });
    };

    handleMajorChange = prop => event => {
        this.setState({[prop]: event.target.value});
        let department = this.state.major_data.filter(item => item.major === event.target.value)[0];
        let s = [];
        department.class_name_for.forEach((value, index) => {
            let t = {};
            t.value = value;
            t.label = value;
            s.push(t);
        });
        this.setState({class_list: s, class_name: ''});
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


    // 处理删除用户
    handleDelete = () => {
        let selected = this.state.selected;
        let base = BACKEND_API.get_student_info;
        if (this.state.account_type === 0) {
            base = BACKEND_API.get_student_info;
        } else if (this.state.account_type === 1) {
            base = BACKEND_API.get_faculty_info;
        } else if (this.state.account_type === 2) {
            base = BACKEND_API.get_staff_info;
        } else if (this.state.account_type === 3) {
            base = BACKEND_API.get_admin_info;
        }
        this.setState({selected: []});
        selected.forEach((value, index) => {
            let url = BACKEND_SERVER_URL + base + value + '/';
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
                            dialogText: "用户删除成功",
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
        const {classes, theme, history} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, anchor, open, tableState} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const children = (
            <div>
                <Paper className={classes.base}>
                    <EnhancedTableToolbar numSelected={selected.length}
                                          handleAddOpen={this.handleAddOpen.bind(this)}
                                          handleAddClose={this.handleAddClose.bind(this)}
                                          handleAddStudentBatchOpen={this.handleAddStudentBatchOpen.bind(this)}
                                          handleAddFacultyBatchOpen={this.handleAddFacultyBatchOpen.bind(this)}
                                          handleAddStaffBatchOpen={this.handleAddStaffBatchOpen.bind(this)}
                                          handleBatchAddOpen={this.handleBatchAddOpen.bind(this)}


                                          handleFilterOpen={this.handleFilterOpen.bind(this)}
                                          handleFilterClose={this.handleFilterClose.bind(this)}
                                          handleDelete={this.handleDelete.bind(this)}
                                          type_anchorEl={this.state.type_anchorEl}
                                          handleTypeNormalClose={this.handleTypeNormalClose.bind(this)}
                                          handleTypeStudentClose={this.handleTypeStudentClose.bind(this)}
                                          handleTypeFacultyClose={this.handleTypeFacultyClose.bind(this)}
                                          handleTypeStaffClose={this.handleTypeStaffClose.bind(this)}
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
                        open={this.state.addStudentBatch}
                        onClose={this.handleAddStudentBatchClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">注册学生</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                上传表格文件，
                                注意表格第一列的表头名称必须含有
                                "学号"、"身份证号"、 "姓名" 、"电子邮件" 、"性别" 、"入学年份"、 "专业" 、"学院" 、"班级"字段
                                <DropZone
                                    url_send={BACKEND_API.batch_add_student}
                                />
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={this.state.addFacultyBatch}
                        onClose={this.handleAddFacultyBatchClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">注册教师</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                注意表格第一列的表头名称必须含有
                                "教工号"、"身份证号"、 "姓名" 、"电子邮件" 、"性别" 、"学院" 、"职称"字段

                                <DropZone
                                    url_send={BACKEND_API.batch_add_faculty}/>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={this.state.addStaffBatch}
                        onClose={this.handleAddStaffBatchClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">注册教务管理人员</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                注意表格第一列的表头名称必须含有
                                "教工号"、"身份证号"、 "姓名" 、"电子邮件" 、"性别" 、"学院" 字段
                                <DropZone
                                    url_send={BACKEND_API.batch_add_staff}/>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={this.state.addFaculty}
                        onClose={this.handleAddFacultyClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">注册教师</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                请输入用户信息
                            </DialogContentText>
                            <TextField
                                autoFocus
                                fullWidth
                                label="用户名"
                                onChange={this.handleChange('username')}
                                margin="normal"
                                error={this.state.username_error}
                            />
                            <TextField
                                fullWidth
                                label="身份证号"
                                onChange={this.handleChange('id_number')}
                                margin="normal"
                                error={this.state.id_number_error}
                            />
                            <TextField
                                fullWidth
                                label="姓名"
                                onChange={this.handleChange('name')}
                                margin="normal"
                                error={this.state.name_error}
                            />
                            <TextField
                                fullWidth
                                label="邮箱"
                                onChange={this.handleChange('email')}
                                margin="normal"
                                error={this.state.email_error}
                            />
                            <TextField
                                fullWidth
                                select='true'
                                label="性别"
                                margin="normal"
                                value={this.state.gender}
                                onChange={this.handleChange('gender')}
                            >
                                {gender.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                select='true'
                                label="学院"
                                margin="normal"
                                value={this.state.department}
                                onChange={this.handleDepartmentChange('department')}
                            >
                                {this.state.department_list.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleAddClose} color="primary">
                                关闭
                            </Button>
                            <Button onClick={(e) => this.handleAddFacultySubmit(e)} color="primary">
                                提交
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={this.state.addStaff}
                        onClose={this.handleAddStaffClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">注册教务管理员</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                请输入用户信息
                            </DialogContentText>
                            <TextField
                                autoFocus
                                fullWidth
                                label="用户名"
                                onChange={this.handleChange('username')}
                                margin="normal"
                                error={this.state.username_error}
                            />
                            <TextField
                                fullWidth
                                label="身份证号"
                                onChange={this.handleChange('id_number')}
                                margin="normal"
                                error={this.state.id_number_error}
                            />
                            <TextField
                                fullWidth
                                label="姓名"
                                onChange={this.handleChange('name')}
                                margin="normal"
                                error={this.state.name_error}
                            />
                            <TextField
                                fullWidth
                                label="邮箱"
                                onChange={this.handleChange('email')}
                                margin="normal"
                                error={this.state.email_error}
                            />
                            <TextField
                                fullWidth
                                select='true'
                                label="性别"
                                margin="normal"
                                value={this.state.gender}
                                onChange={this.handleChange('gender')}
                            >
                                {gender.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                select='true'
                                label="学院"
                                margin="normal"
                                value={this.state.department}
                                onChange={this.handleDepartmentChange('department')}
                            >
                                {this.state.department_list.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleAddClose} color="primary">
                                关闭
                            </Button>
                            <Button onClick={(e) => this.handleAddStaffSubmit(e)} color="primary">
                                提交
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={this.state.addStudent}
                        onClose={this.handleAddStudentClose}
                    >
                        <DialogTitle id="form-dialog-title">注册学生</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                请输入用户信息
                            </DialogContentText>
                            <TextField
                                autoFocus
                                fullWidth
                                label="用户名"
                                onChange={this.handleChange('username')}
                                margin="normal"
                                error={this.state.username_error}
                            />
                            <TextField
                                fullWidth
                                label="身份证号"
                                onChange={this.handleChange('id_number')}
                                margin="normal"
                                error={this.state.id_number_error}
                            />
                            <TextField
                                fullWidth
                                label="姓名"
                                onChange={this.handleChange('name')}
                                margin="normal"
                                error={this.state.name_error}
                            />
                            <TextField
                                fullWidth
                                label="邮箱"
                                onChange={this.handleChange('email')}
                                margin="normal"
                                error={this.state.email_error}
                            />
                            <TextField
                                fullWidth
                                select='true'
                                label="性别"
                                margin="normal"
                                value={this.state.gender}
                                onChange={this.handleChange('gender')}
                            >
                                {gender.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                select='true'
                                label="年级"
                                margin="normal"
                                value={this.state.grade}
                                onChange={this.handleChange('grade')}
                            >
                                {grade.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                select='true'
                                label="开课学院"
                                margin="normal"
                                value={this.state.department}
                                onChange={this.handleDepartmentChange('department')}
                            >
                                {this.state.department_list.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                select='true'
                                label="主修专业"
                                margin="normal"
                                value={this.state.major}
                                onChange={this.handleMajorChange('major')}
                            >
                                {this.state.major_list.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                select='true'
                                label="专业班级"
                                margin="normal"
                                value={this.state.class_name}
                                onChange={this.handleChange('class_name')}
                            >
                                {this.state.class_list.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleAddClose} color="primary">
                                关闭
                            </Button>
                            <Button onClick={(e) => this.handleAddStudentSubmit(e)} color="primary">
                                提交
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
                history={history}
                children={
                    children
                }
            />

        );
    }
}


AccountInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AccountInfo))

