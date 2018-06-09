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
    Input

} from "material-ui"


const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

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

const initState = {
    finished: false,
    stepIndex: 0,
    paper_info_input:{
        title:"test",
        start_time:"2017-05-24T10:30",
        end_time:"2017-05-24T10:30",
        exam_time:"120"
    },
    paras: "",
    tags: names,
    choice_num: "0",
    judge_num: "0",
    select_tags:[],
};

export default class AutoGenerate extends React.Component {

    constructor(props){
        super();
        this.state = Object.assign({}, initState,{paras: props.paras});
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        if(stepIndex >= 2){
          //
        }

        this.setState(Object.assign({}, this.state, {
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        }));
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState(Object.assign({}, this.state, {
                stepIndex: stepIndex - 1
            }));
        }
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return  (
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


                );
            case 1:
                const tags = this.state.tags;
                return (
                    <div>
                        <FormControl styles={{
                            minWidth: 120,
                            maxWidth: 300,
                        }}>
                            <InputLabel htmlFor="select-multiple-checkbox">{"范围"}</InputLabel>
                            <Select
                                    multiple
                                    value={this.state.select_tags}
                                    onChange={event => {
                                        this.setState(Object.assign({}, this.state, {
                                            select_tags: event.target.value
                                        }));
                                    }}
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(', ')}
                                    MenuProps={MenuProps}
                            >
                                {tags.map(tag => (
                                    <MenuItem key={tag} value={tag}>
                                        <Checkbox checked={this.state.select_tags.indexOf(tag) > -1} />
                                        <ListItemText primary={tag} />
                                    </MenuItem>
                                ))}
                            </Select>


                        </FormControl>
                        <div>
                            <TextField
                                label="判断题数目"
                                defaultValue={this.state.judge_num}
                                onChange={(event)=>{
                                    this.state.judge_num = event.target.value
                                }
                                }
                            />
                            <TextField
                                label="选择题数目"
                                defaultValue={this.state.choice_num}
                                onChange={(event)=>{
                                    this.state.choice_num = event.target.value
                                }
                                }
                            />
                        </div>
                    </div>


                );
            case 2:
                return 'Are you SURE to submit the test sheet?';
            default:
                return 'error';
        }
    }

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};
        console.log("temp state",this.state);
        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Select Basic info</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Select Question info</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Confirm submit</StepLabel>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    {finished ? (
                        <div>
                            <a
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.setState(Object.assign(
                                        {}, initState, {params:this.state.params}
                                    ));
                                }}
                            >
                                Click here
                            </a> to generate a new paper.
                        </div>
                    ) : (
                        <div>
                            <div>{this.getStepContent(stepIndex)}</div>
                            <div style={{marginTop: 12}}>
                                <Button
                                    disabled={stepIndex === 0}
                                    onClick={this.handlePrev}
                                    style={{marginRight: 12}}
                                > Back </Button>
                                <Button
                                    onClick={this.handleNext}
                                > {stepIndex === 2 ? 'Finish' : 'Next'}</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
