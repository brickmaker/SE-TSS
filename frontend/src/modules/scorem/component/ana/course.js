import React, {Component} from 'react';

import CChart from './course/course-chart';
import TotalTable from './course/total';
import ScoreList from './course/score-list';

const style = {
    left : {
        float : "left",
        width : "45%"
    },
    pchart : {
        height : "50%",
        margin : "10px"
    },
    scoreList : {
        float : "right",
        width : "53%",
        height : "50%",
        margin : "10px",
    },
    totalTable : {
        height : "50%",
        margin : "10px"
    }
};

class Course extends Component{
    render(){
        return (
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
        );
    }
}

export default Course;