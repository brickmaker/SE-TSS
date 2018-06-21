import axios from 'axios'
import {ROOT_URL} from "../../configs/config"
import {withAuthHeader} from "../../utils/api"

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
            .catch(err => {
                console.log(err)
            })
    }
};

function fetchSubscriptions(userId) {
    return fetch(`${ROOT_URL}/api/forum/subscriptions`,
        {
            headers: withAuthHeader()
        }
    )
        .then((response) => {
            if (!response.ok) {
                console.log(response)
            } else {
                return response.json()
            }
        })
}
