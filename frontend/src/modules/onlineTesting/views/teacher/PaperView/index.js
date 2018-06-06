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

import {getTeacherPaper, changeRenderTab} from './actions'


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

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class PaperView extends Component{
    constructor(props){
        super(props);
        this.state = Object.assign({}, this.state, {
            selection: "1"
        });
    }

    componentWillMount(){
        this.props.getTeacherPaper(0,0,0,0);
    }

    render(){
        const {match, paper_info, selection} = this.props;
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
                                                   <RadioGroup value={`${problem.answer_list[0] - 1}`}>
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
                                                   <RadioGroup value={`${problem.answer_list[0] - 1}`}>
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
                                value={`${selection}`}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={(e, value)=>{
                                    this.props.changeRenderTab(value);
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
                        {selection === '0' && <div>{judgeProblemList} </div>}
                        {selection === '1' && <div>{choiceProblemListItems}</div>}

                    </div>
                </Paper>

            )
        }
        else{
            return <div></div>
        }
    }
}

const mapStateToProps = (state) => ({
    paper_info: state.online_testing.paper_view.paper_info,
    selection: state.online_testing.paper_view.selection,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getTeacherPaper: (teacherID, courseId, paperID, token)=>{
            return dispatch(getTeacherPaper(teacherID,courseId, paperID, token));
        },
        changeRenderTab: (selection)=>{
            return dispatch(changeRenderTab(selection));
        },
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(PaperView);
