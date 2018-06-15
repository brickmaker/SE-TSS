import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actionCreators from '../../actions/auth';
import Typography from '@material-ui/core/Typography';

import Bar from "../../../../top/components/Bar";
import {listItems, otherItems} from "./StaffData";

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = theme => ({});


class StaffView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes, theme, history} = this.props;
        return (
            <Bar
                listItems={listItems}
                otherItems={otherItems}
                history={history}
                children={
                    <Typography>{'欢迎来到教务管理系统吸吸'}</Typography>
                }
            />

        );
    }
}

StaffView.propType = {
    userName: PropTypes.string,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(StaffView));

