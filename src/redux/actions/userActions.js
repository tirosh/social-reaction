import axios from '../../net/axios';
import { GET_USER, UPLOAD_IMAGE, UPDATE_BIO } from '../types';

export function getUser() {
    return axios.get('/profile/user').then(({ data }) => {
        // console.log('getUser', data);
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
        // console.log('uploadImage', data);
        return {
            type: UPLOAD_IMAGE,
            payload: data,
        };
    });
}

export function updateBio(bio) {
    return axios.post('/profile/upload/bio', { bio: bio }).then(({ data }) => {
        // console.log('updateBio', data);
        return {
            type: UPDATE_BIO,
            payload: data,
        };
    });
}
