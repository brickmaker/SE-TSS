// React
import React, {Component} from 'react';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';
// Reducer
import store from "../../../top/stores"
import {changePage} from "../actions";
import {ENTER_SCORE, SEARCH_SCORE_TEA, SEARCH_SCORE_STU, ANALYSIS_SCORE} from "../reducers";
// UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const style = {
  menu: {
    float: 'left',
  },
  paper: {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
  },
};

class LeftMenu extends Component {
  render() {
    return (
        <Paper >
          <MenuList >
            <MenuItem><Link to={'/'} >返回主页</Link></MenuItem>
            <Divider/>

            <MenuItem onClick={() => {
              store.dispatch(changePage(ENTER_SCORE))
            }}>成绩录入</MenuItem>
            <MenuItem onClick={() => {
              store.dispatch(changePage(SEARCH_SCORE_TEA))
            }}>成绩查询</MenuItem>
            <MenuItem onClick={() => {
              store.dispatch(changePage(ANALYSIS_SCORE))
            }}>成绩分析</MenuItem>

          </MenuList>
        </Paper>
    );
  }
}

export default LeftMenu;

/*
import React from 'react';
import Divider from 'material-ui/Divider';
import {Menu, MenuItem} from 'material-ui/Menu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  // Without this, the menu overflows the CodeExample container.
  float: 'left',
};

class LeftMenu extends React.Component{ 
    render(){
        return (
            
        );
    }
  
}

export default LeftMenu;
*/