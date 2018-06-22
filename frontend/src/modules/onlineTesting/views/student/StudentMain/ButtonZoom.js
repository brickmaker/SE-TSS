import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { withStyles,
    Switch,
    Paper,
    Zoom,
    Button,
    IconButton,
    Icon,
    Divider,
    Typography
} from 'material-ui'
import SortIcon from '@material-ui/icons/Sort'
import Dns from '@material-ui/icons/Dns'
import PieChart from '@material-ui/icons/PieChart'
import {
   Route
} from 'react-router-dom'

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
            <div>
                {this.props.courseName}
                <IconButton checked={checked} onClick={this.handleChange}  color="primary">
                    <SortIcon/>
                </IconButton>
                {checked &&
                <div className={classes.container}>
                    <Zoom in={checked}>
                        <IconButton className={classes.button} title={"试题列表"}
                                    onClick={(e)=>{
                                        this.props.history.push(`${this.props.match.url}/exam_list/${this.props.course_id}`);
                                    }
                                    }

                        ><Dns/></IconButton>
                    </Zoom>
                    <Zoom in={checked} style={{ transitionDelay: checked ? 500 : 0 }}>
                        <IconButton className={classes.button} title={"历史成绩"}
                                    onClick={(e)=>{
                                        this.props.history.push(`${this.props.match.url}/history_grade/${this.props.course_id}`);
                                    }
                                    }
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