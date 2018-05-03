import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Grid } from 'material-ui';
import Annc from '../../components/annc';
import { withStyles } from 'material-ui';

const styles = {
    mainpanel: {
        height: 300,
        overflow: "auto",
        marginRight: -17,
        padding: 4,
    },
    outterPanel: {
        overflow: "hidden",
        height: 700,
    }
};

class AnncPanel extends Component {
    render() {
        const { classes, anncs, type, currentPageIdx, anncCnt } = this.props;
        if (type == 'main') {
            return (
                // <div className={classes.outterPanel}>
                <div className={classes.mainpanel}>
                    {Object.values(anncs).map((annc) => {
                        return (<Annc annc={annc} key={annc["title"] + annc["path"]} />)
                    })}
                </div>
                //  </div>
            )
        }
        else {
            return (
                <div>
                    {Object.values(anncs).map((annc) => {
                        return (<Annc annc={annc} key={annc["title"] + annc["path"]} />)
                    })}
                </div>
            )
        }
    }
};

AnncPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    anncs: state.forum.annc.anncs,
    type: state.forum.annc.type,
    currentPageIdx: state.forum.annc.currentPageIdx,
    anncCnt: state.forum.annc.anncCnt,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(AnncPanel);

