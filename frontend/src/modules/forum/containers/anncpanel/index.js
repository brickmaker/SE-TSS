import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Grid, Typography, Paper } from 'material-ui';
import Annc from '../../components/annc';
import { withStyles } from 'material-ui';

const styles = {
    mainpanel: {
        // height: 300,
        overflowY: "auto",
        // marginRight: -17,
        // padding: 4,
    },
    outterPanel: {
        overflow: "hidden",
        marginTop: 20,
        marginBottom: 20,
        // height: 700,
    },
    more: {
        textDecoration: "underline",
        cursor: "pointer",
        marginTop: 10,
    },
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
        const { classes, type, currentPageIdx, match, anncs, anncNum } = this.props;
        // const { anncs, anncNum } = this.props.anncs;
        console.log("match", match);
        console.log("render anncs", anncs);
        const url = match? (match.params? `/forum/annoucements/${match.params.collegeid}/${match.params.courseid}/${match.params.teacherid}`:'/forum/annoucements' ):"/forum/annoucements";
        return (
            <div>
                <div className={classes.outterPanel}>
                    <div className={classes.mainpanel}>
                        {anncs && Object.values(anncs).map((annc) => {
                            return (<Annc annc={annc} key={annc["title"] + annc["path"]} type={type} />)
                        })}
                        {/* {(type === 'main' || type === 'section') &&
                            <Typography align="center" className={classes.more}
                                onClick={(event) => {
                                    event.preventDefault();
                                    window.location.href = url;
                                }}
                            >
                                更多公告通知
                                 </Typography>
                        } */}
                    </div>
                </div>
            </div>
        )
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

