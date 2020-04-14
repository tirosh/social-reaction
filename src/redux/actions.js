// scr/redux/actions.js
import axios from '../net/axios';
import { useDBget, useDBset } from '../hooks/useDB';

export function receiveFriendsWannabes() {
    // will make GET request to server to retrieve the list of friends and
    // wannabes
    //  - note: if you get back an empty array, that eiter means (1) the query
    //    is wrong, or (2) you have no friends or wannabes :(
    //  - should return an object with type property and a friendsWannabes
    //    property whose value is the array of friends and wannabes from the
    //    server
    return axios.get('/people/friends-wannabes').then(({ data }) => {
        console.log('data', data);
        return {
            type: 'RECEIVE_FRIENDS_WANNABES',
            friendsWannabes: data,
        };
    });
}

export function acceptFriendRequest(id) {
    // will make POST request to the server to accept the friendship. The
    // function should return an object with type property and the id of the
    // user whose friendship was accepted.
    return axios.post('/people/add-friend').then(({ data }) => {
        return {
            type: 'ACCEPT_FRIEND_REQUEST',
            someData: data,
        };
    });
}

export function unfriend(id) {
    // will make POST to the server to end the friendship. It should return an
    // object with type and the id of the user whose friendship was ended.
    return axios.get('/people/cancel-friend').then(({ data }) => {
        return {
            type: 'UNFRIEND',
            someData: data,
        };
    });
}
