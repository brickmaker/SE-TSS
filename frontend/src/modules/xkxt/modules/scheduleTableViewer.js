import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';

const CustomTableCell = withStyles(theme => ({
	head: {
	  backgroundColor: "#DCDDDD",
	  fontSize: 13,
    },
    body:{
        '&:nth-of-type(odd)': {
            backgroundColor: "#fafafa",
        },
    }
}))(TableCell);

const styles = theme => ({
	root: {
		flexGrow: 0,
		width: '97%',
		'marginLeft': 'auto',
		'marginRight': 'auto',
    },
    row: {  
		'&:nth-of-type(3)': {
		    backgroundColor: theme.palette.background.default,
        },
        '&:nth-of-type(6)': {
            backgroundColor: theme.palette.background.default,
        },
        '&:nth-of-type(8)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    cell0: {
        width:"13%",
        textAlign: 'center',
        //paddingLeft: 60,
    },
    cell: {
        paddingTop: 35,
        paddingBottom: 35,
        backgroundColor:"#f0f0f0",
    },
});

const TIMES = ["第一节第二节", "第三节第四节————第五节", "休息", "第六节————第七节第八节", "第九节第十节", "休息", "十一节十二节————十三节", "休息"];
var data = [];
for(let i=0; i<8; i++){
    let id = i+1;
    let label = TIMES[i];
    data.push({id, label});
}
const getCourse = (d, id) => {
    switch(id){
        case 1: return d["12"] ? d["12"] : "";
        case 2: return d["345"] ? d["345"] : (d["34"] ? d["34"].concat(["——————"]) : "");
        case 4: return d["678"] ? d["678"] : (d["78"] ? ["——————"].concat(d["78"]) : "");
        case 5: return d["910"] ? d["910"] : "";
        case 7: return d["111213"] ? d["111213"] : (d["1112"] ? d["1112"].concat(["——————"]) : "");
        default: return "";
    }
};
var idt=0;
const getCourseCell = (course) => {
    return (
        <CustomTableCell>
            {course==="" ? "" : course.map( (text) => {
                return (
                    <Typography align="center" key={"ct_"+idt++}>
                        {text}
                    </Typography>
            );})}
        </CustomTableCell>
    );
};
const convertFrom = (s) => {
    let res = {};
    s.forEach((d) => {
        if(Boolean(d.time)){
            let day = d.time.substr(1, 1);//周一
            let t = d.time.substr(3, d.time.length-4).replace(',', '').replace(',', '');//周一第3, 4, 5节
            if(!(day in res))
                res[day] = {};
            res[day][t] = [d.name, d.classroom];
        }
    });
    return res;
};

class ScheduleTableViewer extends React.Component {
    render(){
        let { classes } = this.props;
        /*let courses = convertFrom([
            {name:"编译原理", classroom:"玉泉曹西-201", time:"周一345节"},
            {name:"计算机网络", classroom:"玉泉教7-308", time:"周二345节"},
            {name:"软件工程", classroom:"玉泉曹西-202", time:"周四78节"},
        ]);*/
        let courses = convertFrom(this.props.course);
        console.log(courses);

        return (
            <Paper elevation={2} className={classes.root}>
                <Table styles={{border:1}}>
                    <TableHead>
                        <TableRow key="0">
                            <CustomTableCell style={{width:30}}>时间</CustomTableCell>
                            <CustomTableCell className={classes.cell0}>星期一</CustomTableCell>
                            <CustomTableCell className={classes.cell0}>星期二</CustomTableCell>
                            <CustomTableCell className={classes.cell0}>星期三</CustomTableCell>
                            <CustomTableCell className={classes.cell0}>星期四</CustomTableCell>
                            <CustomTableCell className={classes.cell0}>星期五</CustomTableCell>
                            <CustomTableCell className={classes.cell0}>星期六</CustomTableCell>
                            <CustomTableCell className={classes.cell0}>星期日</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(n => {
                        return (
                            <TableRow className={classes.row} key={n.id} style={{fontStyle:{color:'red'}}}>
                                { n.id===3||n.id===6||n.id===8 ? <CustomTableCell>{n.label}</CustomTableCell>
                                : <CustomTableCell className={classes.cell}>{n.label}</CustomTableCell>}
                                {getCourseCell(courses["一"] ? getCourse(courses["一"], n.id) : "")}
                                {getCourseCell(courses["二"] ? getCourse(courses["二"], n.id) : "")}
                                {getCourseCell(courses["三"] ? getCourse(courses["三"], n.id) : "")}
                                {getCourseCell(courses["四"] ? getCourse(courses["四"], n.id) : "")}
                                {getCourseCell(courses["五"] ? getCourse(courses["五"], n.id) : "")}
                                {getCourseCell(courses["六"] ? getCourse(courses["六"], n.id) : "")}
                                {getCourseCell(courses["日"] ? getCourse(courses["日"], n.id) : "")}
                            </TableRow>
                        );})}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
};

const mapStateToProps = (state, props) => ({
    classes: props.classes,
    course: state.xkxt.course,
});

const mapDispatchToProps = (dispatch, props) => ({
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ScheduleTableViewer));