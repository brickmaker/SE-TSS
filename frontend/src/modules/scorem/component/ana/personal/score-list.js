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

class ScoreList extends Component{
    render(){
        return(
            <Paper>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>课程</TableHeaderColumn>
                            <TableHeaderColumn>分数</TableHeaderColumn>
                            <TableHeaderColumn>绩点</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                        <TableRow>
                            <TableRowColumn>软件工程</TableRowColumn>
                            <TableRowColumn>90</TableRowColumn>
                            <TableRowColumn>4.2</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>计算机网络</TableRowColumn>
                            <TableRowColumn>88</TableRowColumn>
                            <TableRowColumn>4.2</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>数据结构</TableRowColumn>
                            <TableRowColumn>77</TableRowColumn>
                            <TableRowColumn>3.3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>体系结构</TableRowColumn>
                            <TableRowColumn>84</TableRowColumn>
                            <TableRowColumn>3.9</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>专题研讨</TableRowColumn>
                            <TableRowColumn>92</TableRowColumn>
                            <TableRowColumn>4.8</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>操作系统</TableRowColumn>
                            <TableRowColumn>77</TableRowColumn>
                            <TableRowColumn>3.3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>毛泽东思想</TableRowColumn>
                            <TableRowColumn>92</TableRowColumn>
                            <TableRowColumn>4.8</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>计算机图形学</TableRowColumn>
                            <TableRowColumn>85</TableRowColumn>
                            <TableRowColumn>3.9</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>中国当代经济</TableRowColumn>
                            <TableRowColumn>79</TableRowColumn>
                            <TableRowColumn>3.3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>计算理论</TableRowColumn>
                            <TableRowColumn>74</TableRowColumn>
                            <TableRowColumn>3.0</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>大学英语</TableRowColumn>
                            <TableRowColumn>90</TableRowColumn>
                            <TableRowColumn>4.8</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default ScoreList;