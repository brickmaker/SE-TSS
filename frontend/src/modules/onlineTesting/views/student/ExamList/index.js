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

import {getStudentPaperList} from "./actions";


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


class ExamList extends Component{
    componentWillMount(){
        this.props.getStudentPaperList(0,0);
    }


    render(){
        const {match, student_paper_list} = this.props;
        const currentDate = new Date();
        const stamp = parseInt(Number(currentDate)/1000);
        const paperListItems = student_paper_list.map(
            (paperInfo, index)=>{
                const start_time = paperInfo.start_time, deadline = paperInfo.deadline;
                const flag1 = start_time < stamp, flag2 = deadline > stamp;

                const renderName = ()=>{
                    if(flag1 && flag2){
                        return (
                            <Button
                                color="primary"
                                onClick={(e)=>{
                                    this.props.history.push(`${match.url}/exam/${paperInfo.paper_id}`);
                                }
                                }
                            >
                                {paperInfo.paper_name}
                            </Button>)
                    }
                    else{
                        return paperInfo.paper_name;
                    }
                };

                const renderStatus = ()=>{
                    if(!flag1 ){
                        return "未开始";
                    }
                    else if (!flag2){
                        return "已结束";
                    }
                    else {
                        return "进行中";
                    }

                };

                return(
                    <TableRow key={index} >
                        <TableCell>{renderName()}</TableCell>
                        <TableCell>{timestampToTime(paperInfo.start_time)}</TableCell>
                        <TableCell>{timestampToTime(paperInfo.deadline)}</TableCell>
                        <TableCell>{ Math.ceil(paperInfo.duration/60)}minutes</TableCell>

                        <TableCell>
                            {renderStatus()}
                        </TableCell>

                    </TableRow>
                )
            }

        )

        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>试卷名称</TableCell>
                            <TableCell>开始时间</TableCell>
                            <TableCell>截止日期</TableCell>
                            <TableCell>作答时间</TableCell>
                            <TableCell>状态</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paperListItems}
                    </TableBody>
                </Table>
            </Paper>
        )
    }



}


const mapStateToProps = (state) => ({
    student_paper_list: state.online_testing.exam_list.student_paper_list,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getStudentPaperList: (teacherID, courseId, token)=>{
            return dispatch(getStudentPaperList(teacherID,courseId, token));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
