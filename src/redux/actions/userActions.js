// src/redux/actions/userActions.js
import axios from '../../net/axios';
import { GET_USER_BY_ID, GET_USERS_LATEST, GET_USERS_BY_NAME } from '../types';

export function getUserById(id) {
    return axios.get(`/people/user/${id}`).then(({ data }) => {
        console.log('getUser(id)', data);
        return {
            type: GET_USER_BY_ID,
            payload: data.user,
        };
    });
}

export function getUsersLatest() {
    return axios.get('/people/users').then(({ data }) => {
        console.log('getUsersLatest', data);
        return {
            type: GET_USERS_LATEST,
            payload: data.users,
        };
    });
}

export function getUsersByName(name) {
    return axios.get(`/people/users/${name}`).then(({ data }) => {
        console.log('getUsersByName', data);
        return {
            type: GET_USERS_BY_NAME,
            payload: data.users,
        };
    });
}
