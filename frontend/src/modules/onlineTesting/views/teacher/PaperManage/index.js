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
    return timestamp.toString().replace(/T/g, " ").split('.')[0];
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
    last_course_id=""

    componentDidUpdate(prevProps, prevState) {
        const {course_id} = this.props.match.params;
        if(course_id != this.last_course_id){
            this.last_course_id = course_id;
            this.update();
        }
    }



    update = ()=>{
        const {course_id} = this.props.match.params;
        const {token} = this.props;
        this.props.getTeacherPaperList(course_id, token);
    }

    componentDidMount(){
        this.update();
    }


    render(){
        const {match, teacher_paper_list} = this.props;
        const {course_id} = this.props.match.params;
        const {token} = this.props;
        const paperListItems = teacher_paper_list.map(
            (paperInfo, index)=>{
                return (
                    <TableRow key={index} >
                        <TableCell>{paperInfo.paper_name}</TableCell>
                        <TableCell>{timestampToTime(paperInfo.start_time)}</TableCell>
                        <TableCell>{timestampToTime(paperInfo.deadline)}</TableCell>
                        <TableCell>{ paperInfo.duration}minutes</TableCell>

                        <TableCell>
                            <Button
                                onClick={
                                    ()=>{
                                        const pathname = `${match.url}/paper_view/${paperInfo.paper_id}`;
                                        this.props.history.push(pathname);
                                    }
                                }
                            >
                                {"查看"}
                            </Button>
                            <DeleteButton   act={
                                ()=>{

                                    let headers = new Headers();
                                    headers.append(
                                        'Content-Type', 'application/json'
                                    )
                                    headers.append(
                                        'Authorization','JWT '+ localStorage.getItem('token')

                                    )
                                    fetch(`http://47.100.233.129:8080/api/online_testing/paper/${paperInfo.paper_id}/`, {
                                        method: 'DELETE',
                                        headers: headers
                                    })
                                        .then(response => {
                                            this.props.getTeacherPaperList(course_id, token);
                                        })
                                        .catch(err => console.log(err));



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
                                            const pathname = `${match.url}/paper_generate`;
                                            this.props.history.push(pathname);
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
    token: state.online_testing.teacher_main.token,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getTeacherPaperList: (courseId, token)=>{
            return dispatch(getTeacherPaperList(courseId, token));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PaperManager);
