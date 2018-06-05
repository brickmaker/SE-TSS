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
                            <TableCell>学号</TableCell>
                            <TableCell>分数</TableCell>
                            <TableCell>绩点</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody displayRowCheckbox={false} stripRows={true}>
                        <TableRow>
                            <TableCell>3150104532</TableCell>
                            <TableCell>90</TableCell>
                            <TableCell>4.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104533</TableCell>
                            <TableCell>88</TableCell>
                            <TableCell>4.2</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104534</TableCell>
                            <TableCell>77</TableCell>
                            <TableCell>3.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104535</TableCell>
                            <TableCell>84</TableCell>
                            <TableCell>3.9</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104536</TableCell>
                            <TableCell>92</TableCell>
                            <TableCell>4.8</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104537</TableCell>
                            <TableCell>77</TableCell>
                            <TableCell>3.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104538</TableCell>
                            <TableCell>92</TableCell>
                            <TableCell>4.8</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104539</TableCell>
                            <TableCell>85</TableCell>
                            <TableCell>3.9</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104540</TableCell>
                            <TableCell>79</TableCell>
                            <TableCell>3.3</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104541</TableCell>
                            <TableCell>74</TableCell>
                            <TableCell>3.0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>3150104542</TableCell>
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