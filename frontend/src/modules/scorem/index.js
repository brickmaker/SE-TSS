// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from "react-router-dom"
import {connect} from "react-redux";


// Reducer
import {changePage} from "./actions";
import {ENTER_SCORE, SEARCH_SCORE, ANALYSIS_SCORE} from "./reducers";

// Component
import EnterScore from "./component/EnterScore";
import SearchScore from './component/SearchScore';
import AnaScore from './component/AnaScore';
import ApplicationPage from './component/Application';
import ScoreRequest from './component/ScoreRequest';

import {Take, newTake, Course} from "./utils";

import Bar from "../../top/components/Bar"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {
  Home, Search as SearchIcon, Message as MessageIcon,
  Announcement as AnnouncementIcon,
  Extension as ExtensionIcon
} from "@material-ui/icons/es/index";

import {Link} from "react-router-dom";
import store from "../../top/stores";

const testAna = {
  topicList: ["个人分析", "软件工程", "编译原理"],
  scoreListName: ["课程名称", "学号", "学号"],
  data: [
    [
      {name: "编译原理", score: 59},
      {name: "软件工程", score: 66},
      {name: "课程A", score: 79},
      {name: "课程B", score: 100},
      {name: "课程C", score: 88},
      {name: "课程D", score: 22},
      {name: "课程E", score: 33},
      {name: "课程F", score: 55},
      {name: "课程G", score: 59}
    ],
    [
      {name: "A", score: 59},
      {name: "B", score: 66},
      {name: "C", score: 79},
      {name: "D", score: 100},
      {name: "E", score: 88},
      {name: "F", score: 100},
      {name: "G", score: 100},
      {name: "H", score: 100},
      {name: "I", score: 100}
    ],
    [
      {name: "J", score: 59},
      {name: "K", score: 66},
      {name: "L", score: 79},
      {name: "M", score: 100},
      {name: "N", score: 88},
      {name: "O", score: 88},
      {name: "P", score: 88},
      {name: "Q", score: 88},
      {name: "R", score: 88}
    ]
  ]
};

//{编号 aid, 申请人 applicant, 申请时间 time，课程 className，学生 student，原成绩 oriScore，新成绩 newScore, 理由 reason，同意或不同意按钮}
const testApp = [
  {
    aid: "AID000001",
    applicant: "teacherA",
    time: "2018-06-18",
    className: "classA",
    student: "studentA",
    oriScore: 100,
    newScore: 60,
    reason: "happy"
  },
  {
    aid: "AID000002",
    applicant: "teacherB",
    time: "2018-09-11",
    className: "classB",
    student: "studentB",
    oriScore: 59,
    newScore: 61,
    reason: "sad"
  }
];


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
      type: store.getState().info.auth.type,
      id: store.getState().info.auth.username,
    };
    this.database = {
      course: [],
    };
  }

  componentDidMount() {
    this.getInitData();
  }

  getInitData() {
    if (this.user.type === 'Student') {
      fetch("http://127.0.0.1:8000/api/score/scoreliststudent/", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Authorization: 'JWT ' + localStorage.getItem('token'),
        },
        body: 'sid=' + this.user.id
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        } else {
          alert("服务器回应异常，状态码：" + res.status);
        }
      }, function (e) {
        alert("对不起，服务器产生错误");
      }).then(data => {
        if (data !== undefined) {
          data.map(s => {
            this.data.push(new Take(s['course_cid'], s['course_name'], null, s['faculty_name'], null, s['student_name'], s['score'], s['test_date']));
            this.addCourse(s['course_cid'], s['course_name'], s['test_date']);
          });
          this.props.history.push('/scorem/search');
        }
      });
    } else if (this.user.type === 'Teacher') {
      fetch("http://127.0.0.1:8000/api/score/scorelistteacher/", {
        method: "POST",
        // mode: "no-cors",
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Authorization: 'JWT ' + localStorage.getItem('token'),
        },
        body: 'pid=' + this.user.id
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        } else {
          alert("服务器回应异常，状态码：" + res.status);
        }
      }, function (e) {
        alert("对不起，服务器产生错误");
      }).then(data => {
        if (data !== undefined) {
          data.map(s => {
            console.log(s);
            this.data.push(new Take(s['course_cid'], s['course_name'], null, s['faculty_name'], null, s['student_name'], s['score'], s['test_date']));
            this.addCourse(s['course_cid'], s['course_name'], s['test_date']);
          });
          this.props.history.push('/scorem/search');
        }
      });
    } else {

    }
  }


  addCourse(id, name, test_date) {
    const entity = this.database.course.find(ele => {
      return ele.cid === id;
    });
    // console.log("try " + id + ',find ' + entity);
    if (entity === undefined) {
      this.database.course.push(new Course(id,name,test_date));
    }
  }

  pushDatas(takes) {
    const newtake = [];
    console.log(takes);
    takes.map(take => {
      newtake.push(new newTake(take.cid, take.tid, take.sid, take.score, take.test_date))
    });
    console.log(newtake);
    fetch("http://127.0.0.1:8000/api/score/insertscore/", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: 'JWT ' + localStorage.getItem('token'),
      },
      // body: 'test=[{"cid":"010A0001","pid":"2110100001","sid":"3150100001.0","score":50,"test_date":"2018-06-14"}]'
      body: 'test=' + JSON.stringify(newtake)
    }).then(function (res) {
      if (res.ok) {
        alert("批量录入成功");
        this.props.history.push(`${this.props.url}/enter`);
      } else {
        alert("服务器回应异常，状态码：" + res.status);
      }
    }, function (e) {
      alert("对不起，服务器产生错误");
    })

  }

  pushData(take) {
    const newtake = [];
    newtake[0] = new newTake(take.cid, take.tid, take.sid, take.score, take.test_date);
    console.log(newtake);
    fetch("http://127.0.0.1:8000/api/score/insertscore/", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: 'JWT ' + localStorage.getItem('token'),
      },
      // body: 'test=[{"cid":"010A0001","pid":"2110100001","sid":"3150100001","score":50,"test_date":"2018-07-01"}]'
      body: 'test=' + JSON.stringify(newtake)

    }).then(function (res) {
      if (res.ok) {
        alert("录入成功");
        this.props.history.push(`${this.props.url}/enter`);
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
    const {match} = this.props;
    const listItems = (
      <div>
        {(this.user.type === 'Student' || this.user.type === 'Teacher') &&
        <ListItem component={Link} to={`${match.url}/search`} button>
          <ListItemIcon>
            <SearchIcon/>
          </ListItemIcon>
          <ListItemText primary="成绩查询"/>
        </ListItem>
        }
        {this.user.type === 'Teacher' &&
        <Divider/>}
        {this.user.type === 'Teacher' &&
        <ListItem component={Link} to={`${match.url}/enter`} button>
          <ListItemIcon>
            <MessageIcon/>
          </ListItemIcon>
          <ListItemText primary="成绩录入"/>
        </ListItem>
        }
        <Divider/>
        <ListItem component={Link} to={`${match.url}/analysis`} button>
          <ListItemIcon>
            <MessageIcon/>
          </ListItemIcon>
          <ListItemText primary="成绩分析"/>
        </ListItem>
        {this.user.type === 'Teacher' &&
        <Divider/>}
        {this.user.type === 'Teacher' &&
        <ListItem component={Link} to={`${match.url}/request`} button>
          <ListItemIcon>
            <MessageIcon/>
          </ListItemIcon>
          <ListItemText primary="成绩修改"/>
        </ListItem>
        }
        {(this.user.type === 'Staff' ||this.user.type === 'Admin')&&
        <Divider/>}
        {(this.user.type === 'Staff' ||this.user.type === 'Admin')&&
        <ListItem component={Link} to={`${match.url}/apply`} button>
          <ListItemIcon>
            <MessageIcon/>
          </ListItemIcon>
          <ListItemText primary="修改审批"/>
        </ListItem>
        }
      </div>
    );

    return (
      <Bar listItems={listItems}>
        <div>
          <Switch>
            <Route exact path={`${match.url}`} render={(props) => <SearchScore {...props}
                                                                               data={this.data}
                                                                               user={this.user}
                                                                               database={this.database}/>}/>
            <Route path={`${match.url}/search`} render={(props) => <SearchScore {...props}
                                                                                data={this.data}
                                                                                user={this.user}
                                                                                database={this.database}/>}/>
            {this.user.type === 'Teacher' &&
            <Route path={`${match.url}/enter`} render={(props) => <EnterScore {...props}
                                                                              pushData={take => this.pushData(take)}
                                                                              pushDatas={take => this.pushDatas(take)}
                                                                              deleteData={(index) => this.deleteData(index)}
                                                                              user={this.user}
                                                                              data={this.data}
                                                                              database={this.database}/>}/>
            }
            <Route path={`${match.url}/analysis`} render={(props) => <AnaScore {...props}
                                                                               topicList={testAna.topicList}
                                                                               data={testAna.data}
                                                                               scoreListName={testAna.scoreListName}/>}/>
            {this.user.type === 'Teacher' &&
            <Route path={`${match.url}/request`} render={(props) => <ScoreRequest {...props}
                                                                                  database={this.database}
                                                                                  user={this.user}/>}/>
            }
            {(this.user.type === 'Staff' ||this.user.type === 'Admin')&&
            <Route path={`${match.url}/apply`} render={(props) => <ApplicationPage {...props}
                                                                                   data={testApp}/>}/>
            }
          </Switch>
        </div>
      </Bar>
    );
  }
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