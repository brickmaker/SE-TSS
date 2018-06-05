import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Typography, withStyles, Divider, Grid } from 'material-ui';

const styles = {
    container: {
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        padding: 10,
    },
    item: {
        verticalAlign: "middle",
        marginLeft: 10,
        marginRight: 10,
    },
    line: {
        display: "flex",
        justifyContent: "space-between",
        verticalAlign: "middle",
        paddingTop: 10,
        paddingBottom: 10,
    },
    container2: {
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
        padding: 10,
        // backgroundColor:"#ff0000",
        verticalAlign: "middle",
        // display: "inline-block",
    },
};

class SearchResult extends Component {
    render() {
        const { resultType, result, classes } = this.props;
        if (resultType === 'post') {
            const { title, author, time, replyCnt, path } = result;
            return (
                <div>
                    <div className={classes.container}>
                        <div className={classes.line}>
                            <Typography variant="title" className={classes.item}>
                                {title}
                            </Typography>
                            <Typography className={classes.item}>
                                {path}</Typography>
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
                    </div>
                    <Divider />
                </div>
            );
        }
        else if (resultType === 'section') {
            const { sectionName, path } = result;
            return (
                // <Grid container >
                    // <Grid item xs={5} sm={5} md={4} lg={4} className={classes.container2}>
                         <div className={classes.container2}> 
                            <Typography variant="title" align="left" className={classes.item}>
                                {sectionName}
                            </Typography>
                            <Typography align="left" className={classes.item}>{path}</Typography>
                        </div>
                    // </Grid>
                // </Grid>
            );
        }
        return (
            <div>
                a search result
            </div>
        )

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