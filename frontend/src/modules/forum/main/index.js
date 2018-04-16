import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSubscriptions} from "./actions";

class Main extends Component {

    componentDidMount() {
        console.log('get subs');
        this.props.getSubscriptions("uid", "token");
    }

    render() {
        const {subscriptions} = this.props;
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
