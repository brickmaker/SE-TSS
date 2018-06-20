import React, {Component} from 'react';

import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function scoreReq(cid, pid, sid, title, apply_des) {
  this.cid = cid;
  this.pid = pid;
  this.sid = sid;
  this.title = title;
  this.apply_des = apply_des;
}

//{编号 aid, 申请人 applicant, 申请时间 time，课程 className，学生 student，原成绩 oriScore，新成绩 newScore, 理由 reason，同意或不同意按钮},点开后有理由
class ScoreRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicant: "props",
      className: null,
      student: null,
      newScore: null,
      reason: null
    };
  }

  enterRequest = (applicant, className, student, newScore, reason) => {
    alert("applicant : " + applicant + "\nclassName : " + className + "\nstudent : " + student
      + "\nnewScore : " + newScore + "\nreason : " + reason);
    this.addRequest(new scoreReq(className, this.props.user.id, student, 'title', reason))
  };

  addRequest(req) {
    fetch("http://127.0.0.1:8000/api/score/createapplication/", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: 'JWT ' + localStorage.getItem('token'),
      },
      // body: 'test=[{"cid":"010A0001","pid":"2110100001","sid":"3150100001.0","score":50,"test_date":"2018-06-14"}]'
      body: 'cid=' + req.cid + "&pid=" + req.pid + '&sid=' + req.sid + '&title=' + req.title + '&apply_des=' + req.apply_des
    }).then(function (res) {
      if (res.ok) {
        alert("申请提交成功");
        this.forceUpdate();
      } else {
        alert("服务器回应异常，状态码：" + res.status);
      }
    }, function (e) {
      alert("对不起，服务器发生错误");
    })
  }

  '{"cid":"010A0001","pid":"2110100001","sid":"3150100006","title":"test1","apply_des":"test_des1"}'

  render() {
    return (
      <Paper>
        <div style={{textAlign: 'center'}}>
          <div>
            <FormControl>
              <InputLabel>课程</InputLabel>
              <Select
                native
                style={{width: "120"}}
                value={this.state.classname}
                onChange={(e) => this.setState({[e.target.name]: e.target.value})}
                inputProps={{name: 'className',}}
              >
                <option value=""/>
                {this.props.database.course.map((c, i) => {
                  return <option key={i} value={c.cid}>{c.cname}</option>
                })}
              </Select>
            </FormControl>
          </div>
          <div><TextField name={"student"}
                          helperText={"必填"}
                          label={"学号"}
                          value={this.state.student}
                          onChange={(e) => this.setState({[e.target.name]: e.target.value})}/></div>
          <div><TextField name={"newScore"}
                          helperText={"必填"}
                          label={"新成绩"}
                          value={this.state.newScore}
                          onChange={(e) => this.setState({[e.target.name]: e.target.value})}/></div>
          <div><TextField name={"reason"}
                          helperText={"选填"}
                          label={"理由"}
                          value={this.state.reason}
                          onChange={(e) => this.setState({[e.target.name]: e.target.value})}/></div>
          <Button variant={"contained"}
                  onClick={(() => {
                    this.enterRequest(this.state.applicant, this.state.className, this.state.student,
                      this.state.newScore, this.state.reason)
                  })}>提交</Button>
        </div>
      </Paper>
    );
  };
}

export default ScoreRequest;