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

// Util
import {Take} from '../utils'
import {changePage, changeTab_enter} from "../actions";
import {connect} from "react-redux";
import ScoreManagement from "../index";

class EnterScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: 1,
    };
    this.enter = {
      name: null,
      sid: null,
      cid: null,
      tid: null,
      score: null,
    };
    this.reader = {
      cid: null,
      tid: null,
    };
    this.fileobj = null;
  }


  render() {
    const {tab, changeTab_enter} = this.props;
    return <div>
      <Paper>
        <Tabs value={tab} onChange={changeTab_enter}>
          <Tab value={1} label="逐条录入"/>
          <Tab value={2} label="批量录入"/>
        </Tabs>
<div style={{margin: "inline-block"}}>
      {tab === 1 && <div style={{textAlign: 'center'}}>
        <div><TextField name={"name"} helperText={"可不填，仅用于校验"} label={"姓名"}
                                                   onChange={(e) => this.enter.name = e.target.value} /></div>
        <div><TextField name={"sid"} helperText={"必填"} label={"学号"}
                                                   onChange={(e) => this.enter.sid = e.target.value}/></div>
        <div><TextField name={"cid"} helperText={"必填"} label={"课程编号"}
                                                   onChange={(e) => this.enter.cid = e.target.value}/></div>
        <div><TextField name={"tid"} helperText={"必填"} label={"教师编号"}
                                                   onChange={(e) => this.enter.tid = e.target.value}/></div>
        <div><TextField name={"score"} helperText={"必填"} label={"分数"}
                                                   onChange={(e) => this.enter.score = e.target.value}/></div>
        <Button variant={"contained"} onClick={() => {
          this.props.pushData(new Take(this.enter.cid, this.enter.tid, this.enter.sid, parseInt(this.enter.score, 10)));
          alert("录入成功-学号：" + this.enter.sid + " 课程号：" + this.enter.cid + " 教师编号：" + this.enter.tid + " 分数：" + this.enter.score)
        }}>提交</Button>
      </div>}

      {tab === 2 && <div style={{textAlign: 'center'}}>
        <div><TextField label={"课程编号"} onChange={(e, v) => {
          this.reader.cid = v
        }}/></div>
        <div><TextField label={"教师编号"} onChange={(e, v) => {
          this.reader.tid = v
        }}/></div>
        <div style={{height:"10px",width:"10px"}}/>
        <div><input onChange={(e) => {
          this.fileobj = e.target.files[0]
        }} title={"选择数据文件"} type={'file'}/>
        </div>
        <div style={{height:"10px",width:"10px"}}/>
        <Button variant={"contained"} onClick={this.submitFile.bind(this)}>提交</Button>
      </div>}

      <div style={{height:"10px",width:"10px"}}/>
</div>
      </Paper>
    </div>

  }

  readerOnload(e) {
    const workbook = XLSX.read(e.target.result, {type: 'binary'});
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];
    const dataArray = XLSX.utils.sheet_to_json(ws, {header: 1});
    let i;
    for (i in dataArray) {
      console.log(dataArray[i][0]);
      console.log(dataArray[i][1]);
      this.props.pushData(new Take(this.reader.cid, this.reader.tid, dataArray[i][0], parseInt(dataArray[i][1], 10)))
    }
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


