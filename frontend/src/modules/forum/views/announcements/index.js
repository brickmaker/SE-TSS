import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Grid, Button } from 'material-ui';
import AnncPanel from "../../containers/anncpanel";
import { getAnncs } from './actions';

const styles = {

};

class Announcements extends Component {
    componentWillMount() {
        //TODO: 
        const uid = 5;
        console.log("annc match", this.props.match);
        if (this.props.match) {
            const { collegeid, courseid, teacherid } = this.props.match["params"];
            this.props.getAnncs(undefined, collegeid, courseid, teacherid);
        } else {
            this.props.getAnncs(uid);
        }
    }

    render() {
        const { classes, type, match } = this.props;
        return (
            <Grid container justify="center">
                {/* TODO: just for test */}
                <Grid item xs={type === 'main' ? 4 : 8}>
                    <AnncPanel type={type} />
                    {type != 'main' && <div>
                        <Button >
                            新公告
                        </Button>
                    </div>}
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
    anncCnt: state.forum.annc.anncCnt,
    currentPageIdx: state.forum.annc.currentPageIdx,
});

const mapDispatchToProps = (dispatch) => ({
    getAnncs: (uid, collegeid, courseid, teacherid) => {
        dispatch(getAnncs(uid, collegeid, courseid, teacherid));
    }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Announcements);

