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
                            <TableHeaderColumn>学号</TableHeaderColumn>
                            <TableHeaderColumn>分数</TableHeaderColumn>
                            <TableHeaderColumn>绩点</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} stripRows={true}>
                        <TableRow>
                            <TableRowColumn>3150104532</TableRowColumn>
                            <TableRowColumn>90</TableRowColumn>
                            <TableRowColumn>4.2</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104533</TableRowColumn>
                            <TableRowColumn>88</TableRowColumn>
                            <TableRowColumn>4.2</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104534</TableRowColumn>
                            <TableRowColumn>77</TableRowColumn>
                            <TableRowColumn>3.3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104535</TableRowColumn>
                            <TableRowColumn>84</TableRowColumn>
                            <TableRowColumn>3.9</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104536</TableRowColumn>
                            <TableRowColumn>92</TableRowColumn>
                            <TableRowColumn>4.8</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104537</TableRowColumn>
                            <TableRowColumn>77</TableRowColumn>
                            <TableRowColumn>3.3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104538</TableRowColumn>
                            <TableRowColumn>92</TableRowColumn>
                            <TableRowColumn>4.8</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104539</TableRowColumn>
                            <TableRowColumn>85</TableRowColumn>
                            <TableRowColumn>3.9</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104540</TableRowColumn>
                            <TableRowColumn>79</TableRowColumn>
                            <TableRowColumn>3.3</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104541</TableRowColumn>
                            <TableRowColumn>74</TableRowColumn>
                            <TableRowColumn>3.0</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>3150104542</TableRowColumn>
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