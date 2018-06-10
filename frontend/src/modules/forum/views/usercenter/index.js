import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Path } from '../../components/util/Path';
import { MainBody } from '../../components/util/MainBody';
import { Route } from 'react-router-dom';
import { withStyles, Grid } from 'material-ui';

const styles = {

};

class Usercenter extends Component {
    render() {
        const { match, classes } = this.props;
        var path = {};
        path['settings'] = { "name": `个人中心`, "link": `${match.url}` }
        console.log("path", path);
        return (
            <div>
                <MainBody>
                    <Path isMain path={path} />
                    <Grid container>
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                        </Grid>
                    </Grid>
                </MainBody>
            </div>
        );
    };
}

Usercenter.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Usercenter);

