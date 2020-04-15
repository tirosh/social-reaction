import axios from '../../net/axios';
import { GET_USER } from '../types';

export function getUser() {
    return axios.get('/profile/user').then(({ data }) => {
        // console.log('data', data);
        return {
            type: GET_USER,
            payload: data,
        };
    });
}
