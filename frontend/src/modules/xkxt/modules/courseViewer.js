import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import Drawer from '@material-ui/core/Drawer';
import Typography from 'material-ui/Typography';
import { checkedCVFunc, getCourse, toggleDrawer, postCourse, getCourseInfo, changeSnackBar } from '../actions';
import Snackbar from '@material-ui/core/Snackbar';

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
	text: {
		marginLeft: 50
	}
});

class CourseViewer extends React.Component {
	componentWillMount() {
		if(!Boolean(this.props.data))
			this.props.getCourse(this.props.query);
	}

	render() {
		let { conditions, checkedCVBools, checkedCVFunc, classes, snackBarState } = this.props;
		let view;
		if(Boolean(this.props.data))
			view = this.props.data;
		else
			view = this.props.course;

		return (
			<Paper elevation={2} className={classes.root}>
			{Boolean(view) &&
				<Table>
					<TableHead>
						<TableRow>
							<CustomTableCell>课程名称 (点击查看详细信息)</CustomTableCell>
							<CustomTableCell>课程时间</CustomTableCell>
							<CustomTableCell>上课地点</CustomTableCell>
							<CustomTableCell>授课教师</CustomTableCell>
							<CustomTableCell numeric>学分</CustomTableCell>
							<CustomTableCell numeric style={{width:60}}>余量/容量</CustomTableCell>
							<CustomTableCell style={{width:60}}>选课</CustomTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{view.map((n,i) => {
						if(Boolean(this.props.prog) && !n.is_in)
							return;
						return (
							<TableRow key={i} >
								<CustomTableCell style={{cursor:'pointer'}} onClick={() => {this.props.getCourseInfo("courseid="+n.course_id);this.props.toggleDrawer(true);console.log(n.course_id)}}>{n.name}</CustomTableCell>
								<CustomTableCell >{n.time}</CustomTableCell>
								<CustomTableCell >{n.classroom}</CustomTableCell>
								<CustomTableCell >{n.teacher}</CustomTableCell>
								<CustomTableCell numeric >{n.credit}</CustomTableCell>
								<CustomTableCell numeric >{''+n.remain+'/'+n.capacity}</CustomTableCell>
								<CustomTableCell><Checkbox
									checked={n.state !== undefined}
									onChange={() => {
										let d = {uid:Boolean(this.props.data)?this.props.uuid:this.props.uid,type:n.state===undefined,courseid:n.course_id};
										if(Boolean(this.props.data))
											d["compul"] = 1;
										this.props.postCourse(d, i);
									}}
									value="checked"
									color="primary"
									className={classes.box}
								/></CustomTableCell>
							</TableRow>
						);})}
					</TableBody>
				</Table>
			}
			{this.props.bottom &&
				<Drawer
					anchor="bottom"
					open={this.props.bottom}
					onClose={() => this.props.toggleDrawer(false)}
				>
					<div
						tabIndex={0}
						role="button"
					>
					{Boolean(this.props.courseInfo) && <div>
						<Typography className={classes.text}>{"课程号: "+this.props.courseInfo.course_id}</Typography>
						<Typography className={classes.text}>{"课程名称: "+this.props.courseInfo.name}</Typography>
						<Typography className={classes.text}>{"课程类型: "+(this.props.courseInfo.course_type===0?"公共课":(this.props.courseInfo.course_type===1?"专业选修课":"专业必修课"))}</Typography>
						<Typography className={classes.text}>{"学分: "+this.props.courseInfo.credit}</Typography>
						<Typography className={classes.text}>{"容量: "+this.props.courseInfo.capacity}</Typography>
						<Typography className={classes.text}>{"授课教师: "+this.props.courseInfo.teacher}</Typography>
						<Typography className={classes.text}>{"教师: "+this.props.courseInfo.classroom}</Typography>
						<Typography className={classes.text}>{"上课时间: "+this.props.courseInfo.time}</Typography>
						<Typography className={classes.text}>{"考核方式: "+this.props.courseInfo.assessment}</Typography>
					</div>}
					</div>
				</Drawer>
			}
			{Boolean(snackBarState) && <Snackbar
				open={true}
				onClose={() => this.props.changeSnackBar()}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={<span id="message-id">{snackBarState.con===1?"选课":"退课"}{snackBarState.type===1?"成功":"失败"}</span>}
			/>}
			</Paper>
		);
	}
};

const mapStateToProps = (state, props) => ({
	checkedCVBools: state.xkxt.checkedCVBools,
	conditions: props.conditions,
	classes: props.classes,
	course: state.xkxt.course,
	bottom: state.xkxt.bottom,
	courseInfo: state.xkxt.courseInfo,
	snackBarState: state.xkxt.snackBarState,
	uid: state.xkxt.uid,
	//data: props.data
});

const mapDispatchToProps = (dispatch, props) => ({
	checkedCVFunc: i => event => dispatch(checkedCVFunc(i)),
	toggleDrawer: b => dispatch(toggleDrawer(b)),
	getCourse: (attr) => getCourse(dispatch, attr),
	postCourse: (data, index) => postCourse(dispatch, data, index),
	getCourseInfo: (attr) => getCourseInfo(dispatch, attr),
	changeSnackBar: () => dispatch(changeSnackBar(null)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CourseViewer));

/*
<TableRow key={i} style={n.state===0?{color:'red'}:{}}>
								<CustomTableCell style={n.state===0?{color:'red',cursor:'pointer'}:{cursor:'pointer'}} onClick={() => {this.props.getCourseInfo("courseid="+n.course_id);this.props.toggleDrawer(true);console.log(n.course_id)}}>{n.name}</CustomTableCell>
								<CustomTableCell style={n.state===0?{color:'red'}:{}}>{n.time}</CustomTableCell>
								<CustomTableCell style={n.state===0?{color:'red'}:{}}>{n.classroom}</CustomTableCell>
								<CustomTableCell style={n.state===0?{color:'red'}:{}}>{n.teacher}</CustomTableCell>
								<CustomTableCell numeric style={n.state===0?{color:'red'}:{}}>{n.credit}</CustomTableCell>
								<CustomTableCell numeric style={n.state===0?{color:'red'}:{}}>{''+n.remain+'/'+n.capacity}</CustomTableCell>
								<CustomTableCell><Checkbox
									checked={n.state !== undefined}
									onChange={() => {
										let d = {uid:Boolean(this.props.data)?this.props.uuid:this.props.uid,type:n.state===undefined,courseid:n.course_id};
										if(Boolean(this.props.data))
											d["compul"] = 1;
										this.props.postCourse(d, i);
									}}
									value="checked"
									color="primary"
									className={classes.box}
								/></CustomTableCell>
							</TableRow>*/