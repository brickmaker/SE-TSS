import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
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

class ApplicationButton extends Component {
  constructor(props) {
    super(props);
  }

  agreeButton = () => {
    this.sendResult(this.props.title,1);
  };
  disagreeButton = () => {
    this.sendResult(this.props.title,-1);
  };

  render() {
    return (
      <div>
        <Button onClick={((e) => {
          this.agreeButton()
        }).bind(this)}>同意</Button>
        <Button onClick={((e) => {
          this.disagreeButton()
        }).bind(this)}>拒绝</Button>
      </div>
    );
  }

  sendResult(title, state) {
    const flush = this.props.flush;
    fetch("http://127.0.0.1:8000/api/score/applymodify/", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: 'JWT ' + localStorage.getItem('token'),
      },
      body: 'title=' + title + '&state=' + state
    }).then(function (res) {
      if (res.ok) {
        if (state === 1) {
          console.log('已同意申请：' + title);
        }else{
          console.log('已拒绝申请：' + title);
        }
        flush();
      } else {
        console.log("服务器回应异常，状态码：" + res.status);
      }
    }, function (e) {
      console.log("对不起，服务器发生错误");
    })
  }
}


class ApplicationPage extends Component {
  /**
   * data = [
   *      {编号 aid, 申请人 applicant, 申请时间 time，课程 className，学生 student，原成绩 oriScore，新成绩 newScore, 理由 reason，同意或不同意按钮},点开后有理由
   * ];
   */
  constructor(props) {
    super(props);
    this.state = {
      wait: [],
      pass: [],
      reject: [],
      flush:0,
    };
    this.getData();
  }

  getData() {
    fetch("http://127.0.0.1:8000/api/score/applyliststaff/", {
      method: "GET",
      // mode: "no-cors",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: 'JWT ' + localStorage.getItem('token'),
      },
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      } else {
        console.log("服务器回应异常，状态码：" + res.status);
      }
    }, function (e) {
      console.log("对不起，服务器发生错误");
    }).then(json => {
      this.state.wait.splice(0,this.state.wait.length);
      this.state.pass.splice(0,this.state.pass.length);
      this.state.reject.splice(0,this.state.reject.length);
      json.map((one)=>{
        if(one.state===0){
          this.state.wait.push(one);
        }else if(one.state===1){
          this.state.pass.push(one);
        }else {
          this.state.reject.push(one);
        }
      });
      this.setState({['flush']: this.state.flush+1})
    });
  }

  getAllPanel = () => {
    let data = this.state.wait.concat(this.state.reject,this.state.pass);
    let retList = [];
    for (let i = 0; i < data.length; i++) {
      // console.log(data[i]);
      retList.push(
        <div style={{}}>
          <div style={{float: "left", marginRight: '-250px', width: '100%'}}>
            <ExpansionPanel id={"appEx" + data[i].title} disable={false}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography
                  align='left'>{data[i].state === 0 ? ('待审核') : (data[i].state === 1 ? ('已通过') : ('未通过'))}: {data[i].title}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Table>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableCell>申请人</TableCell>
                      <TableCell>{data[i].faculty_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>时间</TableCell>
                      <TableCell>{data[i].create_time}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>课程</TableCell>
                      <TableCell>{data[i].course_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>学生</TableCell>
                      <TableCell>{data[i].student_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>新成绩</TableCell>
                      <TableCell>{data[i].score.toFixed(0)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>理由</TableCell>
                      <TableCell>{data[i].apply_des}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
          <div style={{float: "right", width: "250px", height: "48px"}}>
            <div style={{height: '6px', width: '1px'}}/>
            <ApplicationButton title={data[i].title} flush={()=>{this.getData()}}/>
          </div>
        </div>
      );
    }
    return retList;
  };

  render() {
    return (
      <div>
        {this.getAllPanel()}
      </div>
    );
  }
}

export default ApplicationPage;