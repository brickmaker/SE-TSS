import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,
    Switch,
    Paper,
    Zoom,
    Button,
    IconButton,
    Divider,
    Icon,
    Typography
} from 'material-ui'
import SortIcon from '@material-ui/icons/Sort'
import Dns from '@material-ui/icons/Dns'
import Description from '@material-ui/icons/Description'
import PieChart from '@material-ui/icons/PieChart'

const testCourseList = [
    {
        course_id: 0,
        course_name: '数据结构与算法',
    },
    {
        course_id: 1,
        course_name: '计算机网络',
    },
    {
        course_id: 2,
        course_name: '软件工程',
    },{
        course_id: 3,
        course_name: '人工智能',
    },

];
let count = 0;

const styles = theme => ({
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing.unit,
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
});

class SimpleZoom extends React.Component {
    state = {
        checked: false,
    };

    handleChange = () => {
        this.setState({ checked: !this.state.checked });
    };

    render() {
        const { classes } = this.props;
        const { checked } = this.state;
        return (
            <div className={classes.root}>
                {this.props.courseName}
                <IconButton checked={checked} onClick={this.handleChange}  color="primary">
                    <SortIcon/>
                </IconButton>
                {checked &&
                <div className={classes.container}>
                    <Zoom in={checked} style={{ transitionDelay: checked ? 500 : 0 }}>
                        <IconButton className={classes.button} title={"题库管理"}
                                    onClick={() => {
                                        console.log(this);
                                        const pathname = `${this.props.match.url}/question_manage/${this.props.courseInfo.course_id}`;
                                        this.props.history.push(pathname);
                                    }}

                        ><Dns/></IconButton>
                    </Zoom>
                    <Zoom in={checked} style={{ transitionDelay: checked ? 500 : 0 }}>
                        <IconButton className={classes.button} title={"试卷管理"}
                                    onClick={() => {
                                        const pathname = `${this.props.match.url}/paper_manage/${this.props.courseInfo.course_id}`;
                                        this.props.history.push(pathname);
                                    }}
                        > <Description/></IconButton>
                    </Zoom>
                    <Zoom in={checked} style={{ transitionDelay: checked ? 500 : 0 }}>
                        <IconButton className={classes.button} title={"成绩统计"}
                                    onClick={() => {
                                        const pathname = `${this.props.match.url}/grade_statistics/${this.props.courseInfo.course_id}`;
                                        this.props.history.push(pathname);
                                    }}
                        > <PieChart/></IconButton>
                    </Zoom>
                </div>

                }
            </div>

        );
    }
}

SimpleZoom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleZoom);