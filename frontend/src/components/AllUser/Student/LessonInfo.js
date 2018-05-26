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
import StudentBar from "./StudentBar";
import {Card, CardHeader, CardText} from 'material-ui/Card';

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
            drawerOpen:false,
        };
    }

    handleClick(){
        this.setState({drawerOpen: !this.state.drawerOpen});
    }


    render(){
        const contentStyle = {
            transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)',
            margin: '50'
        };
        if (this.state.drawerOpen) {
            contentStyle.marginLeft = 220;
        }
        else {
            contentStyle.marginLeft = 50;
        }
        return (
            <div >
                <StudentBar drawerOpen={this.state.drawerOpen} handleClick={this.handleClick.bind(this)}/>

                <Card style={contentStyle}>

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
                </Card>
            </div>
        );
    }
}


Stu_LessonsInfo.propType={

};


