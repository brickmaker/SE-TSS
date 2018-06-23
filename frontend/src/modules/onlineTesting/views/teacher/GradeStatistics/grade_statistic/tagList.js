import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Card,
    CardContent,
    CardActions,
    Button,
    Icon,
    CircularProgress
} from 'material-ui';


import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/brush'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/line'


import _SERVER_ADDRESS  from '../../../../configs/config'


const styles = {
    root: {
    },
    checked: {},
    size: {
        width: 40,
        height: 40,
    },
    sizeIcon: {
        fontSize: 20,
    },
};

class CheckboxLabels extends React.Component {
    state = {
        data:"",
        tags:{},
        should_update:false
    };

    chart={};

    componentDidMount(){
        let dom = document.getElementById("graph_window");
        this.chart = echarts.init(dom);
    }


    componentDidUpdate(prevProps, prevState) {
        if(this.state.should_update){
            console.log("render graph");
            this.state.should_update = false;
            this.renderGraph();
        }
    }

    getOption=(data)=>{
        let graph_data = [];
        let graph_legend_data = [];
        let graph_x_data = [];
        data.map((item, index)=>{
            if(index == 0){
                graph_x_data=item.relevantTest.map((test, index)=>index+1)
            }
            graph_data.push(
                {
                    name:item.tag,
                    type:'line',
                    data:item.relevantTest.map(test=>test.avgScore)
                }
            );
            graph_legend_data.push(item.tag);
        });

        this.chart.hideLoading();
        return {
            // title: {
            //     text: '折线图堆叠'
            // },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:graph_legend_data
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: graph_x_data
            },
            yAxis: {
                type: 'value'
            },
            series: graph_data
        };
    };


    renderGraph= ()=>{

        const {course_id} = this.props;
        const {tags} = this.state;
        let url = `http://${_SERVER_ADDRESS}/api/online_testing/analysis/tag/?course_id=${course_id}`;
        for( let tag in tags ){
            if(tags[tag]){
                url += `&tag=${tag}`
            }
        }

        console.log("get from : ", url);
        let headers = new Headers();
        headers.append(
            'Content-Type', 'application/json'
        );
        headers.append(
            'Authorization','JWT '+ localStorage.getItem('token')

        );
        fetch(url, {
            method: 'GET',
            headers:headers
        })
            .then(response => response.json())
            .then(response => {
                console.log("emmmm", response);
                this.setState(Object.assign({}, this.state, {
                    data:response
                }));
                this.chart.setOption(this.getOption(response));

            })
            .catch(err => console.log(err));


    };


    handleChange = name => event => {
        this.setState(Object.assign({}, this.state, {
                tags:Object.assign({}, this.state.tags, {
                    [name]: event.target.checked
                })
        }));

    };
    send = ()=>{
        let tmp = [];
        this.chart.showLoading();

        for (let key in this.state.tags){
           if(this.state[key]===true){
               this.props.tagList.forEach(tag=>{
                    if(key === tag.tag){
                        tmp.push()
                    }
               });
           }
        }
        this.setState(Object.assign({}, this.state, {should_update: true}));
    };
    render() {
        const { classes,tagList } = this.props;
        console.log(this.state);

        return (
            <div>
            <Card className={classes.card}>
                <CardContent>
            <FormGroup row>
                {tagList.length===0 && ( <CircularProgress className={classes.progress} />) }
                {tagList.map((tag,index)=>(
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.tags[tag.tag]}
                                onChange={this.handleChange(tag.tag.toString())}
                                value={this.state.tags[tag.tag]}
                                color="primary"
                            />
                        }
                        label={tag.tag} value={tag.tag}
                    />
                ))

                }
            </FormGroup>
                </CardContent>
                <CardActions>
                    <Button className={classes.button} variant="raised" color="primary" onClick={this.send}>
                        Send
                    </Button>
                </CardActions>
            </Card>
                <div id="graph_window" style={{width:"100%", height: 350}}/>
            </div>
        );
    }
}

CheckboxLabels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
