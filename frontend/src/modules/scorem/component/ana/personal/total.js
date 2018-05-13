import React, {Component} from 'react';

import Paper from 'material-ui/Paper';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table'

  class TotalTable extends Component{
      render(){
          return(
              <Paper>
                  <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>统计项目</TableHeaderColumn>
                            <TableHeaderColumn>统计值</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} stripRows={true}>
                        <TableRow>
                            <TableRowColumn>平均分</TableRowColumn>
                            <TableRowColumn>90.3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>平均绩点</TableRowColumn>
                            <TableRowColumn>4.27</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>挂科率</TableRowColumn>
                            <TableRowColumn>0.00%</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
              </Paper>
          );
      }
  }

  export default TotalTable;