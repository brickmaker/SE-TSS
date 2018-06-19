import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

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
	innerDiv: {
		'width': '80%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
		textAlign: 'left',
	},
	row: {
		'&:nth-of-type(odd)': {
		  backgroundColor: theme.palette.background.default,
		},
	},
	title0: {
		padding: 8 * 3, 
		color: "#727171",
		fontSize: 30,
	},
	title1: {
		padding: 8 * 3, 
		color: "#737373",
	},
	title2: {
		marginBottom: 10,
	}

});

const ProgramViewing = ({ classes, program }) => {
    function getTable(data){
		return (
			<Table>
				<TableHead>
					<TableRow>
						<CustomTableCell>课程名称</CustomTableCell>
						<CustomTableCell numeric>学分</CustomTableCell>
						<CustomTableCell numeric style={{width:60}}>学期</CustomTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((n, i) => { return (
					<TableRow className={classes.row} key={i}>
						<CustomTableCell>{n.name}</CustomTableCell>
						<CustomTableCell numeric>{n.credit}</CustomTableCell>
						<CustomTableCell numeric>{n.term}</CustomTableCell>
					</TableRow>
					);})}
				</TableBody>
			</Table>
		);
	}
    return (
        <Paper elevation={2} style={{'width': '97%', 'marginLeft': 'auto', 'marginRight': 'auto', textAlign:'center'}}>
            <Typography className={classes.title0}>培养方案</Typography>
            <Typography className={classes.title2}>
                {/*计算机科学与技术1502班 李朋洋 3150104666*/}
            </Typography>
            <Divider />
            <div className={classes.innerDiv}>
                <Typography variant="title" className={classes.title1}>公共课</Typography>
                {Boolean(program)?getTable(program.public):''}
                <Divider /><br/>
                <Typography variant="title" className={classes.title1}>专业必修课</Typography>
                {Boolean(program)?getTable(program.major_comp):''}
                <Divider /><br/>
                <Typography variant="title" className={classes.title1}>专业选修课</Typography>
                {Boolean(program)?getTable(program.major_op):''}
                <br/>
            </div>
        </Paper>
    );
}

const mapStateToProps = (state, props) => ({
	classes: props.classes,
	program: state.xkxt.program,
});

const mapDispatchToProps = (dispatch, props) => ({
	
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProgramViewing));