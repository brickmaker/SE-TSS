import React, {Component} from 'react';
import {connect} from 'react-redux';
import Main from './views/main/index';
import {Route, Switch} from "react-router-dom"
import CollegesPage from "./views/colleges"
import Courses from "./views/courses"
import Course from './views/course'
import Teacher from './views/teacher'
import PostPage from './views/post'
import Messages from './views/messages';
import Search from './views/search';
import SearchBar from './components/searchbar';
// import SearchResultPanel from './containers/searchresultpanel';
import Announcements from './views/announcements';

const styles = {
    backgroundColor: '#f0f0ee',
    minHeight: '100vh', // todo: tmp solution for background color
    paddingLeft: 20,
    paddingRight: 20
}

class Forum extends Component {
    render() {
        const {match} = this.props;
        return (
            <div style={styles}>
                <Switch>
                    <Route exact path={`${match.url}`} component={Main}/>
                    <Route path={`${match.url}/messages`} component={Messages}/>
                    <Route path={`${match.url}/search/:searchType/:query/:pageNum`} component={Search}/>
                    <Route path={`${match.url}/p/:postid`} component={PostPage}/>
                    <Route path={`${match.url}/:collegeid/:courseid/:teacherid`} component={Teacher}/>
                    <Route path={`${match.url}/:collegeid/:courseid`} component={Course}/>
                    <Route path={`${match.url}/colleges`} component={CollegesPage}/>
                    <Route path={`${match.url}/:collegeid`} component={Courses}/>
                </Switch>
                {/* <Announcements type="notmain"/> */}
                {/* <Announcements type="main"/> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    null,
    null
)(Forum);
