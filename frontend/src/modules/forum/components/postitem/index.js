import React, { Component } from 'react';
import { Card, Grid, Avatar, CardContent, Typography, withStyles } from 'material-ui';
import PropTypes from 'prop-types';
import moment, { now } from 'moment';
import { Link } from 'react-router-dom';
const styles = {
    link: {
        textDecoration: 'none',
        color: "#000000",
        display: "inline-block",
        fontSize: 15,
    },
};
class PostItem extends Component {
    render() {
        const { postId, title, postTime, path } = this.props.post;
        var link;
        const sectionPath = {};
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
        return (
            <div style={{
                width: "100%",
                // backgroundColor: "#f0f0f0",
                marginTop: 20,
                marginBottom:20,
            }}>
                <div style={{
                    marginTop: 10,
                    marginBottom: 10,
                    width:"100%",
                    verticalAlign:"middle",
                // backgroundColor: "#f0f0f0",
                }}>
                    <div style={{
                        display: "inline-block",
                        width: 350,
                    }}>
                        <Link to={sectionPath["college"]["link"]} style={styles.link}>{sectionPath['college']["name"]} > </Link>
                        <Link to={sectionPath["course"]["link"]} style={styles.link}>{sectionPath['course']["name"]} > </Link>
                        <Link to={sectionPath["teacher"]["link"]} style={styles.link}>{sectionPath['teacher']["name"]}</Link>
                    </div>
                    <Typography style={{display:"inline-block"}}>{moment(postTime).format("YYYY-MM-DD HH-mm")}</Typography>
                </div>
                <Typography variant="subheading" component={Link} to={`/forum/p/${postId}`} style={{
                    cursor: "pointer",
                    textDecoration: 'none',
                    color: "#000000",
                    fontSize: 18,
                }}>{title}</Typography>
            </div>

        )
    }
}

export default PostItem;