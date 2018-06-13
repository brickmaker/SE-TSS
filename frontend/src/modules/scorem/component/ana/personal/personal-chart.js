import React, {Component} from 'react';

import echarts from 'echarts/lib/echarts';

import  'echarts/lib/chart/bar';

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import 'echarts/lib/chart/pie'

import Paper from '@material-ui/core/Paper';

class PChart extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myPChart = echarts.init(document.getElementById('p-chart'));
        // 绘制图表
        myPChart.setOption({
            title: { text: '个人成绩分析', x : 'right' },
            tooltip: {
                
            },
            legend : {
                orient : 'vertical',
                x : 'left',
                data : ['0-59', '60-69', '70-79', '80-89', '90-100'],
            },
            
            series: [{
                name: '统计1',
                type: 'pie',
                radius:['50%', '70%'],
                avoidLabelOverlap : false,
                label : {
                    normal : {
                        show : false,
                        position : 'center',
                    },
                    emphasis : {
                        show : true,
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold',
                        }
                    }
                },
                data: [
                    {value:0, name:'0-59'},
                    {value:5, name:'60-69'},
                    {value:7, name:'70-79'},
                    {value:12, name:'80-89'},
                    {value:7, name:'90-100'},
                ]
            }]
        });
    }
    render() {
        return (
            <Paper>
                <div id="p-chart" style={{ width: "100%", height: "400%" }}></div>
            </Paper>
        );
    }
}

export default PChart;