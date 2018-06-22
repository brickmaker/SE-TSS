import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions/auth';


function mapStateToProps(state) {
    return {
        status: state.info.auth.status,
        type: state.info.auth.type,
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
            type: -1,
        };
    }

    componentDidMount() {

        this.setState({type: this.props.type}, () => {
            let route = '';
            const type = localStorage.getItem('type');
            /*
            if (this.state.type === 'Staff')
                route = '/info/staff';
            else if (this.state.type === 'Teacher')
                route = '/info/teacher';
            else if (this.state.type === 'Student')
                route = '/info/student';
            else if (this.state.type === 'Admin')
                route = '/info/admin';
            alert(this.state.type);
            */
            if (type == 3)
                route = '/info/staff';
            else if (type == 2)
                route = '/info/teacher';
            else if (type == 1)
                route = '/info/student';
            else if (type == 4)
                route = '/info/admin';
            // alert(type);
            this.props.history.push(route);
        });
    }

    render() {
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


