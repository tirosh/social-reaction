// src/reducers/uiReducer.js
import { INIT_UI, TOGGLE_MODAL } from '../types';

const initialState = { uploaderVisible: false };

export default function (state = initialState, action) {
    if (action.type === INIT_UI) {
        return state;
    }
    if (action.type === TOGGLE_MODAL) {
        return { ...state, uploaderVisible: !state.uploaderVisible };
    }
    return state;
}
