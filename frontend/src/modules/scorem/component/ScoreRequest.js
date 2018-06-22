import React, {Component} from 'react';

import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//{编号 aid, 申请人 applicant, 申请时间 time，课程 className，学生 student，原成绩 oriScore，新成绩 newScore, 理由 reason，同意或不同意按钮},点开后有理由
class ScoreRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      cid: null,
      sid: null,
      score: null,
      description: null,
    };
  }

  enterRequest = (title, cid, sid, score, description) => {
    console.log("title : " + title + "\ncid: " + cid + "\nstudent : " + sid
      + "\nnewScore : " + score + "\ndescription : " + description);
    this.addRequest(cid, this.props.user.id, sid, title, description, score)
  };

  addRequest(cid, pid, sid, title, apply_des, score) {
    const openAlert = ()=>this.props.alert(title);
    fetch("http://127.0.0.1:8000/api/score/createapplication/", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: 'JWT ' + localStorage.getItem('token'),
      },
      // body: 'test=[{"cid":"010A0001","pid":"2110100001","sid":"3150100001.0","score":50,"test_date":"2018-06-14"}]'
      body: 'cid=' + cid + "&pid=" + pid + '&sid=' + sid + '&title=' + title + '&apply_des=' + apply_des + '&score=' + score
    }).then(function (res) {
      if (res.ok) {
        openAlert();
      } else {
        console.log("服务器回应异常，状态码：" + res.status);
      }
    }, function (e) {
      console.log("对不起，服务器发生错误");
    })
  }

  '{"cid":"010A0001","pid":"2110100001","sid":"3150100006","title":"test1","apply_des":"test_des1"}'

  render() {
    return (
      <Paper>
        <div style={{textAlign: 'center', margin:'10px,10px,10px,10px'}}>
          <div style={{height:'10px'}}/>
          <div>
            <FormControl>
              <InputLabel>课程</InputLabel>
              <Select
                native
                style={{width: "120"}}
                value={this.state.cid}
                onChange={(e) => this.setState({[e.target.name]: e.target.value})}
                inputProps={{name: 'cid',}}
              >
                <option value=""/>
                {this.props.database.course.map((c, i) => {
                  return <option key={i} value={c.cid}>{c.cname}</option>
                })}
              </Select>
            </FormControl>
          </div>
          <div><TextField name={"title"}
                          helperText={"必填"}
                          label={"标题"}
                          value={this.state.title}
                          onChange={(e) => this.setState({[e.target.name]: e.target.value})}/></div>
          <div><TextField name={"sid"}
                          helperText={"必填"}
                          label={"学号"}
                          value={this.state.sid}
                          onChange={(e) => this.setState({[e.target.name]: e.target.value})}/></div>
          <div><TextField name={"score"}
                          helperText={"必填"}
                          label={"新成绩"}
                          value={this.state.score}
                          onChange={(e) => this.setState({[e.target.name]: e.target.value})}/></div>
          <div><TextField name={"description"}
                          helperText={"选填"}
                          label={"理由"}
                          value={this.state.description}
                          onChange={(e) => this.setState({[e.target.name]: e.target.value})}/></div>
          <div><Button variant={"contained"}
                  onClick={(() => {
                    this.enterRequest(this.state.title, this.state.cid, this.state.sid,
                      this.state.score, this.state.description)
                  })}>提交</Button></div>
          <div style={{height:'10px'}}/>
        </div>
      </Paper>
    );
  };
}

export default ScoreRequest;