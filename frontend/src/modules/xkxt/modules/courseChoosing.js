import React from 'react';
import { connect } from 'react-redux';


import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import { tabsCCFunc } from '../actions';
import CourseViewer from './courseViewer';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
    	{children}
    </Typography>
  );
}

const styles = theme => ({
	divStyle: {
		'backgroundColor': theme.palette.background.paper,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
	},
});

const CourseChoosing = ({ tabsCCValue, tabsCCFunc, classes, uid }) => {
	return (
		<div className={classes.divStyle}>
			<Paper elevation={4}>
				<AppBar position="static" color="default">
					<Tabs
						value={tabsCCValue}
						onChange={tabsCCFunc}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="公共课" />
						<Tab label="专业必修课" />
						<Tab label="专业选修课" />
					</Tabs>
				</AppBar>
				{tabsCCValue === 0 && <TabContainer><CourseViewer query={"&userid="+uid+"&course_type=0"} prog="1" /></TabContainer>}
				{tabsCCValue === 1 && <TabContainer><CourseViewer query={"&userid="+uid+"&course_type=2"} prog="1" /></TabContainer>}
				{tabsCCValue === 2 && <TabContainer><CourseViewer query={"&userid="+uid+"&course_type=1"} prog="1" /></TabContainer>}
			</Paper>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	tabsCCValue: state.xkxt.tabsCCValue,
	classes: props.classes,
	uid: localStorage.username,//state.xkxt.uid,
});

const mapDispatchToProps = (dispatch, props) => ({
	tabsCCFunc: (event, value) => dispatch(tabsCCFunc(value)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CourseChoosing));


/*
			<div style={divStyle}>
				<Paper style={style} zDepth={2}>
					<AppBar title='课程列表' iconElementRight={<FlatButton label='显示已选课程' onClick={openFunc}/>} />
				</Paper>
			</div>
			<Drawer width="20%" openSecondary={true} open={openValue} >
				<AppBar title="已选课程" iconElementRight={<FlatButton label='隐藏' onClick={closeFunc}/>} />
			</Drawer>
			*/