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

import {changeRenderTabGenerate} from "./actions";


class PaperGenerate extends Component{
    render(){
        const {match, tab_id} = this.props;
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
                        {tab_id === '0' && <div><AutoGenerate paras = {{title:"hello"}}/> </div>}
                        {tab_id === '1' && <div><ManualGenerate paras = {{title:"hello"}}/></div>}
                </AppBar>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tab_id: state.online_testing.paper_generate.tab_id,
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeRenderTabGenerate:(tab_id)=>{
            return dispatch(changeRenderTabGenerate(tab_id))
        }

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PaperGenerate);
