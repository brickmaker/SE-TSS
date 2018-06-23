import React, {Component} from "react"
import {teacher_info} from "../../../../fakeData/index";


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
    Icon,
    CircularProgress

} from "material-ui"

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import _SERVER_ADDRESS from '../../../../configs/config'



export class ProblemAdd extends Component{

    state = {
        open: false,
        type: 'Choice',
        description: "default_description",
        choice_list: ["a","b","c","d"],
        answer_list: [0],
        level: 0,
        teacher_name: "default_name",
        provider: this.props.teacher_id,
        tag:"default_tag",
        token: this.props.token,
        course_id: this.props.course_id
    };


    handleClickOpen = () => {
        this.setState(Object.assign({}, this.state, {open:true}));
    };

    handleClose = () => {
        this.setState(Object.assign({}, this.state, {open:false}));
    };

    render() {
        const {type, description, choice_list, answer_list, teacher_name, tag} = this.state;


        const choicesField = choice_list.map(
            (choice, index)=>{
                return(
                        <TextField key={index}
                            label= {`选项${index+1}`}
                            value={choice}
                            margin="normal"
                            onChange={
                                (e)=>{
                                    console.log("edit ing")
                                    let new_choices = choice_list.slice(0);
                                    new_choices[index] = e.target.value;
                                    this.setState(Object.assign({}, this.state, {choice_list:new_choices}));
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
                <Button color="primary"
                        variant="raised"
                        onClick={this.handleClickOpen}>

                    {"添加题目"}
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
                                label="难度系数"
                                value={`${this.state.level}`}
                                margin="normal"
                                onChange={(e)=>{
                                    this.setState(Object.assign({}, this.state, {level: parseInt(e.target.value)}));
                                }}
                            />
                            <TextField
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
                                let headers = new Headers();
                                headers.append(
                                    'Content-Type', 'application/json'
                                );
                                headers.append(
                                    'Authorization','JWT '+ localStorage.getItem('token')

                                );
                                console.log("problem ", this.state);
                                fetch(`http://${_SERVER_ADDRESS}/api/online_testing/question/`, {
                                    method: 'POST',
                                    headers:headers,
                                    body:JSON.stringify({
                                        type: this.state.type,
                                        description: this.state.description,
                                        choice_list: this.state.choice_list,
                                        answer_list: this.state.answer_list,
                                        level: this.state.level,
                                        provider: this.state.provider,
                                        tag:this.state.tag,
                                        course: this.state.course_id
                                    }),
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
                                            ready: true,
                                        }));
                                    })
                                    .catch(err => console.log(err));


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
            question_id: this.props.question_id,
            enable: this.props.enable
    };

    componentDidMount(){
        let headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        );
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')

        );
        fetch(`http://${_SERVER_ADDRESS}/api/online_testing/question/${this.state.question_id}/`, {
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


    handleCancel = () => {
        this.setState(Object.assign({}, this.state, {edit_flag:false}));
    };

    handleClickOpen = () => {
        this.setState(Object.assign({}, this.state, {open:true}));
    };

    handleClose = () => {
        this.setState(Object.assign({}, this.state, {open:false})) ;
    };



    render(){
        const {open, level, ready, edit_flag, type, description, choice_list, answer_list, teacher_name, tag, token, question_id} = this.state;
        if(!ready){
            return <CircularProgress/>
        }

        const answerField = type =="Choice" ?
            (   <div>
                    {
                        choice_list.map(
                            (choice, i)=>{
                                return(
                                    <TextField
                                        disabled={!edit_flag} key={i}
                                        label= {`选项${i+1}`}
                                        value={choice}
                                        margin="normal"
                                        onChange={
                                            (e)=>{
                                                let new_choices = choice_list.slice(0);
                                                new_choices[i] = e.target.value;
                                                this.setState(Object.assign({}, this.state, {choice_list:new_choices}));
                                            }
                                        }
                                    />
                                )
                            }
                        )
                    }
                    <FormControl disabled={!edit_flag}>
                       <InputLabel>答案</InputLabel>
                       <Select
                           value={`${answer_list[0]}`}
                           name="type"
                           onChange={(e)=>{
                               let new_answer_list = answer_list.slice(0);
                               new_answer_list[0] = e.target.value;
                               this.setState(Object.assign({}, this.state, {answer_list:new_answer_list}));

                           }}
                       >
                           <MenuItem  value={'0'}>{'1'}</MenuItem>
                           <MenuItem value={'1'}>{'2'}</MenuItem>
                           <MenuItem value={'2'}>{'3'}</MenuItem>
                           <MenuItem value={'3'}>{'4'}</MenuItem>
                       </Select>
                    </FormControl>
                </div>
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
                        disabled={!edit_flag}
                        margin="normal"
                    />
                    <TextField
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
                            let headers = new Headers();
                            headers.append(
                                'Content-Type', 'application/json'
                            );
                            headers.append(
                                'Authorization','JWT '+ localStorage.getItem('token')

                            );
                            fetch(`http://${_SERVER_ADDRESS}/api/online_testing/question/${this.state.question_id}/`, {
                                method: 'PUT',
                                headers:headers,
                                body:JSON.stringify({
                                    type: this.state.type,
                                    description: this.state.description,
                                    choice_list: this.state.choice_list,
                                    answer_list: this.state.answer_list,
                                    level: this.state.level,
                                    provider: this.state.provider,
                                    tag:this.state.tag,
                                    course: this.state.course_id
                                })
                            })
                                .then(response => response.json())
                                .then(response => {
                                    console.log(response);
                                    this.handleCancel();

                                })
                                .catch(err => console.log(err));
                        }}

                    >
                        {"确定"}
                    </Button>
                    <Button onClick={this.handleCancel} color="primary" autoFocus>
                        {"取消"}
                    </Button>
                    </div>
                    :  <div>
                    <Button variant="fab" color="secondary" aria-label="edit" disabled={!this.state.enable}
                            onClick={(e)=>{
                                // to revise
                                this.setState(Object.assign({}, this.state, {
                                    edit_flag: true
                                }));
                            }}
                    >
                        <EditIcon/>
                    </Button>
                    <Button variant="fab" color="secondary" aria-label="delete" disabled={!this.state.enable}
                             onClick={(e)=>{
                                 this.handleClickOpen();
                            }}>
                        <DeleteIcon/>
                    </Button>
                </div>}
                <Dialog
                    open={open}
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
                        <Button onClick={()=>{
                            this.handleClose();
                                let headers = new Headers();
                                headers.append(
                                    'Content-Type', 'application/json'
                                );
                                headers.append(
                                    'Authorization','JWT '+ localStorage.getItem('token')

                                );
                                fetch(`http://${_SERVER_ADDRESS}/api/online_testing/question/${this.state.question_id}/`, {
                                    method: 'DELETE',
                                    headers:headers
                                })
                                    .then(response => {
                                        console.log(response);
                                        this.props.refresh();
                                    })
                                    .catch(err => console.log(err));


                        }} color="primary" autoFocus>
                            {"是"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

