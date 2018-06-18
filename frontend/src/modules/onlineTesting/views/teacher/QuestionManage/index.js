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
    StepLabel,
    Step,
    Stepper,
    TextField,
    InputAdornment,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    Input,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    ExpansionPanel,

} from "material-ui"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import {
    getProblemList,
    getTeacherAndTagList,
    addProblemTeacher,
    deleteProblemTeacher
} from './actions'

import {
    ProblemAdd,
    ProblemView
} from "./ProblemDetail/index";

const CUT_LENTH = 20;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



class QuestionManage extends Component{
    componentWillMount(){
        this.props.getTeacherAndTagList(0,0,0);
    }

    constructor(props){
        super(props);
        this.state = Object.assign({}, this.state, {
            teacher_list_selected:[],
            tag_list_selected:[]
        });
    }


    render(){
        const {match,teacher_list, tag_list, problem_list} = this.props;
        const {teacher_list_selected, tag_list_selected} = this.state;
        return (
            <div>


                <div>
                    <FormControl styles={{
                        minWidth: 120,
                        maxWidth: 300,
                    }}>
                        <InputLabel htmlFor="select-multiple-checkbox">{"范围"}</InputLabel>
                        <Select
                            multiple
                            value={tag_list_selected}
                            onChange={event => {
                                this.setState(Object.assign({}, this.state, {
                                    tag_list_selected: event.target.value
                                }));
                            }}
                            input={<Input id="select-multiple-checkbox" />}
                            renderValue={selected => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {tag_list.map(tag => (
                                <MenuItem key={tag} value={tag}>
                                    <Checkbox checked={tag_list_selected.indexOf(tag) > -1} />
                                    <ListItemText primary={tag} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                   <FormControl styles={{
                       minWidth: 120,
                       maxWidth: 300,
                   }}>
                       <InputLabel htmlFor="select-multiple-checkbox">{"出题人"}</InputLabel>
                       <Select
                           multiple
                           value={teacher_list_selected}
                           onChange={event => {
                               this.setState(Object.assign({}, this.state, {
                                   teacher_list_selected: event.target.value
                               }));
                           }}
                           input={<Input id="select-multiple-checkbox" />}
                           renderValue={selected => selected.join(', ')}
                           MenuProps={MenuProps}
                       >
                           {teacher_list.map(tag => (
                               <MenuItem key={tag} value={tag}>
                                   <Checkbox checked={teacher_list_selected.indexOf(tag) > -1} />
                                   <ListItemText primary={tag} />
                               </MenuItem>
                           ))}
                       </Select>
                   </FormControl>
                </div>
                <div>
                    <button
                        onClick={()=>{
                            this.props.getProblemList(0, 0, teacher_list_selected, tag_list_selected);
                        }}
                    > {"查看试题列表"}
                    </button>
                </div>
                <div>
                    {
                        problem_list.map(
                            (problem, index)=>{
                                return (
                                    <div key={index}>
                                        <Divider inset />
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <div >{`${problem.question_id}.\t ${problem.description.substr(0, CUT_LENTH)}......`}</div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div>
                                                    <ProblemView problem = {problem}/>
                                                </div>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>

                                )
                            }
                        )
                    }
                </div>
                <div><ProblemAdd/></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tag_list: state.online_testing.question_manage.tag_list,
    teacher_list: state.online_testing.question_manage.teacher_list,
    problem_list: state.online_testing.question_manage.problem_list,
});


const mapDispatchToProps = (dispatch) => {
    return {
        getProblemList: (teacherId, courseId, teacherList, tagList)=>{
            return dispatch(getProblemList(teacherId, courseId, teacherList, tagList));
        },
        getTeacherAndTagList: (teacherId, courseId, token)=>{
            return dispatch(getTeacherAndTagList(teacherId, courseId, token));
        },
        addProblemTeacher: (teacherID, courseID, problem)=>{
            return dispatch(addProblemTeacher(teacherID, courseID, problem));
        },
        deleteProblemTeacher: (teacherID, courseID, problemID)=>{
            return dispatch(deleteProblemTeacher(teacherID, courseID, problemID));
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionManage);
