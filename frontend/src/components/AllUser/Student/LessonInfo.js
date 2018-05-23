import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const tableData = [{
    "course_id": "1",
    "name": "cs211n",
    "credit": 2.5,
    "classroom": "101",
},  {
    "course_id": "2",
    "name": "cs231",
    "credit": 3.0,
    "classroom": "103",
}
];


@connect(mapStateToProps, mapDispatchToProps)
export default class Stu_LessonsInfo extends React.Component {

    constructor(props){
        super(props);

        this.state={
            username:'student',

        };
    }




    render(){
        return (
            <div >
                <h2> Hello, {this.state.username} !</h2>
                <hr />

                <Table  >
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>

                        <TableRow  >
                            <TableHeaderColumn>Course ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Credit</TableHeaderColumn>
                            <TableHeaderColumn>Classroom</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {tableData.map( (row) => (
                            <TableRow key={row.course_id}  >
                                <TableRowColumn>{row.course_id}</TableRowColumn>
                                <TableRowColumn>{row.name}</TableRowColumn>
                                <TableRowColumn>{row.credit}</TableRowColumn>
                                <TableRowColumn>{row.classroom}</TableRowColumn>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
        );
    }
}


Stu_LessonsInfo.propType={

};


