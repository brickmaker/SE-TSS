import React from "react";
import PropTypes from "prop-types";
import Sidebar  from "../../component/Sidebar";
import AutoCourseRoutes from "../../routes/AutoCourseRoutes";
import appStyle from "../../assets/jss/appStyle.jsx";
import logo from "../../assets/img/reactlogo.png";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {HandleAgreeButtonClick,HandleRejectButtonClick,DisplayRequest} from "./actions";
import {connect} from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

class HandleRequest extends React.Component {
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
        const { classes,handleAgreeButtonClick,handleRejectButtonClick,displayRequest, ...rest } = this.props;
        const data = this.props.data;
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={AutoCourseRoutes}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    {...rest}
                />
                <div className={classes.mainPanel}>
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <div style={{padding: 24, background: '#fff', minHeight: 550}}>
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
                                                                            <Button size="small" onClick={(e)=>handleAgreeButtonClick(n)}>Agree</Button>
                                                                            <Button size="small" onClick={(e)=>handleRejectButtonClick(n)}>Reject</Button>
                                                                        </CardActions>
                                                                    </Card>
                                                            </div>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

HandleRequest.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return{
        data: state.handleRequest.data,
    }
}

const mapDispatchToProps = (dispatch) =>({
    handleAgreeButtonClick: (n) => dispatch(
        HandleAgreeButtonClick(n),
    ),
    handleRejectButtonClick : (n) =>dispatch(
        HandleRejectButtonClick(n),
    ),
    displayRequest: () =>dispatch(
        DisplayRequest()
    ),
});

export default withStyles(appStyle)(connect(mapStateToProps, mapDispatchToProps)(HandleRequest))
