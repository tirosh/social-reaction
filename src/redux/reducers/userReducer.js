// src/reducers/userReducer.js
import { GET_USER } from '../types';

const initialState = {};

export default function (state = initialState, action) {
    if (action.type === GET_USER) {
        return { ...state, ...action.payload };
    }
    return state;
}
