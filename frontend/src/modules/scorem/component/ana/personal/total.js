import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


  class PTotalTable extends Component{
      render(){
          return(
              <Paper>
                  <Table>
                    <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableCell>统计项目</TableCell>
                            <TableCell>统计值</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody displayRowCheckbox={false} >
                        <TableRow>
                            <TableCell>平均分</TableCell>
                            <TableCell>90.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>平均绩点</TableCell>
                            <TableCell>4.27</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>挂科率</TableCell>
                            <TableCell>0.00%</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
              </Paper>
          );
      }
  }

  export default PTotalTable;