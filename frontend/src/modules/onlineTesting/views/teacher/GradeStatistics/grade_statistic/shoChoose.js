import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {List,
    ListItem,
    ListSubheader,
    ListItemSecondaryAction,
    IconButton,
    RadioGroup,
    Radio,
    FormControl,
    FormControlLabel,
    TextField,
    ListItemText,
    CircularProgress,
    Grid,
}from 'material-ui';
import Note from '@material-ui/icons/Note'
import _SERVER_ADDRESS from '../../../../configs/config'
const styles = theme => ({
    root: {
        width: 360,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

class ProblemView extends Component{
    last_question_id = "";
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

    componentDidUpdate(prevProps, prevState) {
        const {question_id} = this.props;

        console.log("fuck", question_id, this.last_question_id)

        if(question_id != this.last_question_id){
            this.last_question_id = question_id;
            this.update();
        }
    }

    update = ()=>{
        let headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        );
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')

        );
        fetch(`http://${_SERVER_ADDRESS}:8000/api/online_testing/question/${this.props.question_id}/`, {
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
                    teacher_name: response.question_id,
                    provider: response.provider,
                    tag:response.tag,
                    level:response.level,
                    course_id:response.course,
                    ready: true,
                }));
            })
            .catch(err => console.log(err));
    }


    componentDidMount(){
        this.update();
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

class PinnedSubheaderList extends Component{
    state={
        questionID:"",
        viewRender:false
    };
    handleClick = (id) =>{
        console.log("click");
        this.setState({questionID:id,viewRender:true});
    };
    render(){
        const props = this.props;
        const { classes,questionTypeList } = props;
        console.log("render fuck");
        return (
            <div style={{display:"inline-block"}}>

                <div style={{maxWidth:"45%", display:"inline-block" ,paddingLeft:40, paddingRight:40} } >
                    <List className={classes.root} subheader={<li />}>
                        {questionTypeList.multiChoices.map(section => (
                            <li key={`section-${section.testName}`} className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader>{`${section.testName}`}</ListSubheader>
                                    {section.content.map(sectionContent =>(
                                        <ListItem key={`item-${sectionContent.questionID}-${sectionContent}`}>
                                            <ListItemText primary={`ID:${sectionContent.questionID} Anser Rate:${sectionContent.answerRate}`} />
                                            <ListItemSecondaryAction>
                                                <IconButton color="primary" onClick={()=>this.handleClick(sectionContent.questionID)} className={classes.button} aria-label="Add to shopping cart">
                                                    <Note />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </List >

                </div>
                <div style={{maxWidth:"45%", display:"inline-block"}}>
                    { this.state.viewRender &&<ProblemView token={localStorage.getItem("token")} question_id={this.state.questionID}/>
                    }
                </div>
            </div>
        );
    }
}

PinnedSubheaderList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PinnedSubheaderList);

