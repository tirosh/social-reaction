// src/redux/reducers/userReducers.js
import {
    GET_USER_BY_ID,
    GET_USERS_LATEST,
    GET_USERS_BY_NAME,
    RECEIVE_ONLINE_USERS,
    RECEIVE_USER_JOINED,
    RECEIVE_USER_LEFT,
} from '../types';

const initialState = {};

export default function (state = initialState, action) {
    if (action.type === GET_USER_BY_ID) {
        return { ...state, currentUser: action.payload };
    }
    if (action.type === GET_USERS_LATEST) {
        return { ...state, foundUsers: action.payload };
    }
    if (action.type === GET_USERS_BY_NAME) {
        return { ...state, foundUsers: action.payload };
    }
    if (action.type === RECEIVE_ONLINE_USERS) {
        return { ...state, usersOnline: action.payload };
    }
    if (action.type === RECEIVE_USER_JOINED) {
        return {
            ...state,
            usersOnline: state.usersOnline.concat(action.payload),
        };
    }
    if (action.type === RECEIVE_USER_LEFT) {
        return { ...state, usersOnline: action.payload };
    }
    return state;
}

// {
//     todos: state.todos.concat({
//       id: action.id,
//       text: action.text,
//       completed: false
//     })
