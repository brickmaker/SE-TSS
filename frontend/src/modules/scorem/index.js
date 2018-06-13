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
import {Take} from "./utils";

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
    this.user={
      name:"学生A",
      id:"3150000000",
      type:"s",
      // name:"教师A",
      // id:"000001",
      // type:"t",
    };
    this.database={
      student:[],
      course:[],
      teacher:[],
    };
    this.database.student[0]={sid:"3150000000",sname:"学生A"};
    this.database.student[1]={sid:"3150000001",sname:"学生B"};
    this.database.student[2]={sid:"3150000002",sname:"学生C"};
    this.database.student[3]={sid:"3150000003",sname:"学生D"};
    this.database.student[4]={sid:"3150000004",sname:"学生E"};
    this.database.student[5]={sid:"3150000005",sname:"学生F"};

    this.database.teacher[0]={tid:"000001",tname:"教师A"};
    this.database.teacher[1]={tid:"000002",tname:"John Smith"};
    this.database.teacher[2]={tid:"000003",tname:"Randal White"};
    this.database.teacher[3]={tid:"000004",tname:"Steve Brown"};
    this.database.teacher[4]={tid:"000005",tname:"Christopher Nolan"};

    this.database.course[0]={cid:"1",cname:"计算机网络",tid:"000002"};
    this.database.course[1]={cid:"2",cname:"操作系统",tid:"000003"};
    this.database.course[2]={cid:"3",cname:"C程序设计",tid:"000004"};
    this.database.course[3]={cid:"4",cname:"编译原理",tid:"000005"};
    this.database.course[4]={cid:"5",cname:"软件工程",tid:"000001"};
    this.database.course[5]={cid:"6",cname:"软工实习",tid:"000001"};
    this.initialGrades();
  }

  initialGrades = () => {
    this.data[0] = new Take("1", "000002", '3150000000', 88);
    this.data[1] = new Take("2", "000003", '3150000000', 88);
    this.data[2] = new Take("3", "000004", '3150000000', 88);
    this.data[3] = new Take("4", "000005", '3150000000', 88);
    this.data[4] = new Take("5", "000001", '3150000000', 100);
  };

  pushData(take) {
    this.data.push(take);
  }

  deleteData(index){
    const rest = this.data.slice(index+1);
    this.data.length =  index;
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
          deleteData={(from,to) => this.deleteData(from,to)}
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
        <AppBar  position={"static"}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography color={"inherit"} variant="title"  style={{flex:1}}>
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