import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';

import { checkedPFFunc } from '../actions';

const data1 = [
	{
		id: 0,
		name: '中外管理思想史',
		credits: 1.5,
		time: '一'
	},
	{
		id: 1,
		name: '西方音乐简史',
		credits: 1.5,
		time: '一'
	},
	{
		id: 2,
		name: '体育',
		credits: 1.5,
		time: '一'
	},
];

const data3 = [
	{
		id: 0,
		name: '操作系统',
		credits: 4.5,
		time: '三'
	},
	{
		id: 1,
		name: '软件工程',
		credits: 2.5,
		time: '三'
	},
	{
		id: 2,
		name: '计算机网络',
		credits: 4.5,
		time: '三'
	},
];

const CustomTableCell = withStyles(theme => ({
	head: {
	  backgroundColor: "#DCDDDD",
	  fontSize: 14,
	},
	body: {
	  fontSize: 14,
	},
}))(TableCell);

const styles = theme => ({
	divStyle: {
		flexgrow: 1,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    row: {
		'&:nth-of-type(odd)': {
		  backgroundColor: theme.palette.background.default,
		},
    },
    buttonStyle: {
		margin: 20,
    },
    box: {
		marginLeft: -10,
	},
});

const ProgramFormulating = ({ checkedPFBools, checkedPFFunc, classes }) => {
    let id = 0;
    console.log(checkedPFBools);
    function getTable(data, index){
		return (
			<Table>
                <TableHead>
					<TableRow>
						<CustomTableCell>课程名称</CustomTableCell>
						<CustomTableCell numeric>学分</CustomTableCell>
						<CustomTableCell numeric style={{width:60}}>学期</CustomTableCell>
                        <CustomTableCell style={{width:60}}>选择</CustomTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(n => { return (
					<TableRow className={classes.row} key={id++}>
						<CustomTableCell>{n.name}</CustomTableCell>
						<CustomTableCell numeric>{n.credits}</CustomTableCell>
						<CustomTableCell numeric>{n.time}</CustomTableCell>
                        <CustomTableCell><Checkbox
                            checked={checkedPFBools[index][n.id]}
                            onChange={checkedPFFunc(n.id)}
                            value="checked"
                            color="primary"
                            className={classes.box}
                        /></CustomTableCell>
					</TableRow>
					);})}
				</TableBody>
			</Table>
		);
	}

    return (
        <Paper elevation={0} style={{'width': '97%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>公共课</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {getTable(data1, 0)}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel disabled>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>专业必修课</Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel> 
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>专业选修课</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {getTable(data3, 1)}
                </ExpansionPanelDetails>
            </ExpansionPanel> 
            <Button variant="raised" className={classes.buttonStyle}>提交</Button>
        </Paper>
    );
}

const mapStateToProps = (state, props) => ({
    checkedPFBools: state.xkxt.checkedCVBools,
	classes: props.classes
});

const mapDispatchToProps = (dispatch, props) => ({
	checkedPFFunc: i => event => dispatch(checkedPFFunc(i)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProgramFormulating));