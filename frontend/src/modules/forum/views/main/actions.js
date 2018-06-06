import {ROOT_URL} from "../../configs/config"

export const GET_SUBSCRIPTIONS = 'get_subscriptions';
export const GOT_SUBSCRIPTIONS = 'got_subscriptions';

export const getSubscriptions = (userId) => {
    return dispatch => {
        fetchSubscriptions(userId)
            .then((data) => {
                dispatch({
                    type: GOT_SUBSCRIPTIONS,
                    subscriptions: data
                })
            })
    }
};

function fetchSubscriptions(userId) {
    return fetch(`${ROOT_URL}/api/forum/subscriptions?uid=${userId}`)
        .then((response) => (response.json()))
}
