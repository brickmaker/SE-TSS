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

import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';

import Button from 'material-ui/Button'

class SearchScore extends Component {


  render() {
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
              {this.props.data.map((onetake=>{return(<TableRow>
                <TableCell>{onetake.cname}</TableCell>
                <TableCell>{onetake.tname}</TableCell>
                <TableCell>{onetake.score}</TableCell>
              </TableRow>)}))}
            </TableBody>
          </Table>
    </Paper>);

  }
}

export default SearchScore;