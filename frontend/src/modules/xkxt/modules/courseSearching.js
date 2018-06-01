import React from 'react';
import { connect } from 'react-redux';
//import {} from '../actions';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

const OneLine = ({label, field}) => (
	<div style={{display: 'flex', marginLeft: 20}}>
		<FormGroup>
			<FormControlLabel
				control={
					<Switch aria-label="LoginSwitch" />
				}
				label={label}
			/>
        </FormGroup>
		{field}
		<IconButton aria-label="add">
			<AddIcon />
		</IconButton>
	</div>
);

const styles = theme => ({
	buttonStyle: {
		margin: 12,
	},
	divStyle: {
		'backgroundColor': theme.palette.background.paper,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
		'textAlign': 'left',
	},
});

const CourseSearching = ({ classes }) => {
	return (
		<div className={classes.divStyle}>
			<Paper elevation={4}>
				<AppBar position="static" color="default">
					<Typography align="center" style={{ padding: 15 }}>课程搜索引擎</Typography>
				</AppBar>
				<Typography component="div"  style={{ padding: 8 * 3 }}>
					<Paper elevation={2} style={{'width': '97%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
						<OneLine label={'课程名称'} field={<TextField label="eg.软件工程" />} />
						<Divider />
						<OneLine label={'课程时间'} field={<TextField label="eg.周四7-8节" />} />
						<Divider />
						<OneLine label={'上课地点'} field={<TextField label="eg.玉泉曹西-202" />} />
						<Divider />
						<OneLine label={'授课教师'} field={<TextField label="eg.王章野" />} />
						<Divider />
						<div style={{display:'flex', justifyContent:'center'}}>
							<Button variant="raised" className={classes.buttonStyle}>查询</Button>
							<Button variant="raised" className={classes.buttonStyle}>清空</Button>
						</div>
					</Paper>
				</Typography>
			</Paper>
		</div>
	);
};

const mapStateToProps = (state, props) => ({
	classes: props.classes,
});

const mapDispatchToProps = (dispatch, props) => ({
	
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CourseSearching));