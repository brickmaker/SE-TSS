import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/auth';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Link} from "react-router";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import {
    Home,
    AccountBox,
    SupervisorAccount,
    Class,
    Star,
} from '@material-ui/icons';

import Bar from "../../../../top/components/Bar";
import {listItems, otherItems} from "./TeacherData";

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = theme => ({
    card:{
      margin: '50px',
      position: 'relative',
      overflow:  'auto',
      height: '50%',
      width: '90%',
    },
});



class TeacherView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }

    componentDidMount() {

    }

    render() {
        const {classes, theme,history} = this.props;
        return (
            <Bar
                listItems={listItems}
                otherItems={otherItems}
                children={
                   <Card className={classes.card}>
                    <CardContent>
                    <Typography variant="display1" gutterBottom>{'欢迎来到教务管理系统,'+localStorage.getItem('name')}</Typography>
                    </CardContent>
                    </Card>
                }
                history = {history}
            />

        );
    }
}

TeacherView.propType = {
    userName: PropTypes.string,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(TeacherView));


