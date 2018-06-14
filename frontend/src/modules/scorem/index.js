// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";


// Reducer
import {changePage} from "./actions";
import {ENTER_SCORE, SEARCH_SCORE, ANALYSIS_SCORE} from "./reducers";

// Component
import LeftMenu from './component/LeftMenu';
import AnalysisTabs from './component/analyse';
import EnterScore from "./component/EnterScore";
import SearchScore from './component/SearchScore';
import {Take,newTake} from "./utils";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const style = {
  leftMenu: {
    float: "left",
    width: "15%",
    height: "100%",
  },

  content: {
    float: "right",
    width: "85%",
    height: "100%",
  },
};


class ScoreManagement extends Component {
  constructor(props) {
    super(props);
    this.data = [];
    this.user = {
      // name: "学生A",
      // id: "3150100000",
      // type: "s",
      name:"教师A",
      id:"2110100001",
      type:"t",
    };
    this.database = {
      student: [],
      course: [],
      teacher: [],
    };


    if(this.user.type==='s'){
      fetch("http://127.0.0.1:8000/api/score/scoreliststudent/", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: 'sid='+this.user.id
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        } else {
          alert("服务器回应异常，状态码：" + res.status);
        }
      }, function (e) {
        alert("对不起，服务器产生错误");
      }).then(data => {
        data.map(s => {
          this.data.push(new Take(s['course'], s['course_name'], s['teacher'], s['faculty_name'], s['student'], s['student_name'], s['score'], s['test_date']));
          this.addTeacher(s['teacher'],s['faculty_name']);
          this.addCourse(s['course'],s['course_name'],s['test_date']);

        });
        this.forceUpdate();
      });
    }else if(this.user.type==='t'){
      fetch("http://127.0.0.1:8000/api/score/scorelistteacher/", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: 'pid='+this.user.id
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        } else {
          alert("服务器回应异常，状态码：" + res.status);
        }
      }, function (e) {
        alert("对不起，服务器产生错误");
      }).then(data => {
        data.map(s => {
          this.data.push(new Take(s['course'], s['course_name'], s['teacher'], s['faculty_name'], s['student'], s['student_name'], s['score'], s['test_date']));
          this.addStudent(s['student'],s['student_name']);
          this.addCourse(s['course'],s['course_name'],s['test_date']);

        });
        this.forceUpdate();
      });
    }
  }

  addStudent(id,name){
    if(!this.findsname(id)){
      this.database.student.push({sid: id, sname: name});
    }
  }
  addTeacher(id,name){
    if(!this.findtname(id)){
      this.database.teacher.push({tid: id, tname: name});
    }
  }
  addCourse(id,name,test_date){
    if(!this.findcname(id)){
      this.database.course.push({cid: id, cname: name, test_date:test_date});
    }
  }

  pushDatas(takes){
    const newtake=[];
    takes.map(take=>{
      newtake.push(newTake(take.cid,take.tid,take.sid,take.score,take.test_date))
    });
    console.log(newtake);
    fetch("http://127.0.0.1:8000/api/score/insertscore/", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      // body: 'test=[{"cid":"010A0001","pid":"2110100001","sid":"3150100001.0","score":50,"test_date":"2018-06-14"}]'
      body: 'test='+JSON.stringify(newtake)
    }).then(function (res) {
      if (res.ok) {
        alert("批量录入成功");
        this.forceUpdate();
        return res.json();
      } else {
        alert("服务器回应异常，状态码：" + res.status);
      }
    }, function (e) {
      alert("对不起，服务器产生错误");
    }).then(res=>{
      console.log(res);
    })

  }

  pushData(take) {
    const newtake=[];
    newtake[0] = new newTake(take.cid,take.tid,take.sid,take.score,take.test_date);
    console.log(newtake);
    fetch("http://127.0.0.1:8000/api/score/insertscore/", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      // body: 'test=[{"cid":"010A0001","pid":"2110100001","sid":"3150100001.0","score":50,"test_date":"2018-06-14"}]'
      body: 'test='+JSON.stringify(newtake)

    }).then(function (res) {
      if (res.ok) {
        alert("录入成功");
        this.forceUpdate();
      } else {
        alert("服务器回应异常，状态码：" + res.status);
      }
    }, function (e) {
      alert("对不起，服务器产生错误");
    })
  }

  deleteData(index) {
    const rest = this.data.slice(index + 1);
    this.data.length = index;
    return this.data.push.apply(this.data, rest);
  }

  render() {
    const {page, changePage} = this.props;
    let left = (
      <div id="LeftMenu" style={style.leftMenu}>
        <LeftMenu user={this.user}/>
      </div>);
    let right;
    switch (page) {
      case ENTER_SCORE: {
        right = (
          <EnterScore
            pushData={take => this.pushData(take)}
            pushDatas={take => this.pushDatas(take)}
            deleteData={(index) => this.deleteData(index)}
            user={this.user}
            data={this.data}
            database={this.database}
          />);
        break;
      }
      case SEARCH_SCORE: {
        right = (
          <SearchScore
            data={this.data}
            user={this.user}
            database={this.database}
          />);
        break;
      }
      case ANALYSIS_SCORE: {
        right = (<AnalysisTabs/>);
        break;
      }
      default: {
        right = (<AnalysisTabs/>);
        break;
      }
    }
    return (
      <div>
        <AppBar position={"static"}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon/>
            </IconButton>
            <Typography color={"inherit"} variant="title" style={{flex: 1}}>
              成绩管理
            </Typography>
            <Button color="inherit">您好！{this.user.name}</Button>
          </Toolbar>
        </AppBar>
        {left}
        <div id="content" style={style.content}>
          {right}
        </div>
      </div>
    );
  }

  findcname(id){
    const entity =  this.database.course.find(ele=>{
      return ele.cid===id;
    });
    return entity!== undefined;
  };

  findtname (id){
    const entity =  this.database.teacher.find(ele=>{
      return ele.tid===id;
    });
    return entity!== undefined;

  };

  findsname (id){
    const entity =  this.database.student.find(ele=>{
      return ele.sid===id;
    });
    return entity!== undefined;
  };
}


const mapStateToProps = (store) => ({
  page: store.score.page
});

const mapDispatchToProps = (dispatch) => ({
  changePage: (page) => {
    dispatch(changePage(page))
  }
});

ScoreManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreManagement);

export default ScoreManagement