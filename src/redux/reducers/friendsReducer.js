// src/reducers/friendsReducer.js
import {
    RECEIVE_FRIENDS_WANNABES,
    REQUEST_FRIEND,
    ACCEPT_FRIEND_REQUEST,
    UNFRIEND,
} from '../types';

const initialState = {};

export default function (state = initialState, action) {
    if (action.type === RECEIVE_FRIENDS_WANNABES) {
        console.log('action', action);
        return { ...state, friendsWannabes: action.payload };
    }
    if (action.type === REQUEST_FRIEND) {
        console.log('action', action);
        return { ...state, friendsWannabes: action.payload };
    }
    if (action.type === ACCEPT_FRIEND_REQUEST) {
        console.log('action', action);
        return { ...state, friendsWannabes: action.payload };
    }
    if (action.type === UNFRIEND) {
        console.log('action', action);
        return { ...state, friendsWannabes: action.payload };
    }
    return state;
}
