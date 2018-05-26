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
        const { searchType, query, pageNum } = this.props.match.params;
        this.props.search(searchType, query, pageNum, this.props.pageSize);
    }

    render() {
        const { classes, pageSize, isFetching, results, resultNum, history } = this.props;
        // const { results, resultNum } = this.props.results;
        const { searchType, query, pageNum } = this.props.match.params;
        const resultType = searchType;
        // console.log("pageNum", pageNum);
        // console.log("max", isFetching, resultNum, resultNum/perPageNum+1);
        // console.log("max", pageNum > resultNum/perPageNum+1);
        return (
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    {isFetching ? <CircularProgress /> :
                        (resultNum && pageNum > resultNum / pageSize + 1) ?
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
                                                                    <SearchResult key={result["title"]} result={result} resultType={resultType} history={history} />
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
                                                                    <SearchResult key={result["path"]} result={result} resultType={resultType} history={history} />
                                                                </Grid>
                                                            )
                                                        })
                                                    }
                                                </Grid>
                                        )
                                    }
                                </div>
                                <PageNums pageNum={resultNum / pageSize + 1} currPage={pageNum} clickPage={(event) => {
                                    const page = parseInt(event.target.innerText);
                                    this.props.search(searchType, query, pageNum, pageSize);
                                    this.props.history.push(`/forum/search/${searchType}/${query}/${page}`);
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
    resultNum: state.forum.search.resultNum,
    pageSize: state.forum.search.pageSize,
    isFetching: state.forum.search.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
    search: (searchType, query, pageNum, pageSize) => {
        dispatch(search(searchType, query, pageNum, pageSize));
    },
    // setPageNum: (pageNum)=>{
    //     dispatch(setPageNum(pageNum));
    // },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SearchResultPanel);

