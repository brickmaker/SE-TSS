import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSubscriptions} from "./actions";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import Announcements from '../announcements';
import {MainBody} from "../../components/util/MainBody"
import {Path} from "../../components/util/Path"
import {Grid} from "material-ui"
import Subscription from "./components/Subscription"
import MoreForums from "./components/MoreForums"
import {SectionText, SectionTitle} from "../../components/util/SectionTitle"
import {Announcement as AnnouncementIcon} from '@material-ui/icons'
import {Message} from "@material-ui/icons/es/index"
import NewMsgPanel from '../../containers/newmsgpanel';
import SearchBar from '../../components/searchbar';

class Main extends Component {

    componentDidMount() {
        this.props.getSubscriptions("1"); // todo: get uid
    }

    render() {
        const {match, subscriptions} = this.props;
        return (
            <div>
                <MainBody>
                    <Path isMain/>
                    <Grid container alignItems={'flex-start'}>
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
                            <MoreForums/>
                        </Grid>
                        <Grid container xs={1}></Grid>
                        <Grid container xs={3}>
                            <Grid item xs={12}>
                                <div style={{padding: '0 20px'}}>
                                    <div
                                        onClick={() => {
                                            this.props.history.push('/forum/announcements/user/1')
                                        }}
                                    >
                                        <SectionTitle>
                                            <SectionText
                                                onClick={() => {
                                                    // event.preventDefault();
                                                    console.log('main click', this.props.history);
                                                    this.props.history.push('/forum/announcements/user/1')
                                                }}
                                                text={'公告通知'}
                                            >
                                                <AnnouncementIcon color={'primary'} style={{fontSize: 40}}/>
                                            </SectionText>
                                        </SectionTitle>
                                    </div>
                                    <Announcements type="main" match={{'params': {"pageNum": 1}}}/>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{padding: '0 20px'}}>
                                    <div
                                        onClick={() => {
                                            this.props.history.push('/forum/messages')
                                        }}
                                    >
                                        <SectionTitle>
                                            <SectionText
                                                onClick={() => {
                                                    this.props.history.push('/forum/messages')
                                                }}
                                                text={'消息留言'}
                                            >
                                                <Message color={'primary'} style={{fontSize: 40}}/>
                                            </SectionText>
                                        </SectionTitle>
                                    </div>
                                    <NewMsgPanel history={this.props.history}/>
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
        getSubscriptions: (uid) => {
            dispatch(getSubscriptions(uid));
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
