import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types"
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
    DialogContentText,
    CircularProgress
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
    state = Object.assign({}, this.state, {open:false});

    static propTypes ={
        token:PropTypes.string,
    };

    last_course_id="";

    componentDidUpdate(prevProps, prevState) {
        const {course_id} = this.props.match.params;
        if(course_id != this.last_course_id){
            this.last_course_id = course_id;

            this.update();
        }
    }

    update=()=>{
        const{token} = this.props;
        const{course_id} = this.props.match.params;
        this.props.getStudentPaperList(course_id,token);
    }

    componentDidMount(){
       this.update();
    }

    handleClickOpen = () => {
        this.setState(Object.assign({}, this.state, {open:true}));
    };

    handleClose = () => {
        this.setState(Object.assign({}, this.state, {open:false})) ;
    };

    render(){
        const {match, student_paper_list} = this.props;
        if(student_paper_list.length===0){
            return  <CircularProgress />
        }
        const currentDate = new Date();
        const stamp = new Date().valueOf();

        const paperListItems = student_paper_list.map(
            (paperInfo, index)=>{
                const start_time = new Date(paperInfo.start_time).valueOf(), deadline = new Date(paperInfo.deadline).valueOf();
                const flag1 = start_time < stamp, flag2 = deadline > stamp;
                const renderName = ()=>{
                    if(flag1 && flag2 && !paperInfo.done){
                        return (
                            <Button
                                color="primary"
                                onClick={(e)=>{
                                    this.state.temp_paper_id = paperInfo.paper_id;
                                    this.handleClickOpen();
                                }
                                }
                            >
                                {paperInfo.paper_name}
                            </Button>)
                    }
                    else{
                        return (
                            <Button
                                color="default"
                            >
                                {paperInfo.paper_name}
                            </Button>
                        );
                    }
                };

                const renderStatus = ()=>{
                    if(!flag1 ){
                        return "未开始";
                    }
                    else if (!flag2){
                        return "已结束";
                    }
                    else if(paperInfo.done) {
                        return "已作答";
                    }
                    else {
                        return "进行中";
                    }

                };

                return(
                    <TableRow key={index} >
                        <TableCell>{renderName()}</TableCell>
                        <TableCell>{(paperInfo.start_time)}</TableCell>
                        <TableCell>{(paperInfo.deadline)}</TableCell>
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
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"确定要开始作答？"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {"点击确定后开始计时"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.handleClose();}} color="primary">
                            {"否"}
                        </Button>
                        <Button onClick={()=>{
                            this.handleClose();
                            this.props.history.push(`${match.url}/exam/${this.state.temp_paper_id}`);
                        }} color="primary" autoFocus>
                            {"是"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        )
    }



}


const mapStateToProps = (state) => ({
    student_paper_list: state.online_testing.exam_list.student_paper_list,
    token:state.online_testing.student_main.token,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getStudentPaperList: (courseId, token)=>{
            return dispatch(getStudentPaperList(courseId, token));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
