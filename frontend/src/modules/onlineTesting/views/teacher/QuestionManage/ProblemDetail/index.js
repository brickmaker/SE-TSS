import React, {Component} from "react"

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
    Icon

} from "material-ui"

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

export class ProblemAdd extends Component{

    state = {
        open: false,
        type: 'Choice',
        description: "default_description",
        choices: ["a","b","c","d"],
        answer_list: [0],
        teacher_name: "default_name",
        tag:"default_tag",
        paras: this.props.paras,
    };

    handleClickOpen = () => {
        this.setState(Object.assign({}, this.state, {open:true}));
    };

    handleClose = () => {
        this.setState(Object.assign({}, this.state, {open:false}));
    };

    render() {
        const {type, description, choices, answer_list, teacher_name, tag} = this.state;


        const choicesField = choices.map(
            (choice, index)=>{
                return(
                        <TextField key={index}
                            label= {`选项${index+1}`}
                            value={choice}
                            margin="normal"
                            onChange={
                                (e)=>{
                                    let new_choices = choices.slice(0);
                                    new_choices[index] = e.target.value;
                                    this.setState(Object.assign({}, this.state, {choices:new_choices}));
                                }
                            }
                        />
                )
            }
        );

        const choiceAnswerField = (
            <FormControl>
                <InputLabel htmlFor="name-disabled">答案</InputLabel>
                <Select
                    value={`${answer_list[0]}`}
                    name="type"
                    onChange={(e)=>{
                        let new_answer_list = answer_list.slice(0);
                        new_answer_list[0] = e.target.value;
                        this.setState(Object.assign({}, this.state, {answer_list:new_answer_list}));

                    }}
                >
                    <MenuItem value={'0'}>{'1'}</MenuItem>
                    <MenuItem value={'1'}>{'2'}</MenuItem>
                    <MenuItem value={'2'}>{'3'}</MenuItem>
                    <MenuItem value={'3'}>{'4'}</MenuItem>
                </Select>
            </FormControl>
        );
        const judgeAnswerField = (
            <FormControl>
                <InputLabel htmlFor="name-disabled">答案</InputLabel>
                <Select
                    value={`${answer_list[0]}`}
                    name="type"
                    onChange={(e)=>{
                        let new_answer_list = answer_list.slice(0);
                        new_answer_list[0] = e.target.value;
                        this.setState(Object.assign({}, this.state, {answer_list:new_answer_list}));

                    }}
                >
                    <MenuItem value={'0'}>{'True'}</MenuItem>
                    <MenuItem value={'1'}>{'False'}</MenuItem>
                </Select>
            </FormControl>
        );


        return (
            <div>
                <Button variant="fab" color="secondary" aria-label="add"
                        onClick={this.handleClickOpen}>
                    <AddIcon/>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"添加题目"}</DialogTitle>
                    <DialogContent>
                        <div>
                            <FormControl>
                                <InputLabel htmlFor="name-disabled">题目类型</InputLabel>
                                <Select
                                    value={type}
                                    name="type"
                                    onChange={(e)=>{
                                        this.setState(Object.assign({}, this.state, {type:  e.target.value}));
                                    }}
                                >
                                    <MenuItem value={'Choice'}>{'选择题'}</MenuItem>
                                    <MenuItem value={'Judge'}>{'判断题'}</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="teacher_name"
                                label="出题人"
                                value={teacher_name}
                                margin="normal"
                                onChange={(e)=>{
                                    this.setState(Object.assign({}, this.state, {teacher_name:  e.target.value}));
                                }}
                            />
                            <TextField
                                id="tag"
                                label="考察范围"
                                value={tag}
                                margin="normal"
                                onChange={(e)=>{
                                    this.setState(Object.assign({}, this.state, {tag:  e.target.value}));
                                }}
                            />
                            <FormControl fullWidth >
                                <TextField
                                    id="description"
                                    label="题目描述"
                                    multiline = {true}
                                    value={description}
                                    onChange={(e)=>{
                                        this.setState(Object.assign({}, this.state, {description:  e.target.value}));
                                    }}
                                />
                            </FormControl>
                            {type == "Choice" ? choicesField:<div/>}
                            <div>
                                {type == "Choice" ? choiceAnswerField: judgeAnswerField}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="primary"
                            onClick={()=>{
                                // to to
                                this.handleClose();
                            }}

                        >
                            {"确定"}
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            {"取消"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export class ProblemView extends Component{
    constructor(props){
        super();
        this.state = {
            type: props.problem.type,
            description: props.problem.description,
            choices: props.problem.choices.slice(0),
            answer_list: props.problem.answer.slice(0),
            teacher_name: props.problem.teacher_name,
            tag:props.problem.tag,
            edit_flag: false,
        }

    }

    handleCancel = () => {
        this.setState(Object.assign({}, this.state, {edit_flag:false}));
    };

    render(){
        const {edit_flag, type, description, choices, answer_list, teacher_name, tag} = this.state;

        const answerField = type =="Choice" ?
            (
                   <FormControl component="fieldset" required >
                       <RadioGroup value={`${answer_list[0]}`}
                            onChange={(e)=>{
                                let tempAnswerList = answer_list.slice(0);
                                tempAnswerList[0] = e.target.value;
                                this.setState(Object.assign({}, this.state, {answer_list:tempAnswerList}));
                            }}
                       >
                           {
                               choices.map(
                                   (choice, i)=>{
                                       return (
                                           <FormControlLabel  disabled={!edit_flag} key={i} value={`${i}`} control={<Radio />} label={choice} />
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
                        onChange={(e)=>{
                            let tempAnswerList = answer_list.slice(0);
                            tempAnswerList[0] = e.target.value;
                            this.setState(Object.assign({}, this.state, {answer_list:tempAnswerList}));
                        }}

                    >
                        <FormControlLabel disabled={!edit_flag} value={"0"} control={<Radio />} label={"true"}></FormControlLabel>

                        <FormControlLabel disabled={!edit_flag} value={"1"} control={<Radio />} label={"false"} />
                    </RadioGroup>
                </FormControl>
            )

        return(
            <div>
                <div>
                    <TextField
                        id="type"
                        label="类型"
                        value={type}
                        disabled={true}
                        margin="normal"

                    />
                    <TextField
                        id="teacher_name"
                        label="出题人"
                        value={teacher_name}
                        disabled={true}
                        margin="normal"
                    />
                    <TextField
                        id="tag"
                        label="考察范围"
                        value={tag}
                        disabled={!edit_flag}
                        margin="normal"
                        onChange={(e)=>{
                            this.setState(Object.assign({}, this.state, {tag:e.target.value}));
                        }}
                    />
                    <FormControl fullWidth >
                        <TextField
                            id="description"
                            label="题目描述"
                            multiline = {true}
                            value={description}
                            disabled={!edit_flag}
                            onChange={(e)=>{
                                this.setState(Object.assign({}, this.state, {description:e.target.value}));
                            }}
                        />
                    </FormControl>
                    {answerField}
                </div>
                {edit_flag?
                    <div>
                    <Button
                        color="primary"
                        onClick={()=>{
                            // to to
                            this.handleCancel();
                        }}

                    >
                        {"确定"}
                    </Button>
                    <Button onClick={this.handleCancel} color="primary" autoFocus>
                        {"取消"}
                    </Button>
                    </div>
                    :  <div>
                    <Button variant="fab" color="secondary" aria-label="edit"
                            onClick={(e)=>{
                                // to revise
                                this.setState(Object.assign({}, this.state, {
                                    edit_flag: true
                                }));
                            }}
                    >
                        <EditIcon/>
                    </Button>
                    <Button variant="fab" color="secondary" aria-label="delete"
                            onClick={(e)=>{
                                // to delete
                            }}>
                        <DeleteIcon/>
                    </Button>
                </div>}

            </div>
        )
    }
}

