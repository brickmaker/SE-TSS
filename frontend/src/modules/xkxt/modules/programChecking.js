import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import ProgramViewing from './programViewing';
import ProgramFormulating from './programFormulating';
import { getProgram } from '../actions';

const styles = theme => ({
	divStyle: {
		flexgrow: 1,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
	},
});

class ProgramChecking extends React.Component {
	constructor() {
		super();

	}

	componentWillMount() {
		this.props.getProgram('uid=0002');
	}

	render() {
		let { classes, program } = this.props;
		let isFormulated = (Boolean(program) ? program.is_form : false);
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
	}
}

const mapStateToProps = (state, props) => ({
	classes: props.classes,
	program: state.xkxt.program,
});

const mapDispatchToProps = (dispatch, props) => ({
	getProgram: (attr) => getProgram(dispatch, attr),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProgramChecking));