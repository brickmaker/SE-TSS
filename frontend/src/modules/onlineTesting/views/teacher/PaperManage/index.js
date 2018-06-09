import React, {Component} from 'react';
import {connect} from "react-redux"

import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText
} from "material-ui"



import {getTeacherPaperList, deletePaper} from './actions'


function timestampToTime(timestamp) {
    let date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let  m = date.getMinutes() + ':';
    let s = date.getSeconds();
    return Y+M+D+h+m+s;
}

class DeleteButton extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>删除</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"确定要删除吗？"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {"删除后不可恢复"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.handleClose();}} color="primary">
                            {"否"}
                        </Button>
                        <Button onClick={()=>{this.handleClose(); this.props.act()}} color="primary" autoFocus>
                            {"是"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


class PaperManager extends Component{
    componentWillMount(){
        this.props.getTeacherPaperList(0, 0, 0);
    }


    render(){
        const {match, teacher_paper_list} = this.props;
        const {course_id} = match;

        const paperListItems = teacher_paper_list.map(
            (paperInfo, index)=>{
                return (
                    <TableRow key={index} >
                        <TableCell>{paperInfo.paper_name}</TableCell>
                        <TableCell>{timestampToTime(paperInfo.start_time)}</TableCell>
                        <TableCell>{timestampToTime(paperInfo.deadline)}</TableCell>
                        <TableCell>{ Math.ceil(paperInfo.duration/60)}minutes</TableCell>

                        <TableCell>
                            <Button
                                onClick={
                                    ()=>{
                                       const path = `${match.url}/paper_view/${paperInfo.paper_id}`;
                                       this.props.history.push(path);
                                    }
                                }
                            >
                                {"查看"}
                            </Button>
                            <DeleteButton   act={
                                (e)=>{
                                    this.props.deletePaper(0, 0, paperInfo.paper_id, 0);
                                }
                            }/>
                        </TableCell>

                    </TableRow>
                )
            }
        );

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>试卷名称</TableCell>
                            <TableCell>开始时间</TableCell>
                            <TableCell>截止日期</TableCell>
                            <TableCell>作答时间</TableCell>
                            <TableCell>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paperListItems}
                    </TableBody>
                    <TableFooter>
                        <TableRow style={{textAlign: 'center'} }>
                            <TableCell >
                                <Button
                                    onClick = {
                                        (e)=>{
                                            const path = `${match.url}/paper_generate`;
                                            this.props.history.push(path);
                                        }

                                    }
                                > 添加 </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        )
    }



}


const mapStateToProps = (state) => ({
    teacher_paper_list: state.online_testing.paper_manage.teacher_paper_list,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getTeacherPaperList: (teacherID, courseId, token)=>{
            return dispatch(getTeacherPaperList(teacherID,courseId, token));
        },
        deletePaper:(teacherID, courseID, paperID, token)=>{
            return dispatch(deletePaper(teacherID, courseID, paperID, token));
        }


    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PaperManager);
