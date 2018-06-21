// React
import React, {Component} from 'react';

// UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';

import Button from 'material-ui/Button'

class SearchScore extends Component {
  constructor(props){
    super(props);
    this.state={
      cid:"unselected",
    }
  }

  findcname(id){
    const entity = this.props.database.course.find(ele=>{
      return ele.cid===id;
    });
    if (entity!== undefined){
      return entity.cname
    }else {
      return "not found";
    }
  };

  findtname (id){
    const entity = this.props.database.teacher.find(ele=>{
      return ele.tid===id;
    });
    if (entity!== undefined){
      return entity.tname;
    }else {
      return "not found";
    }

  };

  findsname (id){
    const entity =  this.props.database.student.find(ele=>{
      return ele.sid===id;
    });
    if (entity!== undefined){
      return entity.sname;
    }else {
      return "not found";
    }
  };


  render() {
    if(this.props.user.type==="t"){
      return <Paper >
        <Table >
          <TableHead >
            <TableRow>
              <TableCell><div>
                <FormControl>
                  <Select
                    native
                    value={this.state.cid}
                    onChange={(e) => this.setState({[e.target.name]: e.target.value})}
                    inputProps={{name: 'cid',}}
                  >
                    <option value="unselected">全部课程</option>
                    {this.props.database.course.map((c,i) => {
                        return <option key= {i} value={c.cid}>{c.cname}</option>
                    })}
                  </Select>
                </FormControl>
              </div></TableCell>
              <TableCell>学生姓名</TableCell>
              <TableCell>成绩</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {this.props.data.map((onetake,i)=>{
                if((onetake.cid===this.state.cid||this.state.cid==="unselected")){
                  return(<TableRow key={i}>
                    <TableCell>{onetake.cname}</TableCell>
                    <TableCell>{onetake.sname}</TableCell>
                    <TableCell>{onetake.score}</TableCell>
                  </TableRow>)}
              }
            )}
          </TableBody>
        </Table>
      </Paper>;
    }else if(this.props.user.type==="s"){
      return (
        <Paper >
          <Table >
            <TableHead >
              <TableRow>
                <TableCell>课程</TableCell>
                <TableCell>教师</TableCell>
                <TableCell>分数</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {this.props.data.map(((onetake,i)=>{
                  return(<TableRow key={i}>
                    <TableCell>{onetake.cname}</TableCell>
                    <TableCell>{onetake.tname}</TableCell>
                    <TableCell>{onetake.score}</TableCell>
                  </TableRow>)}
              ))}
            </TableBody>
          </Table>
        </Paper>);
    }else{
      return <div><Paper>请先登录</Paper></div>
    }
  }
}

export default SearchScore;