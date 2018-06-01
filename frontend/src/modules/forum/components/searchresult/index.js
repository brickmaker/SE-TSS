import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Typography, withStyles, Divider, Grid, Card } from 'material-ui';
import { Path } from '../util/Path';
import { Link } from 'react-router-dom'
import moment from 'moment';

const styles = {
    container: {
        // justifyContent: "center",
        marginTop: 8,
        marginBottom: 8,
        // paddingTop: 10,
        // paddingBottom: 10,
        padding: 15,
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
        paddingTop: 3,
        paddingBottom: 3,
    },
    container2: {
        marginTop: 8,
        marginBottom: 8,
        verticalAlign: "middle",
        padding: 15,
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
            const { title, author, time, replyNum, relatedContent, path, postid } = result;
            return (
                <Card className={classes.container}>
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
                            <Link to={sectionPath["college"]["link"]} className={classes.link}>
                                {sectionPath['college']["name"]} </Link>
                            <Link to={sectionPath["course"]["link"]} className={classes.link}>
                                > {sectionPath['course']["name"]} </Link>
                            <Link to={sectionPath["teacher"]["link"]} className={classes.link}>
                                > {sectionPath['teacher']["name"]} </Link>
                        </div>
                        {/* <Path path={sectionPath} /> */}
                    </div>
                    <div className={classes.line}
                        onClick={(event) => {
                            event.preventDefault();
                            this.props.history.push(`/forum/p/${postid}`)
                        }}
                    >
                        <Typography className={classes.item}>
                            作者：{author["username"]}
                        </Typography>
                        <Typography className={classes.item}>
                            发表时间：{moment(time).format("YYYY-MM-DD HH:mm")}
                        </Typography>
                        <Typography className={classes.item}>
                            回复数：{replyNum}
                        </Typography>
                    </div>
                    <div className={classes.line}>
                        <Typography className={classes.item}>
                            {relatedContent}
                        </Typography>
                    </div>
                </Card>
                // {/* <Divider /> */}
            );
        }
        else if (resultType === 'section') {
            const { path, postNum, lastReplyTime } = result;
            return (
                <Card className={classes.container}
                >
                    <div className={classes.line}>
                        <div className={classes.item}>
                            <Link to={sectionPath["college"]["link"]} className={classes.link}>
                                {sectionPath['college']["name"]} </Link>
                            <Link to={sectionPath["course"]["link"]} className={classes.link}>
                                > {sectionPath['course']["name"]} </Link>
                            <Link to={sectionPath["teacher"]["link"]} className={classes.link}>
                                > {sectionPath['teacher']["name"]} </Link>
                        </div>
                    </div>

                    <div className={classes.line}
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
                </Card >
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