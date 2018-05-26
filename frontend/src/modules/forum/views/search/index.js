import React, { Component } from 'react';
import SearchBar from '../../components/searchbar';
import SearchResultPanel from '../../containers/searchresultpanel';
import { Avatar, withStyles, Grid, Typography } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Path } from '../../components/util/Path';
import { MainBody } from '../../components/util/MainBody';
import { Route } from 'react-router-dom';
import { PageNums } from '../../components/util/PageNums';
import { search } from '../../views/search/actions';

const styles = {
    container: {
        justifyContent: "center",
    },
    more: {
        textDecoration: "underline",
        cursor: "pointer",
    },
};

class Search extends Component {
    render() {
        const { classes, match , pageNum, pageSize, resultNum, history} = this.props;
        const { searchType, query } = this.props.match.params;
        console.log("search, match", this.props.match);
        var path = {};
        if (match.params.searchType === 'post') {
            path['post'] = { "name": `帖子 : "${match.params.query}" 的搜索结果`, "link": `${match.url}/1` }
        }
        else {
            path['section'] = { "name": `版块:"${match.params.query}" 的搜索结果`, "link": `${match.url}/1` }
        }
        console.log("path", path);
        return (
            <div>
                <MainBody>
                    <Path isMain path={path} />
                    <Grid container className={classes.container}>
                        <Grid item xs={12} sm={10} md={8} lg={6}>
                            {/* <Route path={"/forum/search/:searchType/:query/:pageNum"} component={SearchResultPanel} /> */}
                            {/* <Route path={`${match.url}/:pageNum`} render={(props)=>{
                                    const newMatch = props.match;
                                    newMatch.params = Object.assign({}, newMatch.params, {
                                        "searchType": searchType,
                                        "query": query,
                                    });
                                return (
                                    <SearchResultPanel match={newMatch} history={history}/>
                                )
                            }}/> */}
                            <SearchResultPanel match={match} history={this.props.history}/>
                        </Grid>
                    </Grid>
                </MainBody>
            </div>
        );
    };
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    results: state.forum.search.results,
    isFetching: state.forum.search.isFetching,
    pageNum: state.forum.search.pageNum,
    resultNum: state.forum.search.resultNum,
    pageSize: state.forum.search.pageSize,
});

const mapDispatchToProps = (dispatch) => ({
    // setPageNum: (pageNum)=>{
    //     dispatch(setPageNum(pageNum));
    // },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Search);

