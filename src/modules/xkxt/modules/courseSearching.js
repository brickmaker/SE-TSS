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

import CourseViewer from './courseViewer';
import { changeCSFunc } from '../actions';


const LABELS = ["eg.软件工程", "eg.周四第1, 2节", "eg.王章野"];//"eg.玉泉曹西-202",
const KEYS = ['name', 'time', 'teacher'];//'classroom',

class OneLine extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		let {label, index, text, BOOLS, TEXT} = this.props;
		let field = [];
		let i = 1;
		TEXT[index][0]=this.state['0'];
		for(i=1; i<=3; i++) {
			let ti=i;
			if((i).toString() in this.state) {
				field.push(<TextField key={ti} label={"或"} onChange={(event) => {let t={};t[ti]=event.target.value;this.setState(t);}} />);
				TEXT[index][i]=this.state[i.toString()];
			}
			else
				break;
		}
		return (
			<div style={{display: 'flex', marginLeft: 20, marginBottom: 5}}>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch aria-label="LoginSwitch" onChange={(e, v) => {BOOLS[index]=v;}}/>
						}
						label={label}
					/>
				</FormGroup>
				<TextField label={LABELS[index]} onChange={(event) => {this.setState({0:event.target.value});}}/>
				{field}
				{i<=3 &&
					<IconButton aria-label="add" onClick={() => {let t={};t[i]='';TEXT[index].push('');this.setState(t);}}>
						<AddIcon />
					</IconButton>
				}
			</div>
		);
	}
}

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

class CourseSearching extends React.Component {
	constructor() {
		super();
		this.BOOLS = [false, false, false, false];
		this.TEXT = [['',], ['',], ['',], ['',]];
	}

	render() {
		let { classes } = this.props;
		
		return (
			<div className={classes.divStyle}>
				<Paper elevation={4}>
					<AppBar position="static" color="default">
						<Typography align="center" style={{ padding: 15 }}>课程搜索引擎</Typography>
					</AppBar>
					<Typography component="div"  style={{ padding: 8 * 3 }}>
						{this.props.CS_show===0 &&
						<Paper elevation={2} style={{'width': '97%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
							<OneLine index={0} label={'课程名称'} BOOLS={this.BOOLS} TEXT={this.TEXT} />
							<Divider />
							<OneLine index={1} label={'课程时间'} BOOLS={this.BOOLS} TEXT={this.TEXT} />
							<Divider />
							{/*<OneLine index={2} label={'上课地点'} BOOLS={this.BOOLS} TEXT={this.TEXT} />
							<Divider />*/}
							<OneLine index={2} label={'授课教师'} BOOLS={this.BOOLS} TEXT={this.TEXT} />
							<Divider />
							<div style={{display:'flex', justifyContent:'center'}}>
								<Button variant="raised" className={classes.buttonStyle} onClick={() => {
									let query = "&userid="+this.props.uid;
									for(let i in this.TEXT){
										if(this.BOOLS[i]){
											let t =  '&' + KEYS[i] + '=';
											for(let j in this.TEXT[i]){
												if(Boolean(this.TEXT[i][j]) && this.TEXT[i][j] !== '')
													t += this.TEXT[i][j]+',';
											}
											query += t;
										}
									}
									this.query = query;
									this.props.changeCSFunc(1);
								}}>查询</Button>
								{/*<Button variant="raised" className={classes.buttonStyle}>清空</Button>*/}
							</div>
						</Paper>
						}
						{this.props.CS_show===1 && 
						<CourseViewer query={this.query} />}
					</Typography>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	classes: props.classes,
	CS_show: state.xkxt.CS_show,
	uid: localStorage.username,//state.xkxt.uid,
});

const mapDispatchToProps = (dispatch, props) => ({
	changeCSFunc:i => dispatch(changeCSFunc(i)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CourseSearching));