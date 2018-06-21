import PropTypes from "prop-types";
import React from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Checkbox,
    Tooltip,
} from '@material-ui/core';

class Teacher_EnhancedTableHead extends React.Component {
    //TODO:
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {order, orderBy, numSelected, rowCount, columnData} = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.value}
                                sortDirection={orderBy === column.value ? order : false}
                            >
                                <Tooltip
                                    title="排序"
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.value}
                                        direction={order}
                                        onClick={this.createSortHandler(column.value)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

Teacher_EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default (Teacher_EnhancedTableHead);


