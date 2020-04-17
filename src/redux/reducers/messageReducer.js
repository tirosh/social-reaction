// src/reducers/messageReducer.js
import { RECEIVE_LATEST_MESSAGES } from '../types';

const initialState = {};

export default function (state = initialState, action) {
    if (action.type === RECEIVE_LATEST_MESSAGES) {
        return { ...state, public: action.payload };
    }
    return state;
}
