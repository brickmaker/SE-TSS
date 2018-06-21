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
    CircularProgress
} from "material-ui"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import {
    getProblemList,
    getTeacherAndTagList,
    changeProblemShowList
} from './actions'

import {
    ProblemAdd,
    ProblemView
} from "./ProblemDetail/index";
import {teacher_info} from "../../../fakeData/index";

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
    last_course_id="";

    componentDidUpdate(prevProps, prevState) {
        const {course_id} = this.props.match.params;
        if(course_id != this.last_course_id){
            this.last_course_id = course_id;
            this.update();
        }
    }

    update=()=>{
        const {course_id} = this.props.match.params;
        const {token} = this.props;
        console.log("token ", token);
        this.props.getTeacherAndTagList(course_id,token);
        this.setState(Object.assign({}, this.state, {
            teacher_list_selected:[],
            tag_list_selected:[],
            problem_should_show:[],
            open:false
        }));
    };



    componentDidMount(){
        this.update();
    }

    constructor(props){
        super(props);
        this.state = Object.assign({}, this.state, {
            teacher_list_selected:[],
            tag_list_selected:[],
            problem_should_show:[],
            open:false
        });
    }


    render(){
        const {token, match,teacher_list, tag_list, problem_list, problem_should_show} = this.props;
        const {open, teacher_list_selected, tag_list_selected} = this.state;
        const {course_id} = this.props.match.params;
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
                           {teacher_list.map((teacher_info, index) => (
                               <MenuItem key={teacher_info.teacher_id} value={teacher_info.teacher_name}>
                                   <Checkbox checked={teacher_list_selected.indexOf(teacher_info.teacher_name) > -1} />
                                   <ListItemText primary={teacher_info.teacher_name} />
                               </MenuItem>
                           ))}
                       </Select>
                   </FormControl>
                </div>
                <div>
                    <Button
                        onClick={()=>{
                            this.props.getProblemList(course_id, teacher_list_selected, teacher_list, tag_list_selected, token);
                        }}
                    > {"查看试题列表"}
                    </Button>
                </div>
                <div>
                    {
                        problem_list.map(
                            (problem, index)=>{
                                return (
                                    <div key={index}>
                                        <Divider inset />
                                        <ExpansionPanel onChange={(event, expanded)=>{
                                            let temp_problem_should_show =  problem_should_show.slice(0);
                                            temp_problem_should_show[index] = expanded;
                                            this.props.changeProblemShowList(temp_problem_should_show);
                                        }}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <div >{`${problem.question_id}.\t ${problem.description.substr(0, CUT_LENTH)}......`}</div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div>
                                                    {problem_should_show[index]&& <ProblemView
                                                            token={token}
                                                            question_id={problem.question_id}
                                                            course_id={course_id}
                                                            refresh={()=>{
                                                                this.props.getProblemList(course_id, teacher_list_selected, teacher_list, tag_list_selected, token);
                                                            }}
                                                            enable={problem.provider == teacher_info.username}
                                                    />}
                                                </div>
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </div>

                                )
                            }
                        )
                    }
                </div>
                <div><ProblemAdd
                    teacher_id={teacher_info.username}
                    token={token}
                    course_id={course_id}
                    refresh={()=>{
                        this.props.getProblemList(course_id, teacher_list_selected, teacher_list, tag_list_selected, token);
                    }}
                /></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tag_list: state.online_testing.question_manage.tag_list,
    teacher_list: state.online_testing.question_manage.teacher_list,
    problem_list: state.online_testing.question_manage.problem_list,
    problem_should_show: state.online_testing.question_manage.problem_should_show,
    token: state.online_testing.teacher_main.token,
});


const mapDispatchToProps = (dispatch) => {
    return {
        getProblemList: ( courseId, teacher_list_selected, teacher_list, tag_list_selected, token)=>{
            return dispatch(getProblemList(courseId, teacher_list_selected, teacher_list, tag_list_selected, token));
        },
        getTeacherAndTagList: (courseId, token)=>{
            return dispatch(getTeacherAndTagList(courseId, token));
        },
        changeProblemShowList:(problem_show_list)=>{
            return dispatch(changeProblemShowList(problem_show_list));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuestionManage);
