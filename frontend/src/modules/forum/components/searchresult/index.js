import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Typography, withStyles, Divider, Grid, Card, Paper } from 'material-ui';
import { Path } from '../util/Path';
import { Link } from 'react-router-dom'
import moment from 'moment';

const styles = {
    container: {
        // justifyContent: "center",
        // marginTop: 8,
        marginBottom: 1,
        padding: 23,
        // backgroundColor: "#ffffff",
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
        marginTop: 5,
        marginBottom: 7,
    },
    line2: {
        display: "flex",
        justifyContent: "flex-start",
        verticalAlign: "middle",
        marginBottom: 7,
    },
    link: {
        textDecoration: 'none',
        color: "#000000",
        display: "inline-block",
        fontSize: 17,
    },
    link2: {
        textDecoration: 'none',
        color: "#000000",
        display: "inline-block",
        fontSize: 19,
    },
    related: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 10,
    }
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
            const { title, author, time, replyNum, relatedContent, path, postid } = result;
            return (
                <Paper>
                    <div className={classes.container}>
                        <div className={classes.line}>
                            <Typography variant="title" className={classes.title}
                                onClick={(event) => {
                                    event.preventDefault();
                                    this.props.history.push(`/forum/p/${postid}`)
                                }}
                            >
                                {title}
                            </Typography>
                            <div className={classes.item}>
                                <Link to={sectionPath["college"]["link"]} className={classes.link}>{sectionPath['college']["name"]} > </Link>
                                <Link to={sectionPath["course"]["link"]} className={classes.link}>{sectionPath['course']["name"]} > </Link>
                                <Link to={sectionPath["teacher"]["link"]} className={classes.link}>{sectionPath['teacher']["name"]}</Link>
                            </div>
                            {/* <Path path={sectionPath} /> */}
                        </div>
                        <div className={classes.line}
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.history.push(`/forum/p/${postid}`)
                            }}
                        >
                            <Typography className={classes.item} variant="subheading">
                                作者：{author["username"]}
                            </Typography>
                            <Typography className={classes.item} variant="subheading">
                                发表时间：{moment(time).format("YYYY-MM-DD HH:mm")}
                            </Typography>
                            <Typography className={classes.item} variant="subheading">
                                回复数：{replyNum}
                            </Typography>
                        </div>
                        <div className={classes.related}>
                            <Typography className={classes.item}>
                                {relatedContent}
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                </Paper>
            );
        }
        else if (resultType === 'section') {
            const { path, postNum, lastReplyTime } = result;
            return (
                <Paper>
                    <div className={classes.container}
                    >
                        <div className={classes.line2}>
                            <div className={classes.item}>
                                <Link to={sectionPath["college"]["link"]} className={classes.link2}>{sectionPath['college']["name"]} ></Link>
                                <Link to={sectionPath["course"]["link"]} className={classes.link2}> {sectionPath['course']["name"]} > </Link>
                                <Link to={sectionPath["teacher"]["link"]} className={classes.link2}> {sectionPath['teacher']["name"]}</Link>
                            </div>
                        </div>

                        <div className={classes.related}
                            onClick={(event) => {
                                event.preventDefault();
                                this.props.history.push(link);
                            }}
                        >
                            <Typography align="left" className={classes.item}>
                                最后回复时间 {moment(lastReplyTime).format("YYYY-MM-DD HH:mm")}
                            </Typography>
                            <Typography align="left" className={classes.item}>
                                帖子总数 {postNum}
                            </Typography>
                        </div >
                    </div >
                    <Divider />
                </Paper>
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