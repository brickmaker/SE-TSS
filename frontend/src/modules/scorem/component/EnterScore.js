// React
import React, {Component} from 'react';
import XLSX from 'xlsx'

// Redux
import {ENTER_SCORE_SINGLE, ENTER_SCORE_MULTI} from "../reducers";
import store from "../../../top/stores"

// UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// Util
import {Take, newTake} from '../utils'
import {changePage, changeTab_enter} from "../actions";
import {connect} from "react-redux";
import ScoreManagement from "../index";

class EnterScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enter_sid: null,
      enter_cid: null,
      enter_score: null,
      reader_cid: null,
    };
    this.fileobj = null;
  }

  findcname(id) {
    const entity = this.props.database.course.find(ele => {
      return ele.cid === id;
    });
    if (entity !== undefined) {
      return entity.cname
    } else {
      return "not found";
    }
  };

  findcdate(id) {
    const entity = this.props.database.course.find(ele => {
      return ele.cid === id;
    });
    if (entity !== undefined) {
      return entity.test_date;
    } else {
      return "not found";
    }
  };

  render() {
    const {tab, changeTab_enter} = this.props;
    if (this.props.user.type === 'Teacher') {
      return <div>
        <Paper>
          <Tabs value={tab} onChange={changeTab_enter}>
            <Tab value={1} label="逐条录入"/>
            <Tab value={2} label="批量录入"/>
          </Tabs>
          <div style={{margin: "inline-block"}}>
            {tab === 1 && <div style={{textAlign: 'center'}}>
              <div>
                <FormControl>
                  <InputLabel>课程</InputLabel>
                  <Select
                    native
                    style={{width: "120"}}
                    value={this.state.enter_cid}
                    onChange={(e) => this.setState({[e.target.name]: e.target.value})}
                    inputProps={{name: 'enter_cid',}}
                  >
                    <option value=""/>
                    {this.props.database.course.map((c,i) => {
                        return <option key={i} value={c.cid}>{c.cname}</option>
                    })}
                  </Select>
                </FormControl>
              </div>

              <div><TextField name={"enter_sid"}
                              helperText={"必填"}
                              label={"学号"}
                              value={this.state.enter_sid}
                              onChange={(e) => this.setState({[e.target.name]: e.target.value})}/></div>
              <div><TextField name={"enter_score"}
                              helperText={"必填"}
                              label={"分数"}
                              value={this.state.enter_score}
                              onChange={(e) => this.setState({[e.target.name]: e.target.value})}/></div>
              <Button variant={"contained"}
                      onClick={() => {
                        this.props.pushData(new Take(this.state.enter_cid, this.findcname(this.state.enter_cid), this.props.user.id, null, this.state.enter_sid, null, parseInt(this.state.enter_score, 10),this.findcdate(this.state.enter_cid)));
                        alert("录入成功-学号：" + this.state.enter_sid + " 课程号：" + this.state.enter_cid + " 教师：" + this.props.user.name + " 分数：" + this.state.enter_score)
                      }}>提交</Button></div>}

            {tab === 2 && <div style={{textAlign: 'center'}}>
              <div>
                <FormControl>
                  <InputLabel>课程</InputLabel>
                  <Select
                    native
                    style={{width: "120"}}
                    value={this.state.reader_cid}
                    onChange={(e) => this.setState({[e.target.name]: e.target.value})}
                    inputProps={{name: 'reader_cid',}}
                  >
                    <option value=""/>
                    {this.props.database.course.map((c,i) => {
                        return <option key={i} value={c.cid}>{c.cname}</option>
                    })}
                  </Select>
                </FormControl>
              </div>
              <div style={{height: "10px", width: "10px"}}/>
              <div><input onChange={(e) => {
                this.fileobj = e.target.files[0]
              }} title={"选择数据文件"} type={'file'}/>
              </div>
              <div style={{height: "10px", width: "10px"}}/>
              <Button variant={"contained"}
                      onClick={this.submitFile.bind(this)}>提交</Button>
            </div>}

            <div style={{height: "10px", width: "10px"}}/>
          </div>
        </Paper>
      </div>
    } else  {
      return <div><Paper>请先登录</Paper></div>
    }
  }

  readerOnload(e) {
    const workbook = XLSX.read(e.target.result, {type: 'binary'});
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];
    const dataArray = XLSX.utils.sheet_to_json(ws, {header: 1});
    let i;
    let data = [];
    for (i in dataArray) {
      data.push(new Take(this.state.reader_cid,this.findcname(this.state.reader_cid),this.props.user.id,null,dataArray[i][0],null,parseInt(dataArray[i][1],10),this.findcdate(this.state.reader_cid)));
    }
    this.props.pushDatas(data);
    alert('录入完毕！')
  };

  submitFile() {
    const reader = new FileReader();
    reader.onload = this.readerOnload.bind(this);
    if (this.fileobj === null) {
      alert("请选择文件");
    } else {
      reader.readAsBinaryString(this.fileobj)
    }
  };

}

const mapStateToProps = (store) => ({
  tab: store.score.entertab
});

const mapDispatchToProps = (dispatch) => ({
  changeTab_enter: (event, tab) => {
    dispatch(changeTab_enter(tab))
  }
});

EnterScore = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterScore);

export default EnterScore;


