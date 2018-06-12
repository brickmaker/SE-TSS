import React from 'react';
import { connect } from 'react-redux';

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

import {getCourseStudents} from '../actions';

const styles = theme => ({
	buttonStyle: {
		margin: 12,
	},
	divStyle: {
		'backgroundColor': theme.palette.background.paper,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
		'textAlign': 'center',
	},
});

class CourseStudent extends React.Component {
	constructor() {
		super();
	}

	render() {
		let { classes } = this.props;
		
		return (
			<div className={classes.divStyle}>
				<Paper elevation={4}>
					<AppBar position="static" color="default">
						<Typography align="center" style={{ padding: 15 }}>课程导出学生</Typography>
					</AppBar>
                    <Typography style={{padding:20}}>请输入课程ID</Typography>
                    <TextField label="Course ID" onChange={(e) => {this.text=e.target.value}}/>
					<Button variant="raised" className={classes.buttonStyle} onClick={() => {
						if(this.text) {
							this.props.getCourseStudents("courseid="+this.text)
							var str = "学号,姓名,专业\n0002,bob,CS";  
							str =  encodeURIComponent(str);  
							this.aLink.href = "data:text/csv;charset=utf-8,\ufeff"+str; 
							this.download = this.text+".csv";
							this.aLink.click();
						}
					}}>导出</Button>
					<a ref={n => this.aLink=n} download="downlaod.csv" href="#"></a>
                    {Boolean(this.props.courseStudent) &&
                        <Typography style={{padding:20}}>{JSON.stringify(this.props.courseStudent)}</Typography>
                    }
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
    classes: props.classes,
    courseStudent: state.xkxt.courseStudent,
});

const mapDispatchToProps = (dispatch, props) => ({
    getCourseStudents: attr => getCourseStudents(dispatch, attr),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CourseStudent));