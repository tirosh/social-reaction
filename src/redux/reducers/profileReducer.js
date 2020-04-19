// src/redux/reducers/profileReducer.js
import { GET_PROFILE, UPLOAD_IMAGE, UPDATE_BIO } from '../types';

const initialState = {};

export default function (state = initialState, action) {
    if (action.type === GET_PROFILE) {
        return { ...state, ...action.payload };
    }
    if (action.type === UPLOAD_IMAGE) {
        return { ...state, ...action.payload };
    }
    if (action.type === UPDATE_BIO) {
        return { ...state, ...action.payload };
    }
    return state;
}
