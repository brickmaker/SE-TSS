import React, { Component } from 'react';
import SearchBar from '../../components/searchbar';
import SearchResultPanel from '../../containers/searchresultpanel';
import { Avatar, withStyles, Grid, Typography, Paper } from 'material-ui';
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
        const { classes, match, pageNum, pageSize, resultNum, history } = this.props;
        const { searchType, query } = this.props.match.params;
        console.log("search, match", this.props.match);
        var path = {};
        let flag = false;
        if (match.params.searchType === 'post') {
            path['post'] = { "name": `帖子 : "${match.params.query}" 的搜索结果`, "link": `${match.url}/1` }
            flag = true;
        }
        else if(match.params.searchType === 'section'){
            path['section'] = { "name": `版块:"${match.params.query}" 的搜索结果`, "link": `${match.url}/1` }
            flag = true;
        }
        else {
            path['search'] = {"name": "搜索", "link": match.url}
        }
        console.log("path", path);
        return (
            <MainBody>
                <Path isMain path={path}/>
                <Grid container className={classes.container}>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                    {/* <Paper> */}
                        <SearchBar history={this.props.history} />
                        {flag && <SearchResultPanel match={match} history={this.props.history} />}
                        {/* </Paper> */}
                    </Grid>
                </Grid>
            </MainBody>
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

