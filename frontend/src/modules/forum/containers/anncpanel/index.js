import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Grid, Typography } from 'material-ui';
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
    componentWillMount() {
        const { type } = this.props;
        if (type === 'main') {

        }
        else {

        }
    }

    render() {
        const { classes, type, currentPageIdx } = this.props;
        const {anncs, anncNum} = this.props.anncs;
        // if (type === 'main') {
        return (
            <div>
                <Typography variant="title">
                    公告
                    </Typography>
                {/* <div className={classes.outterPanel}> */}
                <div className={classes.mainpanel}>
                    {anncs && Object.values(anncs).map((annc) => {
                        return (<Annc annc={annc} key={annc["title"] + annc["path"]} />)
                    })}
                </div>
                {/* </div> */}
            </div>
        )
        // }
        // else {
        //     return (
        //         <div className={classes.mainpanel}>
        //             {Object.values(anncs).map((annc) => {
        //                 return (<Annc annc={annc} key={annc["title"] + annc["path"]} />)
        //             })}
        //         </div>
        //     )
        // }
    }
};

AnncPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    anncs: state.forum.annc.anncs,
    currentPageIdx: state.forum.annc.currentPageIdx,
    // anncCnt: state.forum.annc.anncCnt,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(AnncPanel);

