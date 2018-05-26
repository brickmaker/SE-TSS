import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid } from 'material-ui';
import { Flag, Send, Sort } from '@material-ui/icons';
import { SectionText, SectionTitle } from "../../components/util/SectionTitle"
import HotPostsPanel from '../../containers/hotpostspanel';
import UserStatusPanel from '../../containers/userstatuspanel';
import ForumInfoPanel from '../../containers/foruminfopanel';
import { MainBody } from '../../components/util/MainBody';
import { Path } from '../../components/util/Path';

const styles = {
    container: {
        // marginTop: 30,
        marginBottom: 30,
    },
};

class Management extends Component {
    render() {
        const { classes } = this.props;
        const path = {'management': {'name': "管理", 'link':'/forum/management'}};
        return (
            <div>
                <MainBody>
                    <Path isMain path={path}/>
                    <Grid container justify="center">
                        <Grid item xs={12} sm={12} md={12} lg={3} className={classes.container}>
                            <SectionTitle>
                                <SectionText
                                    text={'论坛数据'}
                                >
                                    <Sort color={'primary'} style={{ fontSize: 40 }} />
                                </SectionText>
                            </SectionTitle>
                            <ForumInfoPanel />
                        </Grid>
                        <Grid item xs={12} lg={1} />
                        <Grid item xs={12} sm={12} md={12} lg={8} className={classes.container}>
                            <SectionTitle>
                                <SectionText
                                    text={'用户发帖统计'}
                                >
                                    <Send color={'primary'} style={{ fontSize: 40 }} />
                                </SectionText>
                            </SectionTitle>
                            <UserStatusPanel />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.container}>
                            <SectionTitle>
                                <SectionText
                                    text={'热门帖子统计'}
                                >
                                    <Flag color={'primary'} style={{ fontSize: 40 }} />
                                </SectionText>
                            </SectionTitle>
                            <HotPostsPanel />
                        </Grid>
                    </Grid>
                </MainBody>
            </div>
        );
    };
}


Management.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Management);

