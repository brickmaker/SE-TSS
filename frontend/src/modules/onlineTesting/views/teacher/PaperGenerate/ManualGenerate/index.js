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
    CircularProgress,
} from "material-ui"

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import _SERVER_ADDRESS from '../../../../configs/config'



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

class ProblemView extends Component{

    state = {
        open:false,
        ready:false,
        type:"",
        description:"",
        choice_list:[],
        answer_list: [],
        teacher_name: "",
        provider:"",
        tag:"",
        level: 0,
        edit_flag: false,
        token: this.props.token,
        course_id:this.props.coursse_id,
        question_id: this.props.question_id
    };

    componentDidMount(){
        let headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        );
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')

        );
        fetch(`http://${_SERVER_ADDRESS}:8000/api/online_testing/question/${this.state.question_id}/`, {
            method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState(Object.assign({}, this.state, {
                    type:response.type,
                    description:response.description,
                    choice_list:response.choice_list,
                    answer_list: response.answer_list,
                    teacher_name: "to add",
                    provider: response.provider,
                    tag:response.tag,
                    level:response.level,
                    course_id:response.course,
                    ready: true,
                }));
            })
            .catch(err => console.log(err));


    }

    render(){
        const {open, level, ready, edit_flag, type, description, choice_list, answer_list, teacher_name, tag, token, question_id} = this.state;
        if(!ready){
            return <CircularProgress/>
        }

        const answerField = type =="Choice" ?
            (
                <FormControl component="fieldset" required >
                    <RadioGroup value={`${answer_list[0]}`}
                    >
                        {
                            choice_list.map(
                                (choice, i)=>{
                                    return (
                                        <FormControlLabel  disabled={true} key={i} value={`${i}`} control={<Radio />} label={choice} />
                                    );
                                }
                            )
                        }
                    </RadioGroup>
                </FormControl>
            ):
            (
                <FormControl component="fieldset" required >
                    <RadioGroup
                        value={`${answer_list[0]}`}
                    >
                        <FormControlLabel disabled={true} value={"0"} control={<Radio />} label={"true"} />
                        <FormControlLabel disabled={true} value={"1"} control={<Radio />} label={"false"} />
                    </RadioGroup>
                </FormControl>
            )

        return(
            <div>
                <div>
                    <TextField
                        label="类型"
                        value={type}
                        disabled={true}
                        margin="normal"
                    />
                    <TextField
                        label="出题人"
                        value={teacher_name}
                        disabled={true}
                        margin="normal"
                    />

                    <TextField
                        label="难度系数"
                        value={`${level}`}
                        disabled={true}
                        margin="normal"
                    />
                    <TextField
                        label="考察范围"
                        value={tag}
                        disabled={true}
                        margin="normal"
                        onChange={(e)=>{
                            this.setState(Object.assign({}, this.state, {tag:e.target.value}));
                        }}
                    />
                    <FormControl fullWidth >
                        <TextField
                            label="题目描述"
                            multiline = {true}
                            value={description}
                            disabled={true}
                            onChange={(e)=>{
                                this.setState(Object.assign({}, this.state, {description:e.target.value}));
                            }}
                        />
                    </FormControl>
                    {answerField}
                </div>
            </div>
        )
    }
}



export default class ManualGenerate extends Component{
    getProblemList= (courseId, teacher_list_selected, teacher_list, tag_list_selected, token)=>{
        let url = `http://${_SERVER_ADDRESS}:8000/api/online_testing/question/`;
        url += `?course=${courseId}`;
        console.log(teacher_list, teacher_list_selected, "rua ");
        teacher_list.forEach((teacher_detail, index)=>{
            if(teacher_list_selected.indexOf(teacher_detail.teacher_name) > -1){
                url+= `&teacher_list=${teacher_detail.teacher_id}`;
            }
        });
        tag_list_selected.forEach((tag, index)=>{
            url += `&tag_list=${tag}`
        });

        console.log(url);
        let   headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        )
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')

        )
        fetch(url, {
            method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                this.setState(Object.assign({}, this.state, {
                    problem_list: response.question_list,
                    problem_should_show: Array(response.question_list.length).fill(false)
                }))
            })
            .catch(err => console.log(err));
    }


        state = {
            teacher_list_selected:[],
            tag_list_selected:[],
            problem_list_selected:[],
            problem_list: [],
            problem_should_show:[],
            open: false,
            paper_info_input:{
                title:"test",
                start_time:"2017-05-24T10:30",
                end_time:"2017-05-24T10:30",
                exam_time:"120"
            },
        };

    handleClickOpen = () => {
        this.setState(Object.assign({}, this.state, {open:true}));
    };

    handleClose = () => {
        this.setState(Object.assign({}, this.state, {open:false})) ;
    };


    render(){
        console.log("bank state", this.state);
        const {open, problem_list_selected, problem_list, teacher_list_selected, tag_list_selected} = this.state;
        const {tag_list, teacher_list, course_id, token} = this.props;
        return (
            <div>
                <div>
                    <TextField
                        label="标题"
                        defaultValue={this.state.paper_info_input.title}
                        onChange={(event)=>{
                            this.state.paper_info_input.title = event.target.value
                        }
                        }
                    />
                    <form >
                        <TextField
                            id="datetime-local"
                            label= {"开放时间"}
                            type="datetime-local"
                            defaultValue={this.state.paper_info_input.start_time}
                            onChange={(event)=>{
                                this.state.paper_info_input.start_time = event.target.value
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form><form >
                    <TextField
                        id="datetime-local"
                        label= {"结束时间"}
                        type="datetime-local"
                        defaultValue={this.state.paper_info_input.end_time}
                        onChange={(event)=>{
                            this.state.paper_info_input.end_time = event.target.value
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </form>
                    <TextField
                        label="作答时间"
                        defaultValue={this.state.paper_info_input.exam_time}
                        onChange={(event)=>{
                            this.state.paper_info_input.exam_time = event.target.value
                        }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Minutes</InputAdornment>,
                        }}
                    />
                </div>
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
                    <button
                        onClick={()=>{
                            this.getProblemList(course_id, teacher_list_selected, teacher_list, tag_list_selected, token);
                        }}
                    > {"查看试题列表"}
                    </button>
                </div>
                <div>
                    {
                        problem_list.map(
                            (problem, index)=>{
                                const targetIndex = problem_list_selected.indexOf(problem.question_id);
                                return (
                                    <div key={index}>
                                        <Divider inset />
                                        <ExpansionPanel onChange={(event, expanded)=>{
                                            let temp_problem_should_show =  this.state.problem_should_show.slice(0);
                                            temp_problem_should_show[index] = expanded;
                                            this.setState(Object.assign({}, this.state, {
                                                problem_should_show:temp_problem_should_show
                                            }));
                                        }}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Checkbox
                                                    checked={targetIndex > -1}
                                                    onChange={(e) => {
                                                        let temp_problem_list_selected = problem_list_selected.slice(0);
                                                        if (targetIndex > -1) {
                                                            temp_problem_list_selected.splice(targetIndex, 1)
                                                        }
                                                        else {
                                                            temp_problem_list_selected.push(problem.question_id);
                                                        }
                                                        this.setState(Object.assign({}, this.state, {
                                                            problem_list_selected: temp_problem_list_selected,
                                                        }));
                                                    }}
                                                    value={`${index}`}
                                                />

                                                <div >{`${problem.question_id}.\t ${problem.description.substr(0, CUT_LENTH)}......`}</div>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                <div>
                                                    { this.state.problem_should_show[index]&& <ProblemView
                                                        token={token}
                                                        question_id={problem.question_id}
                                                        course_id={course_id}
                                                        refresh={()=>{
                                                            this.getProblemList(course_id, teacher_list_selected, teacher_list, tag_list_selected, token);
                                                        }}
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
                <div>
                    <Button
                        color="primary"
                        onClick={()=>{
                            this.handleClickOpen();
                        }}

                    >
                        {"提交"}
                    </Button>
                </div>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"确定要提交吗？"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={()=>{this.handleClose();}} color="primary">
                            {"否"}
                        </Button>
                        <Button
                            onClick={()=>{
                                let headers = new Headers();
                                headers.append(
                                    'Content-Type', 'application/json'
                                )
                                headers.append(
                                    'Authorization','JWT '+ localStorage.getItem('token')

                                );
                                const paper_info = {
                                    'auto': false,
                                    'start_time': this.state.paper_info_input.start_time,
                                    'deadline': this.state.paper_info_input.end_time,
                                    'duration': parseInt(this.state.paper_info_input.exam_time),
                                    'paper_name': this.state.paper_info_input.title,
                                    'course': course_id,
                                    'question_id_list': this.state.problem_list_selected
                                };
                                console.log('233', paper_info);
                                fetch(`http://${_SERVER_ADDRESS}:8000/api/online_testing/paper/`, {
                                    method: 'POST',
                                    headers: headers,
                                    body:JSON.stringify(paper_info)
                                })
                                    .then(response => {
                                        console.log(response);
                                        this.handleClose();
                                    })
                                    .catch(err => console.log(err));



                            }}
                            color="primary" autoFocus
                        >
                            {"是"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}