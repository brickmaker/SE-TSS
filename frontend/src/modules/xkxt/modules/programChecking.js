import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import ProgramViewing from './programViewing';
import ProgramFormulating from './programFormulating';

const styles = theme => ({
	divStyle: {
		flexgrow: 1,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
	},
});

const ProgramChecking = ({ classes }) => {
	var isFormulated = false;

	return (
		<div className={classes.divStyle}>
			<Paper elevation={4}>
				<AppBar position="static" color="default">
					<Typography align="center" style={{ padding: 15 }}>培养方案{isFormulated ? "查看" : "制定"}</Typography>
				</AppBar>
				<Typography component="div"  style={{ padding: 8 * 3 }}>
					{isFormulated ? <ProgramViewing/> : <ProgramFormulating/>}
				</Typography>
			</Paper>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	classes: props.classes
});

const mapDispatchToProps = (dispatch, props) => ({
	
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProgramChecking));