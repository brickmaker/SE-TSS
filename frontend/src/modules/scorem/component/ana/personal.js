import React, {Component} from 'react';

import Paper from 'material-ui/Paper';

import PChart from './personal/personal-chart';
import ScoreList from './personal/score-list';
import TotalTable from './personal/total';

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
        width : "50%",
        height : "50%",
        margin : "10px",
    },
    totalTable : {
        height : "50%",
        margin : "10px"
    }
};


class Personal extends React.Component{
    render(){
        return (
            <div>
                <div style={style.left}>
                    <div style={style.pchart}>
                        <PChart />
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

export default Personal;