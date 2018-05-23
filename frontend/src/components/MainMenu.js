import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {browserHistory} from "react-router";
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import { Card, CardHeader, CardText , CardActions,} from 'material-ui/Card';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import {Helmet} from "react-helmet";


function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const style = {
    height: 180,
    width: 280,
    margin: "3%",
    textAlign: 'center',
    display: 'inline-block',
};
const buttonStyle = {
    width:200,
    marginTop: "30%",
    marginLeft:"13%",
    textAlign: 'center',
    fontSize: 20,
    color:"#2196F3",

}
@connect(mapStateToProps, mapDispatchToProps)
export default class MainMenu extends React.Component {

    constructor(props){
        super(props);
        this.state={
            username:'',
            redirectTo: '',
            drawerOpen:true,
        };
    }

    // componentDidMount() {
    //     fetch('/api/user/',{
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'JWT '+ localStorage.getItem('token'),
    //             'Content-Type': 'application/json'
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             this.setState({ user_type: data.user_type })
    //         })
    //         .catch((e) => {
    //             alert("身份验证失效，请重新登录");
    //             browserHistory.push("/login");
    //         });
    //     this.setState({userName: localStorage.getItem('userName')});
    // }


    dispatchNewRoute(e, route) {
        e.preventDefault();
        browserHistory.push(route);
        this.setState({
            redirectTo: route,
        });
    }

    logout(e) {
        e.preventDefault();
        this.props.logoutAndRedirect();

    }

    render() {

        return (
            <div >
                <Helmet bodyAttributes={{style: 'background-color : #EEEEEE'}}/>

                <AppBar title={'Hello, '+this.state.userName}
                        onLeftIconButtonTouchTap={() => this.setState({ drawerOpen: !this.state.drawerOpen })}
                        iconElementRight={
                            <FlatButton label="Exit"  onClick={(e) =>this.logout(e)}/>
                        }
                />
                <Card style={{width:"72%", marginLeft:"13%", marginTop:"3%"}}>

                    <Card style={style} onClick={(e)=>this.dispatchNewRoute(e,'student')}>
                       <CardHeader title={"基础信息管理系统"} titleStyle={buttonStyle}/>
                    </Card>
                    <Card style={style}>
                        <CardHeader title={"自动排课系统"} titleStyle={buttonStyle}/>
                    </Card>
                    <Card style={style}>
                        <CardHeader title={"选课系统"} titleStyle={buttonStyle}/>
                    </Card>
                    <Card style={style}>
                        <CardHeader title={"论坛交流系统"} titleStyle={buttonStyle}/>
                    </Card>
                    <Card style={style}>
                        <CardHeader title={"在线测试系统"} titleStyle={buttonStyle}/>
                    </Card>
                    <Card style={style}>
                        <CardHeader title={"成绩管理系统"} titleStyle={buttonStyle}/>
                    </Card>
                </Card>

            </div>
        );
    }
}


MainMenu.propType={


};


