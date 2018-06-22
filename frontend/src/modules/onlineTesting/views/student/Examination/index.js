import React, {Component} from "react"
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
    DialogContentText,
    Divider,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    FormControlLabel,
    Card,
    CardHeader,
    Tab,
    Tabs,
    List,
    Typography,
    AppBar,
    CircularProgress,
    Snackbar
} from "material-ui"

import CloseIcon from "@material-ui/icons/Close"

import {getStudentPaper, changeRenderTabExam, changeSolution, setLeftTime} from './actions'



const styles = {
    title:{
        width: "100%"
    },
    info_1:{
        width: "100%"
    },
    info_2:{
        width: "100%"
    },
    question_block:{
        width: "100%"
    },
};

let secondsToHourAndMinutes=(left_time)=>{
    let leftTime = parseInt(left_time);
    if(leftTime < 60) {
        return leftTime.toString()+"秒"
    }
    else if (left_time < 3600){
        let minutes = parseInt(leftTime / 60);
        let seconds = leftTime%60;
        return minutes.toString() + "分" + seconds.toString() + "秒";
    }
    else {
        let hours = parseInt(leftTime/3600);
        let minutes = parseInt((leftTime % 3600) / 60);
        let seconds = leftTime%60;
        return hours.toString() + "小时" + minutes.toString() + "分" + seconds.toString() + "秒";
    }
}


class Examination extends Component{

    state = Object.assign({}, this.state, {snackbar_open:false, dialog_open:false, snackbar_message:""});

    handleDialogOpen = () => {
        this.setState(Object.assign({}, this.state, {dialog_open:true}));
    };

    handleSnackbarOpen = (message) => {
        this.setState(Object.assign({}, this.state, {snackbar_open:true, snackbar_message:message}));
    };

    handleSnackbarClose = () => {
        this.setState(Object.assign({}, this.state, {snackbar_open:false}));
    };

    handleDialogClose = () => {
        this.setState(Object.assign({}, this.state, {dialog_open:false}));
    };


    componentDidMount(){
        const{token, left_time} = this.props;
        console.log(this);
        const{paper_id} = this.props.match.params;
        this.props.getStudentPaper(0,0, paper_id,token);
        this.interval = setInterval(() => {
            if(this.props.left_time>0){
                if(parseInt(this.props.left_time) == 5870){
                    this.handleSnackbarOpen("还有5分钟考试结束");
                }
                this.props.setLeftTime(this.props.left_time - 1);

            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        const {grade, match, paper_info, solutions, token, tab_id, left_time, exam_id} = this.props;
        const {paper_id} = match.params;
        console.log(this.props.history);
        if(paper_info.paper_id === undefined){
            return < CircularProgress/>
        }
        let judgeCount = 0, choiceCount = 0;
        const choiceProblemListItems = paper_info.question_list.map(
            (problem, index)=>{
                if (problem.type === 'Choice'){
                    choiceCount += 1;
                    const choiceListItems = problem.choice_list.map(
                        (choice, i)=>{
                            return (
                                <FormControlLabel
                                    key={i} value={i.toString()} control={<Radio />} label={choice} />
                            )
                        }
                    );

                    return (
                        <Paper key={index}>
                            <Table>
                                <tbody>
                                <TableRow >
                                    <TableCell>{choiceCount}</TableCell>
                                    <TableCell style={{maxWidth: "300px", fontSize: 15}}>
                                        <Card>
                                            <CardHeader
                                                title={problem.description}
                                            />
                                            <FormControl
                                                disabled={!(left_time > 0)}
                                                component="fieldset" required >
                                                <RadioGroup
                                                    value={`${solutions[index]}`}
                                                    onChange={(e) => {
                                                        let tempSolutions = solutions.slice(0);
                                                        tempSolutions[index] = e.target.value;
                                                        console.log("fucj", tempSolutions);
                                                        this.props.changeSolution(tempSolutions);
                                                    }}
                                                >
                                                    {choiceListItems}
                                                </RadioGroup>
                                            </FormControl>
                                        </Card>


                                    </TableCell>
                                    <TableCell style={{maxWidth: "100px"}}>
                                        <div>
                                            作者:{problem.teacher_name}
                                        </div>
                                        <div>
                                            分值:{paper_info.score_list[index]}
                                        </div>
                                    </TableCell>
                                </TableRow>
                                </tbody>
                            </Table>
                            <Divider/>
                        </Paper>
                    )
                }
            }
        );


        const judgeProblemList = paper_info.question_list.map(
            (problem, index)=>{
                if (problem.type === 'Judge'){
                    judgeCount += 1;
                    return (
                        <Paper key={index}>
                            <Table>
                                <tbody>
                                <TableRow >
                                    <TableCell>{judgeCount}</TableCell>
                                    <TableCell style={{maxWidth: "300px", fontSize: 15}}>
                                        <Card>
                                            <CardHeader
                                                title={problem.description}
                                            />
                                            <FormControl

                                                disabled={!(left_time > 0)}

                                                component="fieldset" required >
                                                <RadioGroup
                                                    value={`${solutions[index]}`}
                                                    onChange={(e) => {
                                                        let tempSolutions = solutions.slice(0);
                                                        tempSolutions[index] = e.target.value;
                                                        this.props.changeSolution(tempSolutions);
                                                    }}
                                                >
                                                    <FormControlLabel value={"0"} control={<Radio />} label={"true"} />
                                                    <FormControlLabel value={"1"} control={<Radio />} label={"false"} />
                                                </RadioGroup>
                                            </FormControl>
                                        </Card>


                                    </TableCell>
                                    <TableCell style={{maxWidth: "100px"}}>
                                        <div>
                                            作者:{problem.teacher_name}
                                        </div>
                                        <div>
                                            分值:{paper_info.score_list[index]}
                                        </div>
                                    </TableCell>                                   </TableRow>
                                </tbody>
                            </Table>
                            <Divider/>
                        </Paper>

                    )

                }
            }
        );

        const renderTabs = ()=>{
            if(judgeCount === 0){
                return (
                    <AppBar position="static" color="default">
                        <Tabs
                            value="1"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="选择题" />
                        </Tabs>
                    </AppBar>
                )
            }
            else if(choiceCount === 0){
                return (
                    <AppBar position="static" color="default">
                        <Tabs
                            value="0"
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="判断题" />
                        </Tabs>
                    </AppBar>
                )
            }
            else{
                return (
                    <AppBar position="static" color="default">
                        <Tabs
                            value={tab_id}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(e, value)=>{
                                this.props.changeRenderTabExam(value);
                            }}
                        >
                            <Tab value="0" label="判断题" />
                            <Tab value="1" label="选择题" />
                        </Tabs>
                    </AppBar>
                )
            }
        };

        return (
            <Paper>
                <div style={styles.title}>
                    <h2>{paper_info.paper_name}</h2>
                </div>
                <Divider inset />
                <Divider inset />

                <div style={styles.info_2}>
                    <h3> {"考试时长 : " + `${ Math.ceil(paper_info.duration)}` + ' 分钟'}</h3>
                </div>
                <Divider inset />
                <Divider inset />
                <div style={styles.question_block}>
                    {renderTabs()}
                    {tab_id === '0' && <div>{judgeProblemList} </div>}
                    {tab_id === '1' && <div>{choiceProblemListItems}</div>}

                </div>
                <div>
                    <Button
                        disabled={!(left_time > 0)}
                        onClick={(e=>{
                            let answer = {};
                            paper_info.question_list.forEach((question, index)=>{
                                answer[question.question_id] = [parseInt(solutions[index])]
                            });
                            console.log(answer);
                            let headers = new Headers();
                            headers.append(
                                'Content-Type', 'application/json'
                            )
                            headers.append(
                                'Authorization','JWT '+ localStorage.getItem('token')

                            )
                            fetch(`http://127.0.0.1:8000/api/online_testing/examination/${exam_id}/conservation/`, {
                                method: 'POST',
                                headers: headers,
                                body:JSON.stringify({
                                    answers:answer
                                }),
                            })
                                .then(response =>response.json())
                                .then(response=>{
                                    console.log("save result", response);
                                    this.handleSnackbarOpen("保存成功");
                                })
                                .catch(err => console.log(err));
                        })}
                    >
                        保存
                    </Button>
                    <Button
                        disabled={!(left_time > 0)}
                        onClick={(e)=>{
                            this.handleDialogOpen();
                        }}

                    >
                        提交
                    </Button>

                </div>
                <div style={{maxWidth:200}}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={this.state.snackbar_open}
                        autoHideDuration={6000}
                        onClose={this.handleSnackbarClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{this.state.snackbar_message}</span>}
                        action={[
                            <Button
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleSnackbarClose}
                            >
                                <CloseIcon />
                            </Button>,
                        ]}
                    />
                    <Snackbar
                        style={{
                            width:200,
                            maxWidth:200,
                            opacity:0.4
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={true}
                        onClose={this.handleSnackbarClose}
                        message={<span>{"剩余时间 : " +secondsToHourAndMinutes(this.props.left_time)}</span>}
                    />
                </div>
                <Dialog
                    open={this.state.dialog_open}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"确定要提交吗？"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={()=>{this.handleDialogClose();}} color="primary" autoFocus>
                            {"否"}
                        </Button >
                        <Button onClick={(e)=>{
                            let answer = {};
                            paper_info.question_list.forEach((question, index)=>{
                                answer[question.question_id] = [parseInt(solutions[index])]
                            });
                            console.log(answer);
                            let headers = new Headers();
                            headers.append(
                                'Content-Type', 'application/json'
                            )
                            headers.append(
                                'Authorization','JWT '+ localStorage.getItem('token')

                            )
                            fetch(`http://127.0.0.1:8000/api/online_testing/examination/${exam_id}/submission/`, {
                                method: 'POST',
                                headers: headers,
                            })
                                .then(response =>response.json())
                                .then( response=> {
                                    console.log("submit result", response);

                                    alert("提交成功, 你的成绩为 "+ response.score.toString());
                                    this.props.history.goBack();
                                })
                                .catch(err => console.log(err));


                        }} color="primary" >
                            {"是"}
                        </Button>
                    </DialogActions>
                </Dialog>


            </Paper>
        )


    }
}

const mapStateToProps = (state) => ({
    paper_info: state.online_testing.examination.paper_info,
    tab_id: state.online_testing.examination.tab_id,
    solutions: state.online_testing.examination.solutions,
    exam_id: state.online_testing.examination.exam_id,
    left_time: state.online_testing.examination.left_time,
    token:state.online_testing.student_main.token,
    grade: state.online_testing.examination.grade,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getStudentPaper: (studentID, courseId, paperID, token)=>{
            return dispatch(getStudentPaper(studentID,courseId, paperID, token));
        },
        changeRenderTabExam: (selection)=>{
            return dispatch(changeRenderTabExam(selection));
        },
        changeSolution:(solutions)=>{
            return dispatch(changeSolution(solutions));
        },
        setLeftTime:(left_time)=>{
            return dispatch(setLeftTime(left_time));
        }


    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Examination);
