import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Grid, Button, Typography } from 'material-ui';
import AnncPanel from "../../containers/anncpanel";
import { getAnncs } from './actions';
import { Path } from '../../components/util/Path';

const styles = {
    more: {
        textDecoration: "underline",
        cursor: "pointer",
    },
};

class Announcements extends Component {
    componentWillMount() {
        //TODO: 
        const uid = 5;
        console.log("annc match", this.props.match);
        const { currentPageNum, pageSize, type } = this.props;
        //TODO: set different page size for different type.
        if (type === 'main' || type === "section") {
            if (this.props.match) {
                const { collegeid, courseid, teacherid } = this.props.match["params"];
                this.props.getAnncs(undefined, collegeid, courseid, teacherid, 1, pageSize);
            } else {
                this.props.getAnncs(uid, undefined, undefined, undefined, 1, pageSize);
            }
        }
        else {
            if (this.props.match) {
                const { collegeid, courseid, teacherid } = this.props.match["params"];
                this.props.getAnncs(undefined, collegeid, courseid, teacherid, currentPageNum, pageSize);
            } else {
                this.props.getAnncs(uid,undefined, undefined, undefined, currentPageNum, pageSize);
            }
        }
    }

    render() {
        const { classes, type, match, anncNum , anncs} = this.props;
        const sectionPath = {};
        console.log("render annc", anncs);
        // var link;
        if (match) {
            if (anncs.length) {
                if (match.params["collegeid"]) {
                    sectionPath["college"] = { "name": anncs[0]["path"]["college"]["name"], "link": `/forum/${match.params["collegeid"]}` };
                };
                if (match.params["courseid"]) {
                    sectionPath["course"] = { "name": anncs[0]["path"]["course"]["name"], "link": `/forum/${match.params["collegeid"]}/${match.params["courseid"]}` };
                };
                if (match.params["teacherid"]) {
                    sectionPath["teacher"] = { "name": anncs[0]["path"]["teacher"]["name"], "link": `/forum/${match.params["collegeid"]}/${match.params["courseid"]}/${match.params["teacherid"]}` };
                };
            }
            sectionPath["annc"] = { "name": "公告通知", "link": match.url };
        }
        return (
            <div>
                <Grid container justify="center">
                    <Grid item xs={(type === 'main' || type === 'section') ? 12 : 8}>
                        {type != 'main' && type != 'section' &&
                            <div>
                                {Object.keys(match.params).length ? <Path path={sectionPath}/>:
                            <Path isMain path={sectionPath}/>}
                                <Typography variant="subheading" className={classes.item}>
                                    共{anncNum}个公告
                        </Typography>
                            </div>
                        }
                        <AnncPanel type={type} match={match} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Announcements.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    anncs: state.forum.annc.anncs,
    currentPageNum: state.forum.annc.currentPageNum,
    anncNum: state.forum.annc.anncNum,
    pageSize: state.forum.annc.pageSize,
});

const mapDispatchToProps = (dispatch) => ({
    getAnncs: (uid, collegeid, courseid, teacherid, nextPageNum, pageSize) => {
        dispatch(getAnncs(uid, collegeid, courseid, teacherid, nextPageNum, pageSize));
    }
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Announcements);

