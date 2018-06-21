import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Grid, Typography, Paper, CircularProgress } from 'material-ui';
import Annc from '../../components/annc';
import { withStyles } from 'material-ui';
import { getAnncs } from '../../views/announcements/actions';
import { PageNums } from '../../components/util/PageNums';

const styles = {
    mainpanel: {
        // height: 300,
        overflowY: "auto",
        // marginRight: -17,
        // padding: 4,
    },
    outterPanelmain: {
        overflow: "hidden",
        marginTop: 10,
        marginBottom: 30,
        // height: 700,
    },
    outterPanelsection: {
        overflow: "hidden",
        marginTop: 20,
        marginBottom: 30,
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
        //TODO: 
        const uid = 5;
        // console.log("annc match", this.props.match);
        const { pageSize, type } = this.props;
        //TODO: set different page size for different type.
        if (type === 'main') {
            this.props.getAnncs(uid, undefined, undefined, undefined, 1, pageSize);
        }
        else if (type === "section") {
            const { collegeid, courseid, teacherid } = this.props.match["params"];
            this.props.getAnncs(undefined, collegeid, courseid, teacherid, 1, pageSize);
        }
        else {
            if (this.props.match.params.collegeid) {
                const { collegeid, courseid, teacherid, pageNum } = this.props.match["params"];
                this.props.getAnncs(undefined, collegeid, courseid, teacherid, pageNum, pageSize);
            } else {
                const { pageNum } = this.props.match["params"];
                this.props.getAnncs(uid, undefined, undefined, undefined, pageNum, pageSize);
            }
        }
    }

    render() {
        const { classes, match, type, anncs, pageSize, anncNum, isFetching, link } = this.props;
        const { pageNum, collegeid, courseid, teacherid } = match.params;

        if (isFetching) {
            return <CircularProgress />;
        }
        else
            return (
                <div>
                    {/* {isFetching ? <CircularProgress />: */}
                        <div>
                            <div className={type === "main" ? classes.outterPanelmain : classes.outterPanelsection}>
                                <div className={classes.mainpanel}>
                                    {anncs && Object.values(anncs).map((annc) => {
                                        return (<Annc annc={annc} key={annc["title"] + annc["path"]} type={type} />)
                                    })}
                                </div>
                            </div>
                            {type != 'main' && type != 'section' && anncNum &&
                                <PageNums pageNum={(anncNum - 1) / pageSize + 1} currPage={pageNum} clickPage={(event) => {
                                    const page = parseInt(event.target.innerText);
                                    //TODO: 
                                    const uid = 5;
                                    if (collegeid)
                                        this.props.getAnncs(undefined, collegeid, courseid, teacherid, page, pageSize);
                                    else
                                        this.props.getAnncs(uid, undefined, undefined, undefined, page, pageSize);

                                    this.props.history.push(`${link}/${page}`);
                                }
                                } />}
                        </div>
                    {/* } */}
                </div>
            )
    }
};

AnncPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    anncs: state.forum.annc.anncs,
    anncNum: state.forum.annc.anncNum,
    isFetching: state.forum.annc.isFetching,
    pageSize: state.forum.annc.pageSize,
    // pageNum: state.forum.annc.pageNum,
    // anncCnt: state.forum.annc.anncCnt,
});

const mapDispatchToProps = (dispatch) => ({
    getAnncs: (uid, collegeid, courseid, teacherid, nextPageNum, pageSize) => {
        dispatch(getAnncs(uid, collegeid, courseid, teacherid, nextPageNum, pageSize));
    },
    // setPageNum: (pageNum) => {
    //     dispatch(setPageNum(pageNum));
    // },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(AnncPanel);

