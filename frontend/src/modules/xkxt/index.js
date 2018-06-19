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

import {switchUtility, changeCSFunc, tabsSVFunc, tabsCMFunc, getManagement, quit} from './actions';
import ProgramChecking from './modules/programChecking';
import CourseSearching from './modules/courseSearching';
import CourseChoosing from './modules/courseChoosing';
import ScheduleViewing from './modules/scheduleViewing';
import CourseManagement from './modules/courseManagement';
import CourseStudent from './modules/courseStudent';

import Bar from "../../top/components/Bar";

const drawerWidth = 210;
const HEIGHT = 755;//715;
const styles = theme => ({

  listItem: {
	  marginTop: "20px"
  }
});

class Xkxt extends React.Component {
	componentDidMount(){
		setTimeout(()=>{
			this.props.quit();
			console.log(111);
		}, 1000*10*60);
		this.props.getUserInfo("type=3&log=0&uid="+this.props.uid);
	}

	unLoad(e){
		alert("123");
		this.props.getUserInfo("type=3&log=1&uid="+this.props.uid);
	}

	render(){
		let { isAdmin, utility, switchUtility, classes, changeCSFunc, tabsSVFunc, tabsCMFunc, program } = this.props;
		let userInfo = this.props.userInfo;
		//let userInfo = {auth: parseInt(localStorage.type)};
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
		if(Boolean(userInfo)){
			if(userInfo.auth===2)
				whatToShow = (<CourseStudent />);
			else if(userInfo.auth===3)
				whatToShow = (<CourseManagement />);
		}

		const listItems = (
            <div>
                {Boolean(userInfo) && <List>
					{userInfo.auth===1 && <div>
						<ListItem button onClick={() => {tabsCMFunc();switchUtility("培养方案")}} className={classes.listItem}>
							<ListItemText primary="培养方案" />
						</ListItem>
						{Boolean(program) && program.is_form && <div>
						<ListItem button onClick={() => {tabsCMFunc();changeCSFunc();switchUtility("课程搜索")}} className={classes.listItem}>
							<ListItemText primary="课程搜索" />
						</ListItem>
						<ListItem button onClick={() => {tabsCMFunc();switchUtility("自主选课")}} className={classes.listItem}>
							<ListItemText primary="自主选课" />
						</ListItem>
						<ListItem button onClick={() => {tabsCMFunc();tabsSVFunc();switchUtility("查看课表")}} className={classes.listItem}>
							<ListItemText primary="查看课表" />
						</ListItem>
						</div>}
					</div>}
					{userInfo.auth===3 &&
					<ListItem button onClick={() => {tabsCMFunc();switchUtility("选课管理")}} className={classes.listItem}>
						<ListItemText primary="选课管理" />
					</ListItem>
					}
					{userInfo.auth===2 &&
					<ListItem button onClick={() => {tabsCMFunc();tabsSVFunc();switchUtility("课程导出学生")}} className={classes.listItem}>
						<ListItemText primary="课程导出学生" />
					</ListItem>
					}
				</List>}
			</div>
        );

		return (
            <Bar listItems={listItems}>
				<div>
					{Boolean(userInfo) && whatToShow}
                </div>
            </Bar>
        );
	}

};

const mapStateToProps = (state, props) => ({
	utility: state.xkxt.utility,
	isAdmin: state.xkxt.isAdmin,
	classes: props.classes,
	program: state.xkxt.program,
	uid: localStorage.username,//state.xkxt.uid,
	userInfo: state.xkxt.userInfo,
	toQuit: state.xkxt.toQuit,
});

const mapDispatchToProps = (dispatch, props) => ({
	switchUtility: (utility) => dispatch(switchUtility(utility)),
	changeCSFunc:() => dispatch(changeCSFunc(0)),
	tabsSVFunc: () => dispatch(tabsSVFunc(0)),
	tabsCMFunc: () => dispatch(tabsCMFunc(0)),
	getUserInfo: (attr) => getManagement(dispatch, attr, 3),
	quit: () => dispatch(quit()),
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Xkxt));
/*
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
  },*/
		/*
		return (
		<div className={classes.root}>{!this.props.toQuit &&
			<div>
				<AppBar position="absolute" style={{height:'65px'}}>
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.simpleText}>
							{utility}
						</Typography>
					</Toolbar>
				</AppBar>
				<div className={classes.divStyle}>
					{Boolean(userInfo) && whatToShow}
				</div>
				<Drawer
					variant="permanent"
					PaperProps={{
						className: classes.drawerPaper,
					}}
				>
					<div className={classes.toolbar}>
						<Typography variant="title" color="inherit" className={classes.title}>
							选课系统
						</Typography>
					</div>
					<Divider />
					{Boolean(userInfo) && <List>
						{userInfo.auth===0 && <div>
							<ListItem button onClick={() => {tabsCMFunc();switchUtility("培养方案")}} className={classes.listItem}>
								<ListItemText primary="培养方案" />
							</ListItem>
							{Boolean(program) && program.is_form && <div>
							<ListItem button onClick={() => {tabsCMFunc();changeCSFunc();switchUtility("课程搜索")}} className={classes.listItem}>
								<ListItemText primary="课程搜索" />
							</ListItem>
							<ListItem button onClick={() => {tabsCMFunc();switchUtility("自主选课")}} className={classes.listItem}>
								<ListItemText primary="自主选课" />
							</ListItem>
							<ListItem button onClick={() => {tabsCMFunc();tabsSVFunc();switchUtility("查看课表")}} className={classes.listItem}>
								<ListItemText primary="查看课表" />
							</ListItem>
							</div>}
						</div>}
						{userInfo.auth===2 &&
						<ListItem button onClick={() => {tabsCMFunc();switchUtility("选课管理")}} className={classes.listItem}>
							<ListItemText primary="选课管理" />
						</ListItem>
						}
						{userInfo.auth===1 &&
						<ListItem button onClick={() => {tabsCMFunc();tabsSVFunc();switchUtility("课程导出学生")}} className={classes.listItem}>
							<ListItemText primary="课程导出学生" />
						</ListItem>
						}
					</List>}			
				</Drawer>	
			</div>}
			{this.props.toQuit && 
				<Typography variant="title" color="inherit" className={classes.simpleText} 
					style={{marginTop:100}} 
					//onChange={this.props.getUserInfo("type=3&log=1&uid="+this.props.uid)}
				>
					您的登录时间太久，请重新登录
				</Typography>
			}
		</div>)*/