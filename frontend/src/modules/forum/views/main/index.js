import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSubscriptions } from "./actions";
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Announcements from '../announcements';
import { MainBody } from "../../components/util/MainBody"
import { Path } from "../../components/util/Path"
import { Grid } from "material-ui"
import Subscription from "./components/Subscription"
import MoreForums from "./components/MoreForums"
import { SectionText, SectionTitle } from "../../components/util/SectionTitle"
import { Announcement as AnnouncementIcon } from '@material-ui/icons'
import { Message } from "@material-ui/icons/es/index"
import NewMsgPanel from '../../containers/newmsgpanel';

class Main extends Component {

    componentDidMount() {
        this.props.getSubscriptions("uid");
    }

    render() {
        const { match, subscriptions } = this.props;
        return (
            <div>
                <MainBody>
                    <Path isMain />
                    <Grid container xs={12}>
                        <Grid container xs={8}>
                            {
                                subscriptions.map((sub) => (
                                    <Subscription
                                        name={sub.area.name}
                                        path={sub.area.path}
                                        posts={sub.newPosts}
                                    />
                                ))
                            }
                            <MoreForums />
                        </Grid>
                        <Grid container xs={1}></Grid>
                        <Grid container xs={3}>
                            <Grid item xs={12}>
                                <div>
                                    <SectionTitle>
                                        <SectionText
                                            onClick={() => {
                                                // history.push('forum/annoucements')
                                            }}
                                            text={'公告通知'}
                                        >
                                            <AnnouncementIcon color={'primary'} style={{ fontSize: 40 }} />
                                        </SectionText>
                                    </SectionTitle>
                                    <Announcements type="main" match={{'params': {"pageNum":1}}} />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <SectionTitle>
                                        <SectionText
                                            onClick={() => {
                                                // history.push('forum/colleges')
                                            }}
                                            text={'消息留言'}
                                        >
                                            <Message color={'primary'} style={{ fontSize: 40 }} />
                                        </SectionText>
                                    </SectionTitle>
                                    <NewMsgPanel />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainBody>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    subscriptions: state.forum.main.subscriptions
});

const mapDispatchToProps = (dispatch) => {
    return {
        getSubscriptions: (uid, token) => {
            dispatch(getSubscriptions(uid, token));
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
