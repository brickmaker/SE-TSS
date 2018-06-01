import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import { checkedCVFunc } from '../actions';

const CustomTableCell = withStyles(theme => ({
	head: {
	  backgroundColor: "#DCDDDD",
	  fontSize: 13,
	},
}))(TableCell);

const styles = theme => ({
	root: {
		flexGrow: 0,
		width: '97%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
	},
	box: {
		marginLeft: -10,
	},
});

const CourseViewer = ({ conditions, checkedCVBools, checkedCVFunc, classes }) => {

	let id = 0;
	function createData(name, time, place, credits, last, total) {
	  id += 1;
	  return { id, name, time, place, credits, last, total };
	}
	const data = [
	  createData('软件工程', '周四7-8节', '玉泉曹西', 2.5, 0, 100),
	  createData('计算机网络', '周二3-5节', '玉泉教7', 4.5, 0, 100),
	  createData('编译原理', '周一3-5节', '玉泉曹西', 4, 0, 100),
	  createData('人工智能', '周三6-8节', '玉泉曹西', 3.5, 0, 100),
	  createData('计算机图形学研究进展', '周一11-13节', '玉泉曹西', 4, 0, 100),
	  createData('B/S体系架构', '周五3-5节', '玉泉曹西', 2.5, 0, 100),
	];
	const data2 = [
		createData('软件工程', '周四7-8节', '玉泉曹西', 2.5, 0, 0),
		createData('软件工程', '周三3-4节', '玉泉曹西', 2.5, 0, 1),
		createData('软件工程', '周一7-8节', '玉泉曹西', 2.5, 0, 2),
	  ];

	return (
		<Paper elevation={2} className={classes.root}>
			<Table>
				<TableHead>
					<TableRow>
						<CustomTableCell>课程名称</CustomTableCell>
						<CustomTableCell>课程时间</CustomTableCell>
						<CustomTableCell>上课地点</CustomTableCell>
						<CustomTableCell numeric>学分</CustomTableCell>
						<CustomTableCell numeric style={{width:60}}>余量/容量</CustomTableCell>
						<CustomTableCell style={{width:60}}>选课</CustomTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map(n => {
					return (
						<TableRow key={n.id}>
							<CustomTableCell>{n.name}</CustomTableCell>
							<CustomTableCell>{n.time}</CustomTableCell>
							<CustomTableCell>{n.place}</CustomTableCell>
							<CustomTableCell numeric>{n.credits}</CustomTableCell>
							<CustomTableCell numeric>{''+n.last+'/'+n.total}</CustomTableCell>
							<CustomTableCell><Checkbox
								checked={checkedCVBools[n.id-1]}
								onChange={checkedCVFunc(n.id-1)}
								value="checked"
								color="primary"
								className={classes.box}
							/></CustomTableCell>
						</TableRow>
					);})}
				</TableBody>
			</Table>
		</Paper>
	);
};

const mapStateToProps = (state, props) => ({
	checkedCVBools: state.xkxt.checkedCVBools,
	conditions: props.conditions,
	classes: props.classes,
});

const mapDispatchToProps = (dispatch, props) => ({
	checkedCVFunc: i => event => dispatch(checkedCVFunc(i)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CourseViewer));