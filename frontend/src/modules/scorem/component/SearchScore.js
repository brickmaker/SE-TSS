// React
import React, {Component} from 'react';

// UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class SearchScore extends Component {

  render() {
    return (<MuiThemeProvider>
      <Tabs>
        <Tab label="成绩查询">
        <Paper>
          <Table>
            <TableHeader displayRowCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>课程</TableHeaderColumn>
                <TableHeaderColumn>教师</TableHeaderColumn>
                <TableHeaderColumn>分数</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.data.map((onetake=>{return(<TableRow>
                <TableRowColumn>{onetake.cname}</TableRowColumn>
                <TableRowColumn>{onetake.tname}</TableRowColumn>
                <TableRowColumn>{onetake.score}</TableRowColumn>
              </TableRow>)}))}
            </TableBody>
          </Table>
        </Paper>
        </Tab>
      </Tabs>
      </MuiThemeProvider>
    );
  }
}

export default SearchScore;