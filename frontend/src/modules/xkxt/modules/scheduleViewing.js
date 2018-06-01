import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';

import { tabsSVFunc } from '../actions';
import CourseViewer from './courseViewer';
import ScheduleTableViewer from './scheduleTableViewer';

const styles = theme => ({
	divStyle: {
		'backgroundColor': theme.palette.background.paper,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
	},
});

const ScheduleViewing = ({ tabsSVValue, tabsSVFunc, classes }) => {
	return (
		<div className={classes.divStyle}>
			<Paper elevation={4}>
				<AppBar position="static" color="default">
					<Tabs
						value={tabsSVValue}
						onChange={tabsSVFunc}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="我的课表(列表)" />
						<Tab label="我的课表(表格)" />
					</Tabs>
				</AppBar>
				<Typography component="div"  style={{ padding: 8 * 3 }}>
					{tabsSVValue === 0 && <CourseViewer />}
					{tabsSVValue === 1 && <ScheduleTableViewer />}
				</Typography>
			</Paper>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	tabsSVValue: state.xkxt.tabsSVValue,
	classes: props.classes,
});

const mapDispatchToProps = (dispatch, props) => ({
	tabsSVFunc: (event, value) => dispatch(tabsSVFunc(value)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ScheduleViewing));