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
    Stepper

} from "material-ui"
import AutoGenerate  from './AutoGenerate'
import ManualGenerate from './ManualGenerate'

import {changeRenderTabGenerate, getTeacherAndTagListGen} from "./actions";


class PaperGenerate extends Component{

    componentDidMount(){
        const {match, token} = this.props;
        const {course_id} = match.params;
        this.props.getTeacherAndTagList(course_id, token);
    }

    render(){
        const {match, tab_id, token, tag_list ,teacher_list} = this.props;
        console.log("weeee", this.props);
        const {course_id} = match.params;
        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={`${tab_id}`}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e, value)=>{
                            this.props.changeRenderTabGenerate(value);
                        }}
                    >
                        <Tab value={"0"} label="自动生成" />
                        <Tab value={"1"} label="手动生成" />
                    </Tabs>
                        {tab_id === '0' && <div><AutoGenerate tag_list={tag_list} course_id={course_id} token={token}/> </div>}
                        {tab_id === '1' && <div><ManualGenerate tag_list={tag_list} teacher_list={teacher_list} course_id={course_id} token={token} /></div>}
                </AppBar>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tab_id: state.online_testing.paper_generate.tab_id,
    token: state.online_testing.teacher_main.token,
    tag_list:state.online_testing.paper_generate.tag_list,
    teacher_list:state.online_testing.paper_generate.teacher_list
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeRenderTabGenerate:(tab_id)=>{
            return dispatch(changeRenderTabGenerate(tab_id))
        },
        getTeacherAndTagList:(course_id, token)=>{
            return dispatch(getTeacherAndTagListGen(course_id, token));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PaperGenerate);
