import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import AdminBar from "./AdminBar";


function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
        userName: state.auth.userName,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
const contentStyle = {
    transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)' ,
    margin: '50'
};

class Content extends React.Component{
    render(){
        return(
            <Card style={contentStyle}>
                <CardHeader title="欢迎登录信息管理系统" />
                <CardText>HELLO HELLO HELLO</CardText>
            </Card>
        );
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class AdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            drawerOpen: false,
        }
    }

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')});
    }



    render() {

        if (this.state.drawerOpen) {
            contentStyle.marginLeft = 220;
        }
        else{
            contentStyle.marginLeft = 50;
        }


        return (
            <div >

                <AdminBar/>

                <Content/>

            </div>

        );
    }
}


AdminView.propType={
    userName:React.PropTypes.string,
};


