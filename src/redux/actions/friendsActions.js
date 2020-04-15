// src/actions/friendsActions.js
import axios from '../../net/axios';
import {
    RECEIVE_FRIENDS_WANNABES,
    ACCEPT_FRIEND_REQUEST,
    UNFRIEND,
} from '../types';

export function receiveFriendsWannabes() {
    return axios.get('/people/friends-wannabes').then(({ data }) => {
        console.log('data', data);
        return {
            type: RECEIVE_FRIENDS_WANNABES,
            payload: data,
        };
    });
}

export function acceptFriendRequest(id) {
    return axios.post('/people/add-friend', { id }).then(({ data }) => {
        console.log('data in acceptFriendRequest', data);
        return {
            type: ACCEPT_FRIEND_REQUEST,
            id: data.friend.id,
        };
    });
}

export function unfriend(id) {
    return axios.post('/people/cancel-friend', { id }).then(({ data }) => {
        console.log(', data in unfriend', data);
        return {
            type: UNFRIEND,
            id: data.friend.id,
        };
    });
}
