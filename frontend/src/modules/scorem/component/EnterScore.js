// React
import React, {Component} from 'react';
import XLSX from 'xlsx'

// UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// Util
import {Take} from '../utils'

class EnterScore extends Component {
  constructor(props) {
    super(props);
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
    return <MuiThemeProvider>
      <Tabs>
        <Tab label="逐条录入">
          <div style={{textAlign: 'center'}}>
            <TextField name={"name"} hintText={"可不填，仅用于校验"} floatingLabelText={"姓名"}
                       style={{margin: 'auto', display: 'block'}} onChange={(e, v) => this.enter.name = v}/>
            <TextField name={"sid"} hintText={"必填"} floatingLabelText={"学号"}
                       style={{margin: 'auto', display: 'block'}} onChange={(e, v) => this.enter.sid = v}/>
            <TextField name={"cid"} hintText={"必填"} floatingLabelText={"课程编号"}
                       style={{margin: 'auto', display: 'block'}} onChange={(e, v) => this.enter.cid = v}/>
            <TextField name={"tid"} hintText={"必填"} floatingLabelText={"教师编号"}
                       style={{margin: 'auto', display: 'block'}} onChange={(e, v) => this.enter.tid = v}/>
            <TextField name={"score"} hintText={"必填"} floatingLabelText={"分数"}
                       style={{margin: 'auto', display: 'block'}} onChange={(e, v) => this.enter.score = v}/>
            <RaisedButton label={"提交"} style={{margin: '8px'}} onClick={() => {
              this.props.pushData(new Take(this.enter.cid, this.enter.tid, this.enter.sid, parseInt(this.enter.score, 10)));
              alert("录入成功-学号：" + this.enter.sid + " 课程号：" + this.enter.cid + " 教师编号：" + this.enter.tid + " 分数：" + this.enter.score)
            }}/>
          </div>
        </Tab>
        <Tab label="批量录入">
          <div style={{textAlign: 'center'}}>
            <TextField hintText={"课程编号"} style={{margin: 'auto', display: 'block'}}
                       onChange={(e, v) => {
                         this.reader.cid = v
                       }}/>
            <TextField hintText={"教师编号"} style={{margin: 'auto', display: 'block'}}
                       onChange={(e, v) => {
                         this.reader.tid = v
                       }}/>
            <input onChange={(e) => {
              this.fileobj = e.target.files[0]
            }} title={"选择数据文件"} type={'file'} style={{margin: 'auto', display: 'block'}}/>

            <RaisedButton label={"提交"} style={{margin: '8px'}} onClick={this.submitFile.bind(this)}/>
          </div>
        </Tab>
      </Tabs>
    </MuiThemeProvider>;
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

export default EnterScore;


