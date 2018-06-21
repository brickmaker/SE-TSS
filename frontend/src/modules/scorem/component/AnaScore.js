import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import echarts from 'echarts/lib/echarts';

import  'echarts/lib/chart/bar';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import 'echarts/lib/chart/pie'

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


var getJfromS = (score) => {
    var jScore = 0;
    if (score >= 95) jScore = 5.0;
    else if (score >= 92) jScore = 4.8;
    else if (score >= 89) jScore = 4.5;
    else if (score >= 86) jScore = 4.2;
    else if (score >= 83) jScore = 3.9;
    else if (score >= 80) jScore = 3.6;
    else if (score >= 77) jScore = 3.3;
    else if (score >= 74) jScore = 3.0;
    else if (score >= 71) jScore = 2.7;
    else if (score >= 68) jScore = 2.4;
    else if (score >= 65) jScore = 2.1;
    else if (score >= 62) jScore = 1.8;
    else if (score >= 60) jScore = 1.5;
    else if (score > 0) jScore = 0.0;
    else jScore = -1;

    return jScore;
};


/**
 * 展示界面内容
 * 
 * 成绩分布图
 * 成绩统计
 * 成绩详细
 */

/**
 *  成绩分布图
 */
class MyChart extends Component{
    /**
     * name      : chartName
     * title     : title
     * chartData : data
     * charID    : 
     */
    constructor(props){
        super(props);
    }

    componentDidMount() {
        var myChart = echarts.init(document.getElementById(this.props.charID));

        myChart.setOption({
            title : {
                text : this.props.title,
                x : 'right'
            },
            toolTip : {

            },
            legend : {
                orient : 'vertical',
                x : 'left',
                data : ['无成绩', '0-59', '60-90', '70-79', '80-89', '90-100']
            },

            series : [{
                name : this.props.name,
                type : 'pie',
                radius : ['50%', '70%'],
                avoidLabelOverlap : false,
                label : {
                    normal : {
                        show : false,
                        position : 'center'
                    },
                    emphasis : {
                        show : true,
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                },
                data : this.props.chartData
            }]
        });
    }

    render() {
        return (
            <Paper>
                <div id={this.props.charID} style={{ width: "100%", height: "400%" }}></div>
            </Paper>
        );
        
    }

}

/**
 * 成绩统计
 *      平均分
 *      平均绩点
 *      挂科率
 */
class ScoreStatistics extends Component{
    /**
     * avgS
     * avgJ
     * failR
     */
    constructor(props){
        super(props);
        
    }
    render(){
        return (
            <Paper>
                  <Table>
                    <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableCell>统计项目</TableCell>
                            <TableCell>统计值</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody displayRowCheckbox={false} >
                        <TableRow>
                            <TableCell>平均分</TableCell>
                            <TableCell>{this.props.avgS}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>平均绩点</TableCell>
                            <TableCell>{this.props.avgJ}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>挂科率</TableCell>
                            <TableCell>{this.props.failR}</TableCell>
                        </TableRow>
                        {this.props.user.type === "Student" && this.props.rank == 0 &&
                        <TableRow>
                            <TableCell>排名</TableCell>
                            <TableCell>暂无排名</TableCell>
                        </TableRow>}
                        {this.props.user.type === "Student" && this.props.rank > 0 &&
                        <TableRow>
                            <TableCell>排名</TableCell>
                            <TableCell>{this.props.rank}</TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
};

/**
 * 成绩列表
 *      名称
 *      分数
 *      绩点
 */
class ScoreList extends Component{
    /**
     * name
     * data []
     *      {name:"", score:}
     */
    constructor(props){
        super(props);
        //console.log("scoreList");
        //console.log(this.props.name, this.props.data);
    }

    getTableList = () =>{
        var tableList = [];
        var data = this.props.data;
        for (var i=0; i<data.length; i++){
            var a, b;
            if (data[i].score == 0) a = b = "暂无成绩";
            else{
                a = data[i].score.toFixed(0);
                b = getJfromS(data[i].score).toFixed(1);
            }


            var a = (
                <TableRow>
                    <TableCell>{data[i].name}</TableCell>
                    <TableCell>{a}</TableCell>
                    <TableCell>{b}</TableCell>
                </TableRow>
            );
            tableList.push(a);
        }
        return tableList;
    };

    render(){
        return(
            <Paper>
                <Table>
                    <TableHead displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableCell>{this.props.name}</TableCell>
                            <TableCell>分数</TableCell>
                            <TableCell>绩点</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody displayRowCheckbox={false}>
                        {this.getTableList()}
                    </TableBody>
                </Table>
            </Paper>
        );
        
    }
}



class AnaScore extends Component{
    /**
     * topicList [string]
     * data : [data, [], []] :
     *          {name:"", score:int}
     * scoreListName [string]
     */
    state = {
        value : 0,
    };

    constructor(props){
        super(props);
        this.user = this.props.user;
        this.rank = this.props.rank;
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    getTabList = () => {
        var tabList = [];
        for (var i=0; i<this.props.topicList.length; i+=1){
            tabList.push(<Tab key={i} value={i} label={this.props.topicList[i]}/>);
        }
        return tabList;
    };

    countScoreData = (id) => {
        //console.log(this.props.data, id);
        var data = this.props.data[id];
        var res = [
            {value : 0, name : '无成绩'},
            {value : 0, name : "0-59"},
            {value : 0, name : "60-69"},
            {value : 0, name : "70-79"},
            {value : 0, name : "80-89"},
            {value : 0, name : "90-100"}
        ];
        for (var i=0; i<data.length; i++){
            if (data[i].score == 0){
                res[0].value ++;
            }
            else if (data[i].score < 60){
                res[1].value ++;
            }
            else if (data[i].score < 70){
                res[2].value ++;
            }
            else if (data[i].score < 80){
                res[3].value ++;
            }
            else if (data[i].score < 90){
                res[4].value ++;
            }
            else{
                res[5].value ++;
            }
        }
        return res;
    };

    

    getStatisticPage = (id) => {
        var data = this.props.data[id];
        var res = {
            avgS : 0,
            avgJ : 0,
            failR : 0
        };
        var resLength = 0;
        for (var i=0; i<data.length; i++){
            if (data[i].score != 0){
                res.avgS += data[i].score;
                resLength ++;
                res.avgJ += getJfromS(data[i].score);
                if (data[i].score < 60){
                    res.failR ++;
                }
            }
            
        }
        if (resLength != 0){
            res.avgS = (res.avgS / resLength).toFixed(2);
            res.avgJ = (res.avgJ / resLength).toFixed(2);
            res.failR = (res.failR / resLength * 100).toFixed(2) + "%";
        }
        else{
            res.avgS = "暂时无成绩";
            res.avgJ = "暂时无成绩";
            res.failR = "暂时无成绩";
        }
        

        return <ScoreStatistics key={"statisticPageID_"+id} avgS={res.avgS} avgJ={res.avgJ} failR={res.failR} rank={this.rank} user={this.user}/>;
    }; 

    getPage = (id) =>{
        var pageList = [];
        pageList.push(<MyChart key={"pageChatID_"+id} charID={"mychat_"+id} chartName={this.props.topicList[id]} title={"成绩分析"} chartData={this.countScoreData(id)} />);
        pageList.push(this.getStatisticPage(id));
        pageList.push(<ScoreList key={"pageListID_"+id} name={this.props.scoreListName[id]} data={this.props.data[id]} />);
        return pageList;
    };

    getAllPage = () =>{
        for (var i=0; i<this.props.data.length; i++){
            if (this.state.value == i){
                var res = this.getPage(i);
                return (
                    <div>
                        <div style={style.left}>
                            <div style={style.pchart}>
                                {res[0]}
                            </div>
                            <div style={style.totalTable}>
                                {res[1]}
                            </div>
                        </div>
                        <div style={style.scoreList}>
                            {res[2]}
                        </div>
                    </div>
                );
            }
        }
    };


    render(){
        return (
            <div>
                <Tabs value={this.state.value} onChange={this.handleChange}>
                    {this.getTabList()}
                </Tabs>
                <div>
                    {this.getAllPage()}
                </div>
            </div>
        );
    }
}

export default AnaScore;