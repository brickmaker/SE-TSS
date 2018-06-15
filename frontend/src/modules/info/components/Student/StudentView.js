import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/auth';
import Typography from '@material-ui/core/Typography';
import Bar from "../../../../top/components/Bar";
import {listItems, otherItems} from "./StudentData";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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

class StudentView extends React.Component {

    constructor(props) {
        super(props);
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

StudentView.propType = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(StudentView));


