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
    AppBar
} from "material-ui"

import {getStudentPaper, changeRenderTabExam, changeSolution} from './actions'



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

class Examination extends Component{
    componentWillMount(){
        this.props.getStudentPaper(0,0, 0, 0);
    }

    render(){
        const {paper_info, solutions, tab_id} = this.props;

        if(paper_info.question_list){
            let judgeCount = 0, choiceCount = 0;
            const choiceProblemListItems = paper_info.question_list.map(
                (problem, index)=>{
                    if (problem.question_type === 'Choice'){
                        choiceCount += 1;
                        const choiceListItems = problem.choice_list.map(
                            (choice, i)=>{
                                return (
                                    <FormControlLabel key={i} value={`${i}`} control={<Radio />} label={choice} />
                                )
                            }
                        );

                        return (
                            <Paper key={index}>
                                <Table>
                                    <tbody>
                                    <TableRow >
                                        <TableCell>{choiceCount}</TableCell>
                                        <TableCell>
                                            <Card>
                                                <CardHeader
                                                    title={problem.description}
                                                />
                                                <FormControl component="fieldset" required >
                                                    <RadioGroup
                                                        value={`${solutions[index]}`}
                                                        onChange={(e)=>{
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
                                        <TableCell>作者：{problem.teacher_name}</TableCell>
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
                    if (problem.question_type === 'Judge'){
                        judgeCount += 1;
                        return (
                            <Paper key={index}>
                                <Table>
                                    <tbody>
                                    <TableRow >
                                        <TableCell>{judgeCount}</TableCell>
                                        <TableCell>
                                            <Card>
                                                <CardHeader
                                                    title={problem.description}
                                                />
                                                <FormControl component="fieldset" required >
                                                    <RadioGroup
                                                        value={`${solutions[index]}`}
                                                        onChange={(e)=>{
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
                                        <TableCell>作者：{problem.teacher_name}</TableCell>
                                    </TableRow>
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
                                value={'1'}
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
                                value={'0'}
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
                                value={`${tab_id}`}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={(e, value)=>{
                                    this.props.changeRenderTabExam(value);
                                }}
                            >
                                <Tab value={"0"} label="判断题" />
                                <Tab value={"1"} label="选择题" />
                            </Tabs>
                        </AppBar>
                    )
                }
            };


            return (
                <Paper>
                    <div style={styles.title}>
                        hello
                    </div>
                    <Divider inset />
                    <div style={styles.info_1}>
                        试卷概述
                    </div>
                    <Divider inset />
                    <div style={styles.info_2}>
                        开放，结束，考试长度
                    </div>
                    <Divider inset />
                    <div style={styles.question_block}>
                        {renderTabs()}
                        {tab_id === '0' && <div>{judgeProblemList} </div>}
                        {tab_id === '1' && <div>{choiceProblemListItems}</div>}

                    </div>
                    <Button>
                        {"保存"}
                    </Button>
                    <Button>
                        {"提交"}
                    </Button>
                </Paper>

            )
        }
        else{
            return <div></div>
        }
    }
}

const mapStateToProps = (state) => ({
    paper_info: state.online_testing.examination.paper_info,
    tab_id: state.online_testing.examination.tab_id,
    solutions: state.online_testing.examination.solutions,
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
        }

    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Examination);
