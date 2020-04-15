// src/reducers/friendsReducer.js
import {
    RECEIVE_FRIENDS_WANNABES,
    ACCEPT_FRIEND_REQUEST,
    UNFRIEND,
} from '../types';

const initialState = {};

export default function (state = initialState, action) {
    if (action.type === RECEIVE_FRIENDS_WANNABES) {
        return { ...state, friendsWannabes: action.payload };
    }
    if (action.type === ACCEPT_FRIEND_REQUEST) {
        console.log('action', action);
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.map((friend) =>
                friend.id === action.id ? { ...friend, accepted: true } : friend
            ),
        };
    }
    if (action.type === UNFRIEND) {
        console.log('action', action);
        return {
            ...state,
            friendsWannabes: state.friendsWannabes.filter(
                (friend) => friend.id !== action.id
            ),
        };
    }
    return state;
}
