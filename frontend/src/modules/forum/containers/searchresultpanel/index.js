import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SearchResult from '../../components/searchresult';
import { search } from '../../views/search/actions';
import { withStyles, Grid, Typography, Divider, CircularProgress } from 'material-ui';
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
                                <Typography variant="caption" className={classes.item}>
                                    共{resultNum}个结果
                        </Typography>
                                <Divider />
                                {results &&
                                    <Grid container justify="flex-start">
                                        {
                                            Object.values(results).map((result) => {
                                                return (
                                                    <Grid item xs={12} sm={resultType === 'post' ? 12 : 6}>
                                                        <SearchResult key={resultType === 'post' ? result["title"] : result["path"]} result={result} resultType={resultType} />
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
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

