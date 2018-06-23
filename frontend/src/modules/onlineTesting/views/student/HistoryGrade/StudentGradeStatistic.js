import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Avatar,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow
} from 'material-ui'
import green from '@material-ui/core/colors/green'
import AssignmentIcon from '@material-ui/icons/Assignment'
import InfoIcon  from '@material-ui/icons/Info'


const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor:green[500],
    },
    infoAvatar: {
        margin: 10,
    }

});

class CheckboxListSecondary extends React.Component {
    state = {
        checked: [1],
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{textAlign:"center"}}>
                                <Avatar className={classes.infoAvatar}>
                                    <InfoIcon />
                                </Avatar>
                            </TableCell>
                            <TableCell>试题名称</TableCell>
                            <TableCell>平均成绩</TableCell>
                            <TableCell>你的成绩</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.studentGrade.map((item,index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Avatar className={classes.greenAvatar}>
                                        <AssignmentIcon/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>
                                    {`${item.paperName}`}
                                </TableCell>
                                <TableCell>
                                    {`${item.avgScore}`.substring(0,4)}
                                </TableCell>
                                <TableCell>
                                    {`${item.testScore}`+"/"+`${item.totalScore}`}
                                </TableCell>
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

CheckboxListSecondary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
