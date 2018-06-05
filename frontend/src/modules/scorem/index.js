// React
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";


// Reducer
import {changePage} from "./actions";
import {ENTER_SCORE, SEARCH_SCORE_TEA, SEARCH_SCORE_STU, ANALYSIS_SCORE} from "./reducers";

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
  }

  initialGrades = () => {
    this.data[0] = new Take('计算机网络', 'John Smith', '31500000000', 88);
    this.data[1] = new Take('操作系统', 'Randal White', '31500000000', 88);
    this.data[2] = new Take('C程序设计', 'Steve Brown', '31500000000', 88);
    this.data[3] = new Take('编译原理', 'Christopher Nolan', '31500000000', 88);
    console.log(this.data);
  };

  pushData(take) {
    this.data.push(take);
  }

  render() {
    const {page, changePage} = this.props;
    let left = (
      <div id="LeftMenu" style={style.leftMenu}>
        <LeftMenu/>
      </div>);
    let right;
    switch (page) {
      case ENTER_SCORE: {
        this.initialGrades();
        right = (<EnterScore pushData={take => this.pushData(take)}/>);
        break;
      }
      case SEARCH_SCORE_STU: {
        this.initialGrades();
        right = (<SearchScore data={this.data}/>);
        break;
      }
      case SEARCH_SCORE_TEA: {
        this.initialGrades();
        right = (<SearchScore data={this.data}/>);
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
            <Typography color={"inherit"} variant="title"  >
              Title
            </Typography>
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