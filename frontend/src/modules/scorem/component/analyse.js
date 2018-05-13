import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';

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



class AnalysisTabs extends Component{
    render(){
        return (
            <MuiThemeProvider>
                <Tabs>
                    <Tab label="个人分析">
                        <div>
                            <Personal data={JSON.stringify(data)} />
                        </div>
                    </Tab>
                    <Tab label="班级分析">
                        <div>
                            <Course />
                        </div>
                    </Tab>
                </Tabs>
            </MuiThemeProvider>
        );
    }
}

export default AnalysisTabs;