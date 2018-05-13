import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Typography, withStyles, Divider, Grid, Card } from 'material-ui';
import { Path } from '../util/Path';
import { Link } from 'react-router-dom'

const styles = {
    container: {
        // justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        // paddingTop: 10,
        // paddingBottom: 10,
        padding: 20,
        backgroundColor: "#ffffff",
    },
    item: {
        verticalAlign: "middle",
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        verticalAlign: "middle",
        marginLeft: 10,
        marginRight: 10,
        cursor: "pointer",
    },
    line: {
        display: "flex",
        justifyContent: "space-between",
        verticalAlign: "middle",
        paddingTop: 10,
        paddingBottom: 10,
    },
    line2: {
        display: "flex",
        justifyContent: "space-between",
        verticalAlign: "middle",
        paddingTop: -10,
        paddingBottom: 10,
    },
    container2: {
        marginTop: 10,
        marginBottom: 10,
        verticalAlign: "middle",
        padding: 20,
        // borderWidth: 1,
        // borderStyle: "solid",
        // borderRadius: 5,
        backgroundColor: "#ffffff",
    },
    link: {
        textDecoration: 'none',
        color: "#000000",
    },
};

class SearchResult extends Component {
    render() {
        const { resultType, result, classes } = this.props;
        const { path } = result;
        const sectionPath = {};
        var link;
        if (path["college"]) {
            sectionPath["college"] = { "name": path["college"]["name"], "link": `/forum/${path["college"]["id"]}` };
            link = sectionPath["college"]["link"];
        };
        if (path["course"]) {
            sectionPath["course"] = { "name": path["course"]["name"], "link": `/forum/${path["college"]["id"]}/${path["course"]["id"]}` };
            link = sectionPath["course"]["link"];
        };
        if (path["teacher"]) {
            sectionPath["teacher"] = { "name": path["teacher"]["name"], "link": `/forum/${path["college"]["id"]}/${path["course"]["id"]}/${path["teacher"]["id"]}` };
            link = sectionPath["teacher"]["link"];
        };
        if (resultType === 'post') {
            const { title, author, time, replyCnt, path, postid } = result;
            return (
                <Card className={classes.container}>
                    <div className={classes.line}>
                        <Typography variant="title" className={classes.title}
                            onClick={(event) => {
                                event.preventDefault();
                                window.location.href = `/forum/p/${postid}`;
                            }}
                        >

                            {title}
                        </Typography>
                        <div className={classes.item}>
                            <Link to={sectionPath["college"]["link"]} className={classes.link}>
                                {sectionPath['college']["name"]} </Link>
                            <Link to={sectionPath["course"]["link"]} className={classes.link}>
                                > {sectionPath['course']["name"]} </Link>
                            <Link to={sectionPath["teacher"]["link"]} className={classes.link}>
                                > {sectionPath['teacher']["name"]} </Link>
                        </div>
                        {/* <Path path={sectionPath} /> */}
                    </div>
                    <div className={classes.line}>
                        <Typography className={classes.item}>
                            作者：{author}
                        </Typography>
                        <Typography className={classes.item}>
                            最后回复时间：{time}
                        </Typography>
                        <Typography className={classes.item}>
                            回复数：{replyCnt}
                        </Typography>
                    </div>
                </Card>
                // {/* <Divider /> */}
            );
        }
        else if (resultType === 'section') {
            const { path, postNum, lastReplyTime } = result;
            return (
                <div className={classes.container}
                >
                    <div className={classes.line}>
                        <div className={classes.item}>
                            <Link to={sectionPath["college"]["link"]} className={classes.link}>
                                {sectionPath['college']["name"]} </Link>
                            <Link to={sectionPath["course"]["link"]} className={classes.link}>
                                > {sectionPath['course']["name"]} </Link>
                            <Link to={sectionPath["teacher"]["link"]} className={classes.link}>
                                > {sectionPath['teacher']["name"]} </Link>
                            {/* <Path path={sectionPath} /> */}
                        </div>
                    </div>

                    <div className={classes.line2}
                    >
                        <Typography align="left" className={classes.item}>
                            最后回复时间 {lastReplyTime}
                        </Typography>
                        <Typography align="left" className={classes.item}>
                            帖子总数 {postNum}
                        </Typography>
                    </div >
                </div >
            );
        }
    }
}


SearchResult.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SearchResult);