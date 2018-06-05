import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class ScoreList extends Component{
    render(){
        return(
            <Paper>
                <Table>
                    <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableCell>课程</TableCell>
                            <TableCell>分数</TableCell>
                            <TableCell>绩点</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody displayRowCheckbox={false} >
                        <TableRow>
                            <TableCell>软件工程</TableCell>
                            <TableCell>90</TableCell>
                            <TableCell>4.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>计算机网络</TableCell>
                            <TableCell>88</TableCell>
                            <TableCell>4.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>数据结构</TableCell>
                            <TableCell>77</TableCell>
                            <TableCell>3.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>体系结构</TableCell>
                            <TableCell>84</TableCell>
                            <TableCell>3.9</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>专题研讨</TableCell>
                            <TableCell>92</TableCell>
                            <TableCell>4.8</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>操作系统</TableCell>
                            <TableCell>77</TableCell>
                            <TableCell>3.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>毛泽东思想</TableCell>
                            <TableCell>92</TableCell>
                            <TableCell>4.8</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>计算机图形学</TableCell>
                            <TableCell>85</TableCell>
                            <TableCell>3.9</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>中国当代经济</TableCell>
                            <TableCell>79</TableCell>
                            <TableCell>3.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>计算理论</TableCell>
                            <TableCell>74</TableCell>
                            <TableCell>3.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>大学英语</TableCell>
                            <TableCell>90</TableCell>
                            <TableCell>4.8</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default ScoreList;