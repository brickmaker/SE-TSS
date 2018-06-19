import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';

import { checkedPFFunc, postProgram, changeSnackBar } from '../actions';

const CustomTableCell = withStyles(theme => ({
	head: {
	  backgroundColor: "#DCDDDD",
	  fontSize: 14,
	},
	body: {
	  fontSize: 14,
	},
}))(TableCell);

const styles = theme => ({
	divStyle: {
		flexgrow: 1,
		'width': '95%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    row: {
		'&:nth-of-type(odd)': {
		  backgroundColor: theme.palette.background.default,
		},
    },
    buttonStyle: {
		margin: 20,
    },
    box: {
		marginLeft: -10,
	},
});

class ProgramFormulating extends React.Component{
	componentWillMount() {

	}
	render () {
		let { checkedPFBools, checkedPFFunc, classes, program, postProgram } = this.props;
		let id = 0;
		function getTable(data, type){
			return (
				<Table>
					<TableHead>
						<TableRow>
							<CustomTableCell>课程名称</CustomTableCell>
							<CustomTableCell numeric>学分</CustomTableCell>
							<CustomTableCell numeric style={{width:60}}>学期</CustomTableCell>
							<CustomTableCell style={{width:60}}>选择</CustomTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((n,i) => { return (
						<TableRow className={classes.row} key={id++}>
							<CustomTableCell>{n.name}</CustomTableCell>
							<CustomTableCell numeric>{n.credit}</CustomTableCell>
							<CustomTableCell numeric>{n.term}</CustomTableCell>
							<CustomTableCell><Checkbox
								checked={i in checkedPFBools[type]?checkedPFBools[type][i]:false}
								onChange={checkedPFFunc({type:type, i:i})}
								value="checked"
								color="primary"
								className={classes.box}
							/></CustomTableCell>
						</TableRow>
						);})}
					</TableBody>
				</Table>
			);
		}

		return (
			<Paper elevation={0} style={{'width': '97%', 'marginLeft': 'auto', 'marginRight': 'auto'}}>
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>公共课{Boolean(program) && "(最低学分:"+program.pmin+")"}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						{Boolean(program)?getTable(program.public, 'public'):''}
					</ExpansionPanelDetails>
				</ExpansionPanel>
				<ExpansionPanel disabled>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>专业必修课</Typography>
					</ExpansionPanelSummary>
				</ExpansionPanel> 
				<ExpansionPanel>
					<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
						<Typography className={classes.heading}>专业选修课{Boolean(program) && "(最低学分:"+program.mmin+")"}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						{Boolean(program)?getTable(program.major_op, 'major_op'):''}
					</ExpansionPanelDetails>
				</ExpansionPanel> 
				<Button variant="raised" className={classes.buttonStyle} onClick={() => {
					let bools = [];
					let psum=0, msum=0;
					for(let type in checkedPFBools){
						for(let key in checkedPFBools[type]){
							if(checkedPFBools[type][key]){
								bools.push([program[type][parseInt(key)].course_id, program[type][parseInt(key)].term]);
								if(type==="public") psum+=program[type][parseInt(key)].credit;
								if(type==="major_op") msum+=program[type][parseInt(key)].credit;
							}
						}
					}
					if(psum<program.pmin||msum<program.min){
						this.props.changeSnackBar(1);
						return;
					}
					for(let item in program['major_comp']) {
						bools.push([program['major_comp'][item].course_id, program['major_comp'][item].term]);
					}
					postProgram({uid:this.props.uid, courses: bools});
				}}>提交</Button>
				{Boolean(this.props.snackBarState) && <Snackbar
					open={true}
					onClose={() => this.props.changeSnackBar(null)}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">培养方案制定失败，低于最低学分</span>}
				/>}
			</Paper>
		);
	}
}

const mapStateToProps = (state, props) => ({
    checkedPFBools: state.xkxt.checkedPFBools,
	classes: props.classes,
	program: state.xkxt.program,
	uid: state.xkxt.uid,
	snackBarState: state.xkxt.snackBarState,
});

const mapDispatchToProps = (dispatch, props) => ({
	checkedPFFunc: i => event => dispatch(checkedPFFunc(i)),
	postProgram: (data) => postProgram(dispatch, data),
	changeSnackBar: (v) => dispatch(changeSnackBar(v)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProgramFormulating));