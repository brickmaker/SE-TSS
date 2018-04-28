import {ROOT_URL} from "../../configs/config"

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
    return fetch(`${ROOT_URL}/api/forum/subscriptions?uid=${userId}&token=${token}`)
        .then((response) => (response.json()))
}
