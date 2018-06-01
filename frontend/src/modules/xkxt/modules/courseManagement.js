import React from 'react';
import { connect } from 'react-redux';

//import {} from '../actions';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import { tabsCMFunc } from '../actions';
import CourseViewer from './courseViewer';

const styles0 = theme => ({
	container: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	textField: {
	  marginLeft: theme.spacing.unit,
	  marginRight: theme.spacing.unit,
	  width: 200,
	},
});
const DateAndTimePickers = withStyles(styles0)(({ label, value, classes }) => {
	return (
	  <form className={classes.container} noValidate>
		<TextField
		  id="datetime-local"
		  label={label}
		  type="datetime-local"
		  defaultValue={value}
		  className={classes.textField}
		  InputLabelProps={{
			shrink: true,
		  }}
		/>
	  </form>
	);
});

const styles = theme => ({
	divStyle: {
		//'backgroundColor': theme.palette.background.paper,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
	},
	buttonStyle: {
		margin: 12,
	},
	divStyle2: {
		display: "flex", 
		marginLeft: 20,
		justifyContent: "center"
	}
});

const CourseManagement = ({ tabsCMValue, tabsCMFunc, classes }) => {
	
	return (
		<div className={classes.divStyle}>
			<Paper elevation={4}>
				<AppBar position="static" color="default">
					<Tabs
						value={tabsCMValue}
						onChange={tabsCMFunc}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="选课时间" />
						<Tab label="添加课程" />
						<Tab label="选课排除" />
					</Tabs>
				</AppBar>
				<Typography component="div"  style={{ padding: 8 * 3 }}>
					<Paper elevation={2} style={{'width': '97%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
						{tabsCMValue === 0 && <div>
							<div className={classes.divStyle2}>
								<Typography style={{padding:20}}>初选时间</Typography>
								<DateAndTimePickers label="开始时间" value="2018-05-11T10:30" />
								<DateAndTimePickers label="结束时间" value="2018-05-16T10:30" />
								<Button variant="raised" className={classes.buttonStyle}>设定</Button>
							</div>
							<Divider />
							<div className={classes.divStyle2}>
								<Typography style={{padding:20}}>补选时间</Typography>
								<DateAndTimePickers label="开始时间" value="2018-05-20T10:30" />
								<DateAndTimePickers label="结束时间" value="2018-05-23T10:30" />
								<Button variant="raised" className={classes.buttonStyle}>设定</Button>
							</div>
						</div>}
						{tabsCMValue === 1 && <div>
							<div className={classes.divStyle2}>
								<Typography style={{padding:20}}>请输入学生ID</Typography>
								<TextField label="Student ID" />
								<Typography style={{padding:20}}>请输入课程名称</Typography>
								<TextField label="Course Name" />
								<Button variant="raised" className={classes.buttonStyle}>确定</Button>
							</div>
							<Divider />
							<Typography component="div"  style={{ padding: 8 * 3 }}>
								<CourseViewer />
							</Typography>
						</div>}
						{tabsCMValue === 2 && <div>
							<div className={classes.divStyle2}>
								<Typography style={{padding:20, fontSize:20}}>当前连接数：120</Typography>
							</div>
							<Divider />
							<div className={classes.divStyle2}>
								<Typography style={{padding:20}}>设置连接数最大值</Typography>
								<TextField label="当前最大值：200" />
								<Button variant="raised" className={classes.buttonStyle}>确定</Button>
							</div>
						</div>}
					</Paper>
				</Typography>
			</Paper>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	classes: props.classes,
	tabsCMValue: state.xkxt.tabsCMValue,
});

const mapDispatchToProps = (dispatch, props) => ({
	tabsCMFunc: (event, value) => dispatch(tabsCMFunc(value)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CourseManagement));