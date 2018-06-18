import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as actionCreators from "../../actions/auth";
import {getRes} from "../../actions/auth";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

import Bar from "../../../../top/components/Bar";
import {ColumnData, listItems, otherItems} from "./AdminData";
import {BACKEND_API} from "../../config";
import Admin_EnhancedTableHead from './EnhancedTable';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
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
import FilterListIcon from '@material-ui/icons/FilterList';
import {lighten} from '@material-ui/core/styles/colorManipulator';

function mapStateToProps(state) {
    return {
    };
}

const styles = theme => ({
    base: {
        width: '100%',
        overflow:  'auto',
    },
    chip: {
        margin: theme.spacing.unit / 2,
        overflow:  'auto',
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
    overflow:  'auto',
});
let EnhancedTableToolbar = props => {
    const {numSelected, classes, handleDelete, handleFilterOpen} = props;

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
                        日志信息
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>

            <div className={classes.actions}>

                <Tooltip title="筛选">
                    <IconButton aria-label="Filter" onClick={handleFilterOpen}>
                        <FilterListIcon/>
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



class LogInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'time',
            username: '',
            drawerOpen: true,
            open: true,
            add: false,
            selected: [],
            dialogState: false,
            originData: [],
            data: [],
            page: 0,
            rowsPerPage: 5,
            tableState:false,
            dialogText: '',
            disabled: true,
            filter:false,
            time_filter: '',
            time_filter_state: false,
            content_filter: '',
            content_filter_state: false,
            orderBy:'time',

        };
    }
    handleInitData = () => {
        //TODO: get log
        getRes(BACKEND_API.get_log)
            .then((data) => {
                this.setState({originData: data, data:data});
            })
            .catch(() => {
                this.setState({
                    dialogState: true,
                    dialogText: "服务器无响应",
                });
            });
    };

    componentDidMount() {
        this.handleInitData();
        this.setState({username: localStorage.getItem('username')});
    }
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
    // 过滤窗口打开
    handleFilterOpen = () => {
        this.setState({filter: true});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };
    // 过滤窗口关闭
    handleFilterClose = () => {
        this.setState({filter: false});
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    // 过滤提交
    handleFilterSubmit = () => {
        let data = this.state.originData;
        let filterData = data;
        if (this.state.time_filter_state) {
            filterData = filterData.filter(item => item.time.indexOf(this.state.time_filter) !== -1);
        }
        if (this.state.content_filter_state) {
            filterData = filterData.filter(item => item.content.indexOf(this.state.content_filter) !== -1);
        }

        this.setState({data: filterData});
        this.handleFilterClose();
    };

    handleCheckChange = name => event => {
        if (!event.target.checked) {
            this.setState({[name.substring(0, name.length - 6)]: ''});
        }
        this.setState({[name]: event.target.checked});
    };

    render() {
        const {classes, theme,  history} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page, anchor, open, } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        const children = (
            <div>
                <Paper className={classes.base}>
                    <EnhancedTableToolbar numSelected={selected.length}
                                          handleFilterOpen={this.handleFilterOpen.bind(this)}
                                          handleFilterClose={this.handleFilterClose.bind(this)}

                    />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <Admin_EnhancedTableHead
                                columnData={ColumnData}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={this.handleRequestSort}
                                rowCount={data.length}
                            />
                            <TableBody>
                                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    return (
                                        <TableRow
                                            hover
                                        >
                                            <TableCell>{n.time}</TableCell>
                                            <TableCell>{n.content}</TableCell>
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
                        <DialogTitle id="form-dialog-title">筛选日志</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                请输入相关日志信息，默认筛选方式为包含方式
                            </DialogContentText>

                            <div>
                                <Checkbox
                                    checked={this.state.time_filter_state}
                                    onChange={this.handleCheckChange('time_filter_state')}
                                />
                                <TextField
                                    label="时间"
                                    value={this.state.time_filter}
                                    onChange={this.handleChange('time_filter')}
                                    disabled={!this.state.time_filter_state}
                                />
                            </div>
                            <div>
                                <Checkbox
                                    checked={this.state.content_filter_state}
                                    onChange={this.handleCheckChange('content_filter_state')}
                                />
                                <TextField
                                    label="日志内容"
                                    value={this.state.content_filter}
                                    onChange={this.handleChange('content_filter')}
                                    disabled={!this.state.content_filter_state}
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


LogInfo.propType = {
    username: PropTypes.string,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LogInfo));