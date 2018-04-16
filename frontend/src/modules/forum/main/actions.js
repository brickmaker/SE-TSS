export const GET_SUBSCRIPTIONS = 'get_subscriptions';
export const GOT_SUBSCRIPTIONS = 'got_subscriptions';

export const getSubscriptions = (userId, token) => {
    return dispatch => {
        fetchSubscriptions(userId, token)
            .then((data) => {
                dispatch({
                    type: GOT_SUBSCRIPTIONS,
                    subscriptions: data
                })
            })
    }
};

function fetchSubscriptions(userId, token) {
    return fetch(`http://localhost:8000/api/forum/subscriptions?uid=${userId}&token=${token}`)
        .then((response) => (response.json()))
}
