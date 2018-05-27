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

import {switchUtility, openFunc} from './actions';
import ProgramChecking from './modules/programChecking';
import CourseSearching from './modules/courseSearching';
import CourseChoosing from './modules/courseChoosing';
import ScheduleViewing from './modules/scheduleViewing';
import CourseManagement from './modules/courseManagement';
const drawerWidth = 210;
const styles = theme => ({
  root: {
	flexGrow: 1,
    //overflow: 'hidden',
    //position: 'relative',
    //display: 'flex',
  },
  simpleText: {
    marginLeft: 50,
  },
  drawerPaper: {
    position: 'relative',
	width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  divStyle: {
	  marginLeft: drawerWidth+1,
	  marginTop: 30,
  },
  title: {
	  padding: "20px",
	  color: "rgb(174,174,174)",
  },
  listItem: {
	  marginTop: "20px"
  }
});

const Xkxt = ({ isAdmin, utility, switchUtility, classes }) => {
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
		default:
			//whatToShow = ('');
	}

	return (
		<div className={classes.root}>
			<div className={classes.divStyle}>
				<AppBar position="absolute" style={{left:drawerWidth,right:1}}>
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.simpleText}>
							{utility}
						</Typography>
					</Toolbar>
				</AppBar>
				{whatToShow}
			</div>
			<Drawer
				variant="permanent"
				classes={{
				paper: classes.drawerPaper,
			}}>
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
					<ListItem button onClick={() => switchUtility("课程搜索")} className={classes.listItem}>
						<ListItemText primary="课程搜索" />
					</ListItem>
					<ListItem button onClick={() => switchUtility("自主选课")} className={classes.listItem}>
						<ListItemText primary="自主选课" />
					</ListItem>
					<ListItem button onClick={() => switchUtility("查看课表")} className={classes.listItem}>
						<ListItemText primary="查看课表" />
					</ListItem>
					{isAdmin ?
					<ListItem button onClick={() => switchUtility("选课管理")} className={classes.listItem}>
						<ListItemText primary="选课管理" />
					</ListItem>
					:''}
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
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Xkxt));