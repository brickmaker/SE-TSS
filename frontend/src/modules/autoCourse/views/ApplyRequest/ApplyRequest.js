import React from "react";
import PropTypes from "prop-types";
import appStyle from "../../assets/jss/appStyle.jsx";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {HandleApplyButtonClick,HandleDeleteButtonClick,DisplayRequest} from "./actions";
import {connect} from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

class ApplyRequest extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [ ],
        };
    };

    state = {
        mobileOpen: false
    };
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
    componentDidMount() {
        this.props.displayRequest();
    }
    componentDidUpdate() {
    }
    render() {
        const { classes,handleApplyButtonClick,handleDeleteButtonClick,displayRequest, ...rest } = this.props;
        const data = this.props.data;
        return (
            <div className={classes.wrapper}>
                <div className={classes.mainPanel}>
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <div style={{padding: 24, background: '#fff', minHeight: 550}}>
                                <div>
                                    <Typography variant="headline" component="h0">请求列表</Typography>  
                                </div>
                                <div>
                                    <Table className={classes.table} aria-labelledby="tableTitle" style={{border:'0'}}>
                                        <TableBody>
                                            {data.slice().map(n => {
                                                return (
                                                    <TableRow key={n.id} >
                                                        <div style={{padding:10}}>
                                                            <Card className={classes.card}>
                                                                <CardContent>
                                                                    <Typography id="requestid "className={classes.title} color="textSecondary">
                                                                        请求{n.id}
                                                                    </Typography>
                                                                    <Typography variant="headline" component="h2">
                                                                        {n.teacherId} {n.teacher}老师
                                                                    </Typography>
                                                                    <Typography variant="headline" component="h2">
                                                                        {n.topic}
                                                                    </Typography>
                                                                    <Typography component="p">
                                                                        {n.content}
                                                                    </Typography>
                                                                </CardContent>
                                                                <CardActions>

                                                                    <Button size="small" onClick={()=>handleDeleteButtonClick(n)}>Delete</Button>
                                                                </CardActions>
                                                            </Card>
                                                            <div style={{padding: 10, height: 35}}/>
                                                        </div>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                    <TextField
                                        id="name"
                                        label="教师姓名"
                                        style={{paddingRight:35}}
                                    />
                                    <TextField
                                        id="type"
                                        label="请求类型"
                                    />
                                    <div style={{padding:10 ,height:35}}/>
                                    <TextField
                                        id="content"
                                        label="请求内容"
                                        style={{minWidth:100}}
                                    />
                                    <div style={{padding:10 ,height:35}}/>
                                    <Button   variant="outlined" color="primary" onClick={()=> handleApplyButtonClick(document.getElementById("name").value,document.getElementById("type").value,document.getElementById("content").value)}>提交</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ApplyRequest.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return{
        data: state.applyRequest.data,
    }
}

const mapDispatchToProps = (dispatch) =>({
    handleApplyButtonClick: (name,type,contents) => dispatch(
        HandleApplyButtonClick(name,type,contents),
    ),
    handleDeleteButtonClick : (n) =>dispatch(
        HandleDeleteButtonClick(n),
    ),
    displayRequest: () =>dispatch(
        DisplayRequest()
    ),
});

export default withStyles(appStyle)(connect(mapStateToProps, mapDispatchToProps)(ApplyRequest))
