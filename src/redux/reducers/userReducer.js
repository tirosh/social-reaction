// src/redux/reducers/userReducers.js
import { GET_USER_BY_ID, GET_USERS_LATEST, GET_USERS_BY_NAME } from '../types';

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
    return state;
}
