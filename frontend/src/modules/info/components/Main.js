import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';


function mapStateToProps(state) {
    return {
        status: state.info.auth.status,
        userType: state.info.auth.userType,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = theme => ({
    Helmet: {
        background: '#EEEEEE',
    },
    Typography: {
        flex: 1,
    },
    Card: {
        width: "60%",
        marginLeft: "20%",
        marginTop: "5%",
    },
    SubCard: {
        width: '28%',
        height: 200,
        marginLeft: '4%',
        marginTop: '5%',
        marginBottom: '5%',
        textAlign: 'center',
        display: 'inline-block',
    },
    Button: {
        marginTop: "25%",
        marginLeft: '25%',
        alignItems: 'center',
        fontSize: 18,
        color: "#2196F3",
    }


});


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userType: -1,
        };
    }

    componentDidMount() {
        this.setState({userType: localStorage.getItem('type')}, () => {
            let route = '';
            if (this.state.userType === '3')
                route = '/info/staff';
            this.props.history.push(route);
        });
        this.setState({userName: localStorage.getItem('name')});

    }

    render() {
        const {classes, theme} = this.props;
        return (
            <div>

            </div>
        );
    }
}


Main.propType = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Main));


