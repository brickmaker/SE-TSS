import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabs from 'material-ui/Tabs';
import Tab from 'material-ui/Tabs';
import Personal from './ana/personal';
import Course from './ana/course';

const data = [
    {
        "student" : "3150104111",
        "course" : "test",
        "teacher" : "111000",
        "score" : "50",
        "test_date" : "2018-04-30",
    },
    {
        "student" : "3150104112",
        "course" : "test",
        "teacher" : "111000",
        "score" : "75",
        "test_date" : "2018-04-30",
    },
];


/*
<div>
                    <Course />
                </div>
*/
class AnalysisTabs extends Component{
    
    render(){
        return (
            <MuiThemeProvider>
                <div>
                    <Course />
                </div>
                
            </MuiThemeProvider>
        );
    }
}

export default AnalysisTabs;