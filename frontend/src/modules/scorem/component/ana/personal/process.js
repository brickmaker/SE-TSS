import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Process extends Component{
    render(){
        return (
            <div>
                <Paper align="center" width="60%">
                    <Typography variant="headline" component="h3">已修学分 : 133</Typography>
                    <Typography component="p">还需要 35 学分达到毕业标准</Typography>
                </Paper>
            </div>
        );
    }
}

export default Process;