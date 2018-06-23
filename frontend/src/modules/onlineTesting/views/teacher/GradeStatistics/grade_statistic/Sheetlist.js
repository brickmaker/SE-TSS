import React from 'react';
import {Component} from 'react'
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip';
import  'echarts/lib/chart/bar';
import 'echarts/lib/component/title';
import { withStyles,
   GridList,
    GridListTile,
    GridListTileBar,
    ListSubheader,
    IconButton,
    TableCell,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableFooter,
    Avatar,
    Paper
} from 'material-ui'
import InfoIcon from '@material-ui/icons/Info';
import image1 from './img/test2.jpg';
import AssignmentIcon from '@material-ui/icons/Assignment'


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        space:100

    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    chart:{
      width:800,
        height:400
    },
});


/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

class TitlebarGridList extends Component{


    constructor(props){
        super(props);
        this.state = {
            select_index: -1,
            showChart:false,
            scoreData:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };
    }

    static defaultProps={
        option: {
            title: { text: '成绩分布图' },
            tooltip: {},
            xAxis: {
                data: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60","60-70","70-80","80-90","90-100"],
            },
            yAxis: {},
            series: [{
                name: '成绩分布 ',
                type: 'bar',
                data: [0, 0, 0, 0, 0, 0,0,0,0,0]
            }]
        },
        testList:[]
    };
    componentDidMount(){
        let dom = document.getElementById("chart");
        let myChart = echarts.init(dom);
        myChart.setOption(this.props.option);
    }
    componentDidUpdate(newProps) {
        if (this.state.showChart === true) {
            this.state.showChart = false;
            console.log("index");
            console.log(this.props);
            console.log(newProps);
            console.log(this);
            this.props.testList[this.state.select_index].whoTakeThisTest.map((item, index) => {
                let S = item.studentScore;
                console.log("S",S);
                if (S <= 100 && S > 90) {
                    this.state.scoreData[9] = this.state.scoreData[9] + 1;
                }
                else if (S <= 90 && S > 80) {
                    this.state.scoreData[8] = this.state.scoreData[8] + 1;
                }
                else if (S <= 80 && S > 70) {
                    this.state.scoreData[7] = this.state.scoreData[7] + 1;
                }
                else if (S <= 70 && S > 60) {
                    this.state.scoreData[6] = this.state.scoreData[6] + 1;
                }
                else if (S <= 60 && S > 50) {
                    this.state.scoreData[5] = this.state.scoreData[5] + 1;
                }
                else if (S <= 50 && S > 40) {
                    this.state.scoreData[4] = this.state.scoreData[4] + 1;
                }
                else if (S <= 40 && S > 30) {
                    this.state.scoreData[3] = this.state.scoreData[3] + 1;
                }
                else if (S <= 30 && S > 20) {
                    this.state.scoreData[2] = this.state.scoreData[2] + 1;
                }
                else if (S <= 20 && S > 10) {
                    this.state.scoreData[1] = this.state.scoreData[1] + 1;
                }
                else if (S <= 10 && S >= 0) {
                    this.state.scoreData[0] = this.state.scoreData[0] + 1;
                }
            });
            let dom = document.getElementById("chart");
            let myChart = echarts.init(dom);
            myChart.setOption(
                {
                    title: {text: '成绩分布图'},
                    tooltip: {},
                    xAxis: {
                        data: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100"],
                    },
                    yAxis: {},
                    series: [{
                        name: '成绩分布 ',
                        type: 'bar',
                        data: this.state.scoreData,
                    }]
                }
            );
        }
    }
    render(){
        const { classes } = this.props;
        const props = this.props;
        let tileList = [];
        console.log("render", this.props, this.state)
        props.testList.forEach((item => {
            let tmp = {img:image1,
                title:item.testName,
                author:item.testAuthor,
            };
            tileList.push(tmp);

        }));
        return (
            <div className={classes.root}>
                <GridList cellHeight={150} className={  classes.gridList}>
                    <GridListTile key="Subheader"  cols={2} style={{ height: 'auto' }} >
                        <ListSubheader component="div"></ListSubheader>
                    </GridListTile >
                    {tileList.map((tile, index) => (
                        <GridListTile key={index} cols={0.3} calssName={classes.gridListTile}>
                            <img src={tile.img} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                                subtitle={<span>by: {tile.author}</span>}
                                actionIcon={
                                    <IconButton
                                        title={tile.title}
                                        className={classes.icon}
                                        onClick={(e)=>this.setState(Object.assign({}, this.state, {select_index: index,showChart:true}))}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />

                        </GridListTile>
                    ))}
                </GridList>
                {this.state.select_index > -1 &&
                <Paper style={{width:"97%"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {tileList[this.state.select_index].title +  ` ${tileList[this.state.select_index].author}`}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Avatar >
                                        <InfoIcon />
                                    </Avatar>
                                </TableCell>
                                <TableCell>学号</TableCell>
                                <TableCell>姓名</TableCell>
                                <TableCell>成绩</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.testList[this.state.select_index].whoTakeThisTest.map((item,index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Avatar>
                                            <AssignmentIcon/>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        {`${item.studentID}`}
                                    </TableCell>
                                    <TableCell>
                                        {`${item.studentName}`}
                                    </TableCell>
                                    <TableCell>
                                        {`${item.studentScore}`}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

                }
                <div  id="chart" className={classes.chart}></div>
            </div>
        );
    }
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);