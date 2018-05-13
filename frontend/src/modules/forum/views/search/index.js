import React, { Component } from 'react';
import SearchBar from '../../components/searchbar';
import SearchResultPanel from '../../containers/searchresultpanel';
import { Avatar, withStyles, Grid, Typography } from 'material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Path } from '../../components/util/Path';

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
        const { classes } = this.props;
        return (
            <div>
                <Grid container className={classes.container}>
                    <Grid item xs={8} sm={8} md={8} lg={6}>
                        <Path isMain />
                        <SearchResultPanel match={this.props.match} />
                    </Grid>
                </Grid>
            </div>
        );
    };
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Search);

