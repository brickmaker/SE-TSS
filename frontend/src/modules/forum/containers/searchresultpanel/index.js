import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SearchResult from '../../components/searchresult';
import { search } from '../../views/search/actions';
import { withStyles, Grid, Typography, Divider, CircularProgress, Paper } from 'material-ui';
import Redirect from 'react-router-dom/Redirect';

const styles = {
    item: {
        margin: 10,
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
    },
}

class SearchResultPanel extends Component {
    componentWillMount() {
        const { searchType, query, pageNum } = this.props.match.params;
        this.props.search(searchType, query, pageNum);
    }

    render() {
        const { classes, postPageNum, sectionPageNum, isFetching } = this.props;
        const { results, resultNum } = this.props.results;
        const { searchType, query, pageNum } = this.props.match.params;
        const resultType = searchType;
        var perPageNum;
        if (searchType == 'post') {
            perPageNum = postPageNum;
        }
        else {
            perPageNum = sectionPageNum;
        }
        return (
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {isFetching ? <CircularProgress /> :
                        (pageNum > resultNum / perPageNum + 1) ?
                            <Redirect to={`/forum/search/${searchType}/${query}/1`} />
                            :
                            <div>
                                <Typography variant="subheading" className={classes.item}>
                                   {resultType === 'post'? "帖子：":"版块："} 共{resultNum}个结果
                        </Typography>
                                <Divider />
                                {results &&
                                    (
                                        resultType === "post" ?
                                            // <Paper>
                                                <Grid container justify="flex-start">
                                                    {
                                                        Object.values(results).map((result) => {
                                                            return (
                                                                <Grid item xs={12} sm={12}>
                                                                    <SearchResult key={result["title"]} result={result} resultType={resultType} />
                                                                </Grid>
                                                            )
                                                        })
                                                    }
                                                </Grid>
                                            // </Paper>
                                            :
                                            <Grid container justify="flex-start">
                                                {
                                                    Object.values(results).map((result) => {
                                                        return (
                                                            <Grid item xs={12}>
                                                                <SearchResult key={result["path"]} result={result} resultType={resultType} />
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                    )
                                }
                                <Typography className={classes.more}>
                                    更多结果
                        </Typography>
                            </div>
                    }
                </Grid>
            </Grid>
        );
    }
}
SearchResultPanel.propTypes = {
    classes: PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
    results: state.forum.search.results,
    postPageNum: state.forum.search.postPageNum,
    sectionPageNum: state.forum.search.sectionPageNum,
    isFetching: state.forum.search.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    search: (searchType, query, pageNum) => {
        dispatch(search(searchType, query, pageNum));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SearchResultPanel);

