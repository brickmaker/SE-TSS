import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Grid } from 'material-ui';
import AnncPanel from "../../containers/anncpanel";

const styles = {

};

// TODO: just for test
class Announcements extends Component {
    render() {
        const { classes, type } = this.props;
        return (
            <Grid container justify="center">
                <Grid item xs={type == 'main' ? 4 : 8}>
                    <AnncPanel />
                </Grid>
            </Grid>
        );
    }
}

Announcements.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    anncs: state.forum.annc.anncs,
    type: state.forum.annc.type,
    anncCnt: state.forum.annc.anncCnt,
    currentPageIdx: state.forum.annc.currentPageIdx,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Announcements);

