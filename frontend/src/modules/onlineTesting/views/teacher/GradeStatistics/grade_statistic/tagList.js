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
import 'echarts/lib/component/title'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/brush'
import 'echarts/lib/component/legend'


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
    };
    data;
    componentDidMount(){

    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });

    };
    send = ()=>{
       let tmp = [];
       for (let key in this.state){
           console.log(this.state[key]);
           if(this.state[key]===true){
               this.props.tagList.forEach(tag=>{
                    if(key === tag.tag){
                        tmp.push()
                    }

               });
           }
       }
    };
    render() {
        const { classes,tagList } = this.props;
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
                                checked={this.state[tag.tag]}
                                onChange={this.handleChange(tag.tag.toString())}
                                value={this.state[tag.tag]}
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

            </div>
        );
    }
}

CheckboxLabels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
