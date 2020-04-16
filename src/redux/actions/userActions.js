import axios from '../../net/axios';
import { GET_USER, UPLOAD_IMAGE } from '../types';

export function getUser() {
    return axios.get('/profile/user').then(({ data }) => {
        // console.log('data', data);
        return {
            type: GET_USER,
            payload: data,
        };
    });
}

export function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('/profile/upload/image', formData).then(({ data }) => {
        console.log('data', data);
        return {
            type: UPLOAD_IMAGE,
            payload: data,
        };
    });
}
