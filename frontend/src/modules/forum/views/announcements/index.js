import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Grid, Button, Typography, CircularProgress } from 'material-ui';
import AnncPanel from "../../containers/anncpanel";
import { getAnncs } from './actions';
import { Path } from '../../components/util/Path';
import { MainBody } from '../../components/util/MainBody';
import { PageNums } from '../../components/util/PageNums';
import Route from 'react-router-dom/Route';

const styles = {
    more: {
        textDecoration: "underline",
        cursor: "pointer",
    },
};

class Announcements extends Component {
    componentWillMount() {
        // //TODO: 
        // const uid = 5;
        // console.log("annc match", this.props.match);
        // const { pageSize, type } = this.props;
        // //TODO: set different page size for different type.
        // if (type === 'main') {
        //     this.props.getAnncs(uid, undefined, undefined, undefined, 1, pageSize);
        // }
        // else if (type === "section") {
        //     const { collegeid, courseid, teacherid } = this.props.match["params"];
        //     this.props.getAnncs(undefined, collegeid, courseid, teacherid, 1, pageSize);
        // }
        // else {
        //     if (this.props.match.params.collegeid) {
        //         const { collegeid, courseid, teacherid, pageNum } = this.props.match["params"];
        //         this.props.getAnncs(undefined, collegeid, courseid, teacherid, pageNum, pageSize);
        //     } else {
        //         const { pageNum } = this.props.match["params"];
        //         this.props.getAnncs(uid, undefined, undefined, undefined, pageNum, pageSize);
        //     }
        // }
    }

    render() {
        const { classes, type, match, anncNum, anncs, pageSize, isFetching } = this.props;
        const { collegeid, courseid, teacherid,pageNum } = match.params;
        const sectionPath = {};
        // console.log("render annc", anncs);
        var link = '/forum/announcements';
        if (match) {
            if (anncs.length) {
                if (match.params["collegeid"]) {
                    sectionPath["college"] = { "name": anncs[0]["path"]["college"]["name"], "link": `/forum/${match.params["collegeid"]}` };
                    link += `/section/${collegeid}`;
                }
                else {
                    link += `/user`;
                }
                if (match.params["courseid"]) {
                    sectionPath["course"] = { "name": anncs[0]["path"]["course"]["name"], "link": `/forum/${match.params["collegeid"]}/${match.params["courseid"]}` };
                    link += `/${courseid}`;
                };
                if (match.params["teacherid"]) {
                    sectionPath["teacher"] = { "name": anncs[0]["path"]["teacher"]["name"], "link": `/forum/${match.params["collegeid"]}/${match.params["courseid"]}/${match.params["teacherid"]}` };
                    link += `/${teacherid}`;
                };
            }
            sectionPath["annc"] = { "name": "公告通知", "link": match.url };
        }
        if (type != 'main' && type != 'section') {
            return (
                // <div>
                    <MainBody>
                        {Object.keys(match.params).length > 1 ? <Path path={sectionPath} /> :
                            <Path isMain path={sectionPath} />}
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <div>
                                    <div>
                                        <Typography variant="subheading" className={classes.item}>
                                            共{anncNum}个公告
                                    </Typography>
                                    </div>
                                    {/* <Route path={`${match.url}/:pageNum`} render={(props) => {
                                        const newMatch = props.match;
                                        newMatch.params = Object.assign({}, newMatch.params, {
                                            "collegeid": collegeid,
                                            "courseid": courseid,
                                            "teacherid": teacherid,
                                        });
                                        console.log("newmatch", newMatch);
                                        return (
                                            <AnncPanel type={type} match={newMatch} oldlink={props.match.url} />
                                        );
                                    }} /> */}
                                    <AnncPanel type={type} match={match} history={this.props.history} link={link}/>
                                    {/* {anncNum && <PageNums pageNum={anncNum / pageSize + 1} currPage={pageNum} clickPage={(event) => {
                                        const page = parseInt(event.target.innerText);
                                        this.props.history.push(`${link}/${page}`);
                                    }
                                    } />} */}
                                </div>
                            </Grid>
                        </Grid>
                    </MainBody>
                // </div>
            )
        }
        else return (
            // <div>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <AnncPanel type={type} match={match} />
                    </Grid>
                </Grid>
            // </div>
        );
    }
}

Announcements.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    anncs: state.forum.annc.anncs,
    anncNum: state.forum.annc.anncNum,
    pageSize: state.forum.annc.pageSize,
    pageNum: state.forum.annc.pageNum,
    isFetching: state.forum.annc.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    getAnncs: (uid, collegeid, courseid, teacherid, nextPageNum, pageSize) => {
        dispatch(getAnncs(uid, collegeid, courseid, teacherid, nextPageNum, pageSize));
    }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Announcements);

