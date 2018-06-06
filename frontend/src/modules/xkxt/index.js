import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import {switchUtility, changeCSFunc, tabsSVFunc, tabsCMFunc} from './actions';
import ProgramChecking from './modules/programChecking';
import CourseSearching from './modules/courseSearching';
import CourseChoosing from './modules/courseChoosing';
import ScheduleViewing from './modules/scheduleViewing';
import CourseManagement from './modules/courseManagement';
import CourseStudent from './modules/courseStudent';

const drawerWidth = 210;
const HEIGHT = 715;
const styles = theme => ({
  root: {
	position: 'absolute',
	height: HEIGHT,
	width: document.body.scrollWidth 
  },
  simpleText: {
    marginLeft: drawerWidth + 50,
  },
  drawerPaper: {
	position: 'absolute',
	top: 0,
	width: drawerWidth,
	height: HEIGHT,
	zIndex: theme.zIndex.appBar+1
  },
  toolbar: theme.mixins.toolbar,
  divStyle: {
	  marginLeft: drawerWidth+1,
	  marginTop: 70,
	  overflow: 'auto',
	  height: HEIGHT-70,
  },
  title: {
	  padding: "20px",
	  color: "rgb(174,174,174)",
  },
  listItem: {
	  marginTop: "20px"
  }
});

const Xkxt = ({ isAdmin, utility, switchUtility, classes, changeCSFunc, tabsSVFunc, tabsCMFunc }) => {
	var whatToShow = (<ProgramChecking />);
	switch(utility){
		case "培养方案":	
			whatToShow = (<ProgramChecking />); break;
		case "课程搜索":
			whatToShow = (<CourseSearching />); break;
		case "自主选课":
			whatToShow = (<CourseChoosing />); break;
		case "查看课表":
			whatToShow = (<ScheduleViewing />); break;
		case "选课管理":
			whatToShow = (<CourseManagement />); break;
		case "课程导出学生":
			whatToShow = (<CourseStudent />); break;
		default:
			//whatToShow = ('');
	}

	return (
		<div className={classes.root}>
			<AppBar position="absolute" style={{height:'65px'}}>
				<Toolbar>
					<Typography variant="title" color="inherit" className={classes.simpleText}>
						{utility}
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.divStyle}>
				{whatToShow}
			</div>
			<Drawer
				variant="permanent"
				PaperProps={{
					className: classes.drawerPaper,
				}}
				/*
				classes={{
					paperAnchorTop: '40px',
					paper: classes.drawerPaper,
				}}*/
			>
				<div className={classes.toolbar}>
					<Typography variant="title" color="inherit" className={classes.title}>
						选课系统
					</Typography>
				</div>
				<Divider />
				<List>
					<ListItem button onClick={() => switchUtility("培养方案")} className={classes.listItem}>
						<ListItemText primary="培养方案" />
					</ListItem>
					<ListItem button onClick={() => {changeCSFunc();switchUtility("课程搜索")}} className={classes.listItem}>
						<ListItemText primary="课程搜索" />
					</ListItem>
					<ListItem button onClick={() => switchUtility("自主选课")} className={classes.listItem}>
						<ListItemText primary="自主选课" />
					</ListItem>
					<ListItem button onClick={() => {tabsSVFunc();switchUtility("查看课表")}} className={classes.listItem}>
						<ListItemText primary="查看课表" />
					</ListItem>
					{isAdmin ?
					<ListItem button onClick={() => {tabsCMFunc();switchUtility("选课管理")}} className={classes.listItem}>
						<ListItemText primary="选课管理" />
					</ListItem>
					:''}
					<ListItem button onClick={() => {tabsSVFunc();switchUtility("课程导出学生")}} className={classes.listItem}>
						<ListItemText primary="课程导出学生" />
					</ListItem>
				</List>			
			</Drawer>	
		</div>
	);


};

const mapStateToProps = (state, props) => ({
	utility: state.xkxt.utility,
	isAdmin: state.xkxt.isAdmin,
	classes: props.classes
});

const mapDispatchToProps = (dispatch, props) => ({
	switchUtility: (utility) => dispatch(switchUtility(utility)),
	changeCSFunc:() => dispatch(changeCSFunc(0)),
	tabsSVFunc: () => dispatch(tabsSVFunc(0)),
	tabsCMFunc: () => dispatch(tabsCMFunc(0)),
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Xkxt));