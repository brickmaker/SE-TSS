import React, {Component} from 'react';

import CChart from './course/course-chart';
import TotalTable from './course/total';
import ScoreList from './course/score-list';
import Process from './personal/process';

import Select from '@material-ui/core/Select';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import Personal from './personal';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const style = {
    left : {
        float : "left",
        width : "43%"
    },
    pchart : {
        height : "50%",
        margin : "10px"
    },
    scoreList : {
        float : "right",
        width : "50%",
        height : "50%",
        margin : "10px",
    },
    totalTable : {
        height : "50%",
        margin : "10px"
    }
};


class Course extends Component{
    state = {
        value : 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
      };
    render(){
        const {value} = this.state;
        return (
            
            <Paper>
                <div>
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab value={0} label="个人分析"/>
                        <Tab value={1} label="个人进展"/>
                        <Tab value={2} label="软件工程"/>
                        <Tab value={3} label="编译原理"/>
                    </Tabs>
                    <div>
                        {value === 0 &&
                            <Personal />
                        }
                        {value === 1 &&
                            <Process />
                        }
                        {value === 2 && 
                            <div>
                                <div style={style.left}>
                                    <div style={style.pchart}>
                                        <CChart />
                                    </div>
                                    <div style={style.totalTable}>
                                        <TotalTable />
                                    </div>
                                </div>
                                <div style={style.scoreList}>
                                    <ScoreList />
                                </div>
                            </div>
                        }
                        {value === 3 &&
                            <div>
                            <div style={style.left}>
                                <div style={style.pchart}>
                                    <CChart />
                                </div>
                                <div style={style.totalTable}>
                                    <TotalTable />
                                </div>
                            </div>
                            <div style={style.scoreList}>
                                <ScoreList />
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </Paper>
        );
    }
}

export default Course;