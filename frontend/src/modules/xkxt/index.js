import React from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';

import {switchUtility, openFunc} from './actions';
import ProgramChecking from './modules/programChecking'
import CourseSearching from './modules/courseSearching'
import CourseChoosing from './modules/courseChoosing'
import ScheduleViewing from './modules/scheduleViewing'
import CourseManagement from './modules/courseManagement'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    textAlign: 'left',
  },
  simpleText: {
    marginRight: 17,
  },
  menuButton: {
  	marginRight: 20,
  },
};

const Xkxt = ({ isAdmin, utility, switchUtility, openDrawer, openFunc, classes }) => {
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
			<AppBar position="static">
				<Toolbar>
					<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="title" color="inherit" className={classes.flex}>
						选课系统
					</Typography>
					<Typography color="inherit" className={classes.simpleText}>
						{utility}
					</Typography>
					<LeftIcon />
					<Button color="inherit" onClick={() => switchUtility("培养方案")}>培养方案</Button>
					<Button color="inherit" onClick={() => switchUtility("课程搜索")}>课程搜索</Button>
					<Button color="inherit" onClick={() => switchUtility("自主选课")}>自主选课</Button>
					<Button color="inherit" onClick={() => switchUtility("查看课表")}>查看课表</Button>
					{isAdmin ? <Button color="inherit" onClick={() => switchUtility("选课管理")}>选课管理</Button> : ''}
				</Toolbar>
			</AppBar>
			{whatToShow}
		</div>
	);


};

const mapStateToProps = (state, props) => ({
	utility: state.xkxt.utility,
	isAdmin: state.xkxt.isAdmin,
	openDrawer: state.xkxt.openDrawer,
	classes: props.classes
});

const mapDispatchToProps = (dispatch, props) => ({
	switchUtility: (utility) => dispatch(switchUtility(utility)),
	openFunc: () => dispatch(openFunc()),
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Xkxt));


	/*(
		<MuiThemeProvider>
			<div>
				<AppBar title='选课系统' style={{'textAlign': 'left'}}>

				</AppBar>

				<Tabs 
				tabTemplateStyle={{color:'white',backgroundColor:'white'}} 
				contentContainerStyle={{color:'white',backgroundColor:'white'}} 
				style={{
    flexGrow: 1,
    backgroundColor: 'theme.palette.background.paper',
  }}
				inkBarStyle={{backgroundColor:'#dFdFdF'/*下划线颜色}}
				indicatorColor="primary"
				>
					<Tab label="培养方案" >
						<ProgramChecking />
					</Tab>
					<Tab label="课程搜索" >
						<CourseSearching />
					</Tab>
					<Tab label="自主选课" >
						<CourseChoosing />
					</Tab>
					<Tab label="查看课表" >
						<ScheduleViewing />
					</Tab>
					{isAdmin ? 
					<Tab label="选课管理" >
						<CourseManagement />
					</Tab> : ''}
				</Tabs>
			    <Toolbar>
			    	<ToolbarGroup>
			    		<ToolbarTitle text='选课系统' />
			    		<ToolbarSeparator />
			    	</ToolbarGroup>
			    	<ToolbarGroup>
			    		<Button label="培养方案" onClick={() => switchUtility("培养方案")} />
			    		<Button label="课程搜索" onClick={() => switchUtility("课程搜索")} />
			    		<Button label="自主选课" onClick={() => switchUtility("自主选课")} />
			    		<Button label="查看课表" onClick={() => switchUtility("查看课表")} />
			    		{isAdmin ? <Button label="选课管理" onClick={() => switchUtility("选课管理")} /> : ''}
			    	</ToolbarGroup>
			    </Toolbar>
			    {whatToShow}
		    </div>
		</MuiThemeProvider>
	);*/