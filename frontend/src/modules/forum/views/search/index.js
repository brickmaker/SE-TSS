import React, { Component } from 'react';
import SearchBar from '../../components/searchbar';
import SearchResultPanel from '../../containers/searchresultpanel';
import { Avatar, withStyles, Grid, Typography } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Path } from '../../components/util/Path';
import { MainBody } from '../../components/util/MainBody';

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
        const { classes, match } = this.props;
        console.log("search, match", this.props.match);
        var path = {};
        if(match.params.searchType === 'post'){
            path['post'] = {"name": `帖子 : "${match.params.query}" 的搜索结果`, "link": match.url}
        }
        else {
            path['section'] = {"name": `版块:"${match.params.query}" 的搜索结果`, "link": match.url}

        }
        console.log("path", path);
        return (
            <div>
                <MainBody>
                    <Path isMain path={path}/>
                    <Grid container className={classes.container}>
                        <Grid item xs={12} sm={10} md={8} lg={6}>
                            <SearchResultPanel match={match} />
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
    postPageSize: state.forum.search.postPageSize,
    sectionPageSize: state.forum.search.sectionPageSize,
    isFetching: state.forum.search.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Search);

