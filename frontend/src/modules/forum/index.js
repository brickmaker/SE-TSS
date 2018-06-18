import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from './views/main/index';
import {Link, Route, Switch} from "react-router-dom"
import CollegesPage from "./views/colleges"
import Courses from "./views/courses"
import Course from './views/course'
import Teacher from './views/teacher'
import PostPage from './views/post'
import Messages from './views/messages';
import Search from './views/search';
import SearchBar from './components/searchbar';
import Announcements from './views/announcements';
import Management from './views/management';
import AnncEditor from './views/annceditor';
import Usercenter from './views/usercenter';
import Bar from "../../top/components/Bar"
import {Divider, ListItem, ListItemIcon, ListItemText} from "material-ui"
import {
    Home, Search as SearchIcon, Message as MessageIcon,
    Announcement as AnnouncementIcon,
    Extension as ExtensionIcon
} from "@material-ui/icons/es/index"

const styles = {
    backgroundColor: '#f0f0ee',
    minHeight: '100vh', // todo: tmp solution for background color
    paddingLeft: 20,
    paddingRight: 20
}

class Forum extends Component {

    render() {
        const {match} = this.props;
        const listItems = (
            <div>
                <ListItem component={Link} to={`${match.url}`} button>
                    <ListItemIcon>
                        <Home/>
                    </ListItemIcon>
                    <ListItemText primary="主页"/>
                </ListItem>
                <Divider/>
                <ListItem component={Link} to={`${match.url}/search`} button>
                    <ListItemIcon>
                        <SearchIcon/>
                    </ListItemIcon>
                    <ListItemText primary="搜索"/>
                </ListItem>
                <Divider/>
                <ListItem component={Link} to={`${match.url}/messages`} button>
                    <ListItemIcon>
                        <MessageIcon/>
                    </ListItemIcon>
                    <ListItemText primary="消息"/>
                </ListItem>
                <Divider/>
                <ListItem component={Link} to={`${match.url}/announcements/user/1`} button>
                    <ListItemIcon>
                        <AnnouncementIcon/>
                    </ListItemIcon>
                    <ListItemText primary="公告"/>
                </ListItem>
                <Divider/>
                <ListItem component={Link} to={`${match.url}/management`} button>
                    <ListItemIcon>
                        <ExtensionIcon/>
                    </ListItemIcon>
                    <ListItemText primary="管理"/>
                </ListItem>
                <Divider/>
                <ListItem component={Link} to={`${match.url}/usercenter/1`} button>
                    <ListItemIcon>
                        <ExtensionIcon/>
                    </ListItemIcon>
                    <ListItemText primary="主页"/>
                </ListItem>
            </div>
        );
        return (
            <Bar listItems={listItems}>
                <div style={styles}>
                    <Switch>
                        <Route exact path={`${match.url}`} component={Main}/>
                        <Route path={`${match.url}/messages`} component={Messages}/>
                        <Route path={`${match.url}/search/:searchType/:query/:pageNum`} component={Search}/>
                        <Route path={`${match.url}/search/`} component={Search}/>
                        <Route path={`${match.url}/announcements/user/:pageNum`} component={Announcements}/>
                        <Route path={`${match.url}/announcements/section/:collegeid/:courseid/:teacherid/:pageNum`}
                               component={Announcements}/>
                        <Route path={`${match.url}/annceditor/:collegeid/:courseid/:teacherid`} component={AnncEditor}/>
                        <Route path={`${match.url}/management`} component={Management}/>
                        <Route path={`${match.url}/usercenter/:uid`} component={Usercenter}/>
                        <Route path={`${match.url}/p/:postid`} component={PostPage}/>
                        <Route path={`${match.url}/:collegeid/:courseid/:teacherid`} component={Teacher}/>
                        <Route path={`${match.url}/:collegeid/:courseid`} component={Course}/>
                        <Route path={`${match.url}/colleges`} component={CollegesPage}/>
                        <Route path={`${match.url}/:collegeid`} component={Courses}/>
                    </Switch>
                </div>
            </Bar>
        );
    }
}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});


export default connect(
    null,
    null
)(Forum);
