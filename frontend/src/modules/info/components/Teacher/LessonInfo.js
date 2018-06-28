import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as actionCreators from "../../actions/auth";
import {getRes} from "../../actions/auth";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

import Bar from "../../../../top/components/Bar";
import {lessonColumnData, listItems, otherItems, ranges, ranges_term, stateChoices} from "./TeacherData";
import {BACKEND_API, BACKEND_SERVER_URL} from "../../config";
import Teacher_EnhancedTableHead from './EnhancedTable';
import {
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import SelectIcon from '@material-ui/icons/SelectAll';
import StarIcon from '@material-ui/icons/Star';
import {lighten} from '@material-ui/core/styles/colorManipulator';

function mapStateToProps(state) {
    return {

    };
}

const styles = theme => ({
    base: {
        width: '100%',
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    Card:{
      margin: '20px',
      position: 'relative',
      overflow:  'auto',
      height: '50%',
      width: '90%',
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
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
let EnhancedTableToolbar = props => {
    const {numSelected, classes, handleAddOpen, applyState, handleAccept, handleRefuse, handleDelete} = props;

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

            {/* <div className={classes.actions}> */}
                {/* {!applyState ? ( */}
                    {/* <Tooltip title="申请课程列表">
                        <IconButton aria-label="Process" onClick={handleTableData}>
                            <SelectIcon/>
                        </IconButton>
                    </Tooltip> */}
                {/* ) : (
                    <Tooltip title="普通">
                        <IconButton aria-label="Normal" onClick={handleTableData}>
                            <StarIcon/>
                        </IconButton>
                    </Tooltip>
                )} */}
            {/* </div> */}

            <div className={classes.actions}>
            <Tooltip title="申请">
                <IconButton aria-label="Add Course" onClick={handleAddOpen}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
            </div>
            <div className={classes.actions}>
                {/* { applyState && */}
                    <Tooltip title="删除">
                        <IconButton aria-label="Add Course" onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                {/* } */}
            </div>

        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);




class LessonInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            allowSelected: true,
            open: true,
            add: false,
            selected: [],
            dialogState: false,
            originData: [],
            data: [],
            page: 0,
            rowsPerPage: 5,
            course_id: '',
            course_name: '',
            course_credit: -1,
            course_cap: -1,
            // course_room: '',
            course_assessment: '',
            course_teacher: '',
            course_type: -1,
            course_term: -1,
            id_error: false,
            name_error: false,
            credit_error: false,
            cap_error: false,
            // room_error: false,
            dialogText: '',
            disabled: true,
            chipData:[],
            chipLabel: [],
            applyState: true,
            department_data: '',
            department_list: [],
            department: '',
        };
    }
    handleInitData = () => {
        // TODO
        getRes(BACKEND_API.get_course_faculty)
            .then((data) => {
                let json = JSON.parse(data);
                this.setState({originData: json, data: json});
                this.setState({
                            data: this.state.originData.filter(item => item.state === 1 || item.state === 2).sort((a, b) => (a.course_id < b.course_id ? -1 : 1)),
                            allowSelected: false
                });
            })
            .catch(() => {
                this.setState({
                    dialogState: true,
                    dialogText: "服务器无响应",
                });
            });
    };

    //TODO:get teacher's courses
    componentDidMount() {
        this.handleInitData();
        this.setState({username: localStorage.getItem('username')});
    }

    // 处理表数据，审批状态和非审配状态
    // handleTableData = () => {
    //     if (!this.state.applyState) {
    //         this.setState({
    //             data: this.state.originData.filter(item => item.state === 1).sort((a, b) => (a.course_id < b.course_id ? -1 : 1)),
    //             allowSelected: false
    //         });
    //     } else {
    //         this.setState({data: this.state.originData, allowSelected: true});
    //     }
    //     this.setState({applyState: !this.state.applyState});
    //     this.setState({selected: []});
    // };

    // 添加课程窗口打开
    handleAddOpen = () => {
        this.handleDepartData();
        this.setState({add: true});
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

    // 注册合法性判断
    isDisabled = () => {
        let id_valid = (this.state.course_id !== '' && this.state.course_id.length < 10);
        let name_valid = (this.state.course_name !== '' && this.state.course_name.length < 40);
        let credit_valid = (this.state.course_credit !== -1 && (this.state.course_credit <= 10 && this.state.course_credit > 0));
        let cap_valid = (this.state.course_cap !== -1 && (this.state.course_cap <= 300 && this.state.course_cap > 0));
        // let room_valid = (this.state.course_room !== '');
        let term_valid = (this.state.course_term !== '');

        this.setState({
            id_error: !id_valid,
            name_error: !name_valid,
            credit_error: !credit_valid,
            cap_error: !cap_valid,
            // room_error: !room_valid,
            disabled: !(id_valid && name_valid && credit_valid && cap_valid && term_valid)
        });
        return !(id_valid && name_valid && credit_valid && cap_valid && term_valid);
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
            // data.classroom = this.state.course_room;
            data.assessment = this.state.course_assessment;
            data.state = 1;
            data.faculty = this.state.chipLabel;
            data.semester = this.state.course_term;
            data.department = this.state.department;
            let url = BACKEND_SERVER_URL + BACKEND_API.register_course;
            fetch(url,
                {
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
    // 添加课程窗口关闭
    handleAddClose = () => {
        this.setState({add: false});
        const chipData = [...this.state.chipData];
        chipData.splice(0, chipData.length);
        this.setState({chipData});
        const chipLabel = [...this.state.chipLabel];
        chipLabel.splice(0, chipLabel.length);
        this.setState({chipLabel});
        this.setState({course_type: -1, course_term: -1});
    };

    // 提示窗口关闭
    handleDialogClose = () => {
        this.setState({dialogState: false});
    };

    // 教师搜索
    handleFacultySearch = () => {
        let faculty = this.state.course_teacher;
        let status;
        if (faculty === '') {
            return;
        } else {
            let url = BACKEND_SERVER_URL + BACKEND_API.search_faculty + faculty + '/';
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

    // 教师便条删除
    handleChipDelete = data => () => {
        const chipData = [...this.state.chipData];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        this.setState({chipData});
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
    };
    // 删除课程
    handleDelete = () => {
        let selected = this.state.selected;
        this.setState({selected: []});
        selected.forEach((value, index) => {
            let url = BACKEND_SERVER_URL + BACKEND_API.get_course + value + '/';
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
                });
        });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, theme,  history} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, anchor, open, applyState} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        const children = (
            <div>
                <Paper className={classes.base}>
                    <EnhancedTableToolbar numSelected={selected.length}
                                          handleAddOpen={this.handleAddOpen.bind(this)}
                                          handleAddClose={this.handleAddClose.bind(this)}
                                        //   handleTableData={this.handleTableData.bind(this)}
                                          handleDelete={this.handleDelete.bind(this)}
                                          applyState = {applyState}
                                         />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <Teacher_EnhancedTableHead
                                columnData={lessonColumnData}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
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
                                            <TableCell>{stateChoices[n.state]}</TableCell>
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
                                select='true'
                                label="学期类型"
                                margin="normal"
                                value={this.state.course_term}
                                onChange={this.handleChange('course_term')}
                            >
                                {ranges_term.map(option => (
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


LessonInfo.propType = {
    username: PropTypes.string,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LessonInfo));