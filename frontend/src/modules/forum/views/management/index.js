import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid } from 'material-ui';
import { Flag, Send, Sort } from '@material-ui/icons';
import { SectionText, SectionTitle } from "../../components/util/SectionTitle"
import HotPostsPanel from '../../containers/hotpostspanel';
import UserStatusPanel from '../../containers/userstatuspanel';
import  ForumInfoPanel from '../../containers/foruminfopanel';

const styles = {
    container: {
        marginTop: 30,
        marginBottom: 30,
        // margin: 30,
    },
};

class Management extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid container justify="center">
                    <Grid item xs={12} sm={10} md={10} lg={3} className={classes.container}>
                        <SectionTitle>
                            <SectionText
                                text={'论坛数据'}
                            >
                                <Sort color={'primary'} style={{ fontSize: 40 }} />
                            </SectionText>
                        </SectionTitle>
                        <ForumInfoPanel />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={12} sm={10} md={10} lg={5} className={classes.container}>
                        <SectionTitle>
                            <SectionText
                                text={'用户发帖统计'}
                            >
                                <Send color={'primary'} style={{ fontSize: 40 }} />
                            </SectionText>
                        </SectionTitle>
                        <UserStatusPanel />
                    </Grid>
                    <Grid item xs={12} sm={10} md={10} lg={9} className={classes.container}>
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

