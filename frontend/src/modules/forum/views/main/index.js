import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSubscriptions} from "./actions";
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';

class Main extends Component {

    componentDidMount() {
        console.log('get subs');
        this.props.getSubscriptions("uid", "token");
    }

    render() {
        const {match, subscriptions} = this.props;
        return (
            <div>
                {
                    subscriptions.map((subscription) => {
                        return (
                            <div>
                                <p>{subscription.area.name}</p>
                                <ul>{
                                    subscription.newPosts.map((post) => (
                                        <li>{post.title}</li>
                                    ))
                                }</ul>
                            </div>
                        )
                    })
                }
                <div>
                    <Link to={`${match.url}/colleges`}>
                        more
                    </Link>
                </div>
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
