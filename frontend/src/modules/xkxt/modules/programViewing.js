import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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
	innerDiv: {
		'width': '80%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
		textAlign: 'left',
	},
	row: {
		'&:nth-of-type(odd)': {
		  backgroundColor: theme.palette.background.default,
		},
	},
	title0: {
		padding: 8 * 3, 
		color: "#727171",
		fontSize: 30,
	},
	title1: {
		padding: 8 * 3, 
		color: "#737373",
	},
	title2: {
		marginBottom: 10,
	}

});

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

const data2 = [
	{
		id: 0,
		name: '微积分',
		credits: 4.5,
		time: '一'
	},
	{
		id: 1,
		name: '大学物理',
		credits: 4.5,
		time: '二'
	},
	{
		id: 2,
		name: '线性代数',
		credits: 2.5,
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

const ProgramViewing = ({ classes }) => {
    function getTable(data){
		return (
			<Table>
				<TableHead>
					<TableRow>
						<CustomTableCell>课程名称</CustomTableCell>
						<CustomTableCell numeric>学分</CustomTableCell>
						<CustomTableCell numeric style={{width:60}}>学期</CustomTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(n => { return (
					<TableRow className={classes.row} key={n.id}>
						<CustomTableCell>{n.name}</CustomTableCell>
						<CustomTableCell numeric>{n.credits}</CustomTableCell>
						<CustomTableCell numeric>{n.time}</CustomTableCell>
					</TableRow>
					);})}
				</TableBody>
			</Table>
		);
	}
    return (
        <Paper elevation={2} style={{'width': '97%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
            <Typography className={classes.title0}>培养方案</Typography>
            <Typography className={classes.title2}>
                计算机科学与技术1502班 李朋洋 3150104666
            </Typography>
            <Divider />
            <div className={classes.innerDiv}>
                <Typography variant="title" className={classes.title1}>公共课</Typography>
                {getTable(data1)}
                <Divider /><br/>
                <Typography variant="title" className={classes.title1}>专业必修课</Typography>
                {getTable(data2)}
                <Divider /><br/>
                <Typography variant="title" className={classes.title1}>专业选修课</Typography>
                {getTable(data3)}
                <br/>
            </div>
        </Paper>
    );
}

const mapStateToProps = (state, props) => ({
	classes: props.classes
});

const mapDispatchToProps = (dispatch, props) => ({
	
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProgramViewing));