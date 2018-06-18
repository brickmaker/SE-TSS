import React, {Component} from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';

class ApplicationButton extends Component{
    constructor(props){
        super(props);
    }
    agreeButton = () => {
        alert("agr" + this.props.aid);
    };
    disagreeButton = () => {
        alert("dis" + this.props.aid);
    };
    render(){
        return (
            <div>
                <Button onClick={((e)=>{this.agreeButton()}).bind(this)}>同意</Button>
                <Button onClick={((e)=>{this.disagreeButton()}).bind(this)}>拒绝</Button>
            </div>
        );
    }
}


class ApplicationPage extends Component{
    /**
     * data = [
     *      {编号 aid, 申请人 applicant, 申请时间 time，课程 className，学生 student，原成绩 oriScore，新成绩 newScore, 理由 reason，同意或不同意按钮},点开后有理由
     * ];
     */
    constructor(props){
        super(props);
    }

    agreeButton = (aid) => {
        alert("agr" + aid);
    };

    disagreeButton = (aid) => {
        alert("dis" + aid);
    };

    testFunc = (e) => {
        console.log(e.target.component);
    };

    getAllPanel = () => {
        var data = this.props.data;
        var retList = [];
        for (var i=0; i<data.length; i++){
            retList.push(
                <div>
                    <div float="left" width="70%">
                        <ExpansionPanel id={"appEx" + data[i].aid} disable={false}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography align='left'>ID : {data[i].aid}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Table>
                                    <TableBody displayRowCheckbox={false}>
                                        <TableRow>
                                            <TableCell>申请人</TableCell>
                                            <TableCell>{data[i].applicant}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>申请时间</TableCell>
                                            <TableCell>{data[i].time}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>课程名称</TableCell>
                                            <TableCell>{data[i].className}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>修改学生</TableCell>
                                            <TableCell>{data[i].student}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>原成绩</TableCell>
                                            <TableCell>{data[i].oriScore.toFixed(0)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>新成绩</TableCell>
                                            <TableCell>{data[i].newScore.toFixed(0)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>理由</TableCell>
                                            <TableCell>{data[i].reason}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                    <div float="left" width="30%">
                        <ApplicationButton aid={data[i].aid}/>
                    </div>
                </div>
            );
        }
        return retList;
    };

    render(){
        return(
            <div>
                {this.getAllPanel()}
            </div>
        );
    }
}

export default ApplicationPage;