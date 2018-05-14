import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SearchResult from '../../components/searchresult';
import { search } from '../../views/search/actions';
import { withStyles, Grid, Typography, Divider, CircularProgress, Paper } from 'material-ui';
import Redirect from 'react-router-dom/Redirect';
import { PageNums } from '../../components/util/PageNums';

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
        const { searchType, query, pageNum, pageSize } = this.props.match.params;
        this.props.search(searchType, query, pageNum, pageSize);
    }

    clickPageNum(event) {
        const page = parseInt(event.target.innerText);
        const { searchType, query } = this.props.match.params;
        window.location.href = `/forum/search/${searchType}/${query}/${page}`
    }

    render() {
        const { classes, postPageSize, sectionPageSize, isFetching } = this.props;
        const { results, resultNum } = this.props.results;
        const { searchType, query, pageNum } = this.props.match.params;
        const resultType = searchType;
        var perPageNum;
        if (searchType == 'post') {
            perPageNum = postPageSize;
        }
        else {
            perPageNum = sectionPageSize;
        }
        return (
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {isFetching ? <CircularProgress /> :
                        (pageNum > resultNum / perPageNum + 1) ?
                            <Redirect to={`/forum/search/${searchType}/${query}/1`} />
                            :
                            <div>
                                <div styles={{ marginBottom: 30 }}>
                                    <Typography variant="subheading" className={classes.item}>
                                        共{resultNum}个结果
                        </Typography>
                                    <Divider />
                                    {results &&
                                        (
                                            resultType === "post" ?
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
                                </div>
                                <PageNums pageNum={resultNum / perPageNum + 1} currPage={pageNum} clickPage={(event) => {
                                    const page = parseInt(event.target.innerText);
                                    // window.location.href = `/forum/search/${searchType}/${query}/${page}`
                                }
                                } />
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
    postPageSize: state.forum.search.postPageSize,
    sectionPageSize: state.forum.search.sectionPageSize,
    isFetching: state.forum.search.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    search: (searchType, query, pageNum, pageSize) => {
        dispatch(search(searchType, query, pageNum, pageSize));
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SearchResultPanel);

