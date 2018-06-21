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
    CircularProgress

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

class PaperView extends Component{
    constructor(props){
        super(props);
        this.state = Object.assign({}, this.state, {
            selection: "1"
        });
    }

    componentDidMount(){
        const {match, paper_info, selection, token} = this.props;
        const {paper_id} = match.params;
        this.props.getTeacherPaper(paper_id, token);
    }

    render(){
        const {match, paper_info, selection, token} = this.props;
        const {paper_id} = match.params;
        if(paper_info.course === undefined){
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
                                    <FormControlLabel key={i} value={i.toString()} control={<Radio />} label={choice} />
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
                                               <FormControl component="fieldset" required >
                                                   <RadioGroup value={(problem.answer_list[0] - 1).toString()}>
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
                                           <div>
                                                难度系数:{problem.level}
                                           </div>
                                           <div>
                                               考察范围:{problem.tag}
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
                                               <FormControl component="fieldset" required >
                                                   <RadioGroup value={problem.answer_list[0].toString()}>
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
                                           <div>
                                               难度系数:{problem.level}
                                           </div>
                                           <div>
                                               考察范围:{problem.tag}
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
                                value={selection.toString()}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={(e, value)=>{
                                    this.props.changeRenderTab(value);
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
                    <div style={styles.question_block}>
                        {renderTabs()}
                        {selection === '0' && <div>{judgeProblemList} </div>}
                        {selection === '1' && <div>{choiceProblemListItems}</div>}

                    </div>
                </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    paper_info: state.online_testing.paper_view.paper_info,
    selection: state.online_testing.paper_view.selection,
    token: state.online_testing.teacher_main.token,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getTeacherPaper: (paper_id, token)=>{
            return dispatch(getTeacherPaper(paper_id, token));
        },
        changeRenderTab: (selection)=>{
            return dispatch(changeRenderTab(selection));
        },
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(PaperView);
