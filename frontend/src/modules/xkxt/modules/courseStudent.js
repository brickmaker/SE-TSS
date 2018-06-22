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
import Snackbar from '@material-ui/core/Snackbar';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import {getCourseStudents, clearCourseStudent, changeSnackBar, getCourse} from '../actions';

const CustomTableCell = withStyles(theme => ({
	head: {
	  backgroundColor: "#DCDDDD",
	  fontSize: 13,
	},
}))(TableCell);

const styles = theme => ({
	buttonStyle: {
		//margin: 12,
	},
	divStyle: {
		'backgroundColor': theme.palette.background.paper,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
		'textAlign': 'center',
	},
	root: {
		flexGrow: 0,
		width: '97%',
		marginTop: 10,
		paddingBottom: 20,
		'marginLeft': 'auto',
		'marginRight': 'auto',
	},
});

var HEAD;
class CourseStudent extends React.Component {
	constructor() {
		super();
	}

	downlaodData(data){
		var str = HEAD + "学号,姓名,专业\n";  
		data.forEach((d) => {
			str += d.username+","+d.name+","+d.major+"\n";
		});
		str =  encodeURIComponent(str);  
		this.aLink.href = "data:text/csv;charset=utf-8,\ufeff"+str; 
		this.download = this.text+".csv";
		this.aLink.click();
		this.props.clearCourseStudent();
	}

	componentWillMount(){
		this.props.getCourse("uid="+localStorage.username);
	}

	render() {
		let { classes, view } = this.props;

		return (
			<div className={classes.divStyle}>
				<Paper elevation={4}>
					<AppBar position="static" color="default">
						<Typography align="center" style={{ padding: 15 }}>课程导出学生</Typography>
					</AppBar>
					<Paper elevation={0} className={classes.root}>
					{Boolean(view) && <Table>
						<TableHead>
							<TableRow>
								<CustomTableCell>我的课程</CustomTableCell>
								<CustomTableCell>课程时间</CustomTableCell>
								<CustomTableCell style={{width:60}}>导出学生列表</CustomTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{view.map((n,i) => {
							return (
								<TableRow key={i} >
									<CustomTableCell >{n.name}</CustomTableCell>
									<CustomTableCell >{n.time}</CustomTableCell>
									<CustomTableCell >{
										<Button variant="raised" className={classes.buttonStyle} onClick={() => {
											HEAD = n.name + ',' + n.time.replace(', ','').replace(', ','') + '\n';
											this.props.getCourseStudents("courseid="+n.id);
										}}>导出</Button>
									}</CustomTableCell>
								</TableRow>
							);})}
						</TableBody>
					</Table>}
					</Paper>				
					<a ref={n => this.aLink=n} download="downlaod.csv" href="#"></a>
					{Boolean(this.props.courseStudent) &&
						<Typography
							onChange={this.downlaodData(this.props.courseStudent)}
						></Typography>
					}
					{Boolean(this.props.snackBarState) && <Snackbar
						open={true}
						onClose={() => this.props.changeSnackBar()}
						ContentProps={{
							'aria-describedby': 'message-id',
						}}
						message={<span id="message-id">错误课程ID</span>}
					/>}
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
    classes: props.classes,
	courseStudent: state.xkxt.courseStudent,
	snackBarState: state.xkxt.snackBarState,
	view: state.xkxt.course,
});

const mapDispatchToProps = (dispatch, props) => ({
	getCourseStudents: attr => getCourseStudents(dispatch, attr),
	clearCourseStudent: () => dispatch(clearCourseStudent()),
	changeSnackBar: () => dispatch(changeSnackBar(null)),
	getCourse: attr => getCourse(dispatch, attr),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CourseStudent));