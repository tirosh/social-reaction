// src/reducers/messageReducer.js
import { RECEIVE_LATEST_MESSAGES, RECEIVE_PUBLIC_MESSAGE } from '../types';

const initialState = {};

export default function (state = initialState, action) {
    if (action.type === RECEIVE_LATEST_MESSAGES) {
        return { ...state, public: action.payload };
    }
    if (action.type === RECEIVE_PUBLIC_MESSAGE) {
        return { ...state, public: state.public.concat(action.payload) };
    }
    return state;
}
