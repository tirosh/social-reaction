import { INIT_UI, TOGGLE_MODAL } from '../types';

export function initUI() {
    return {
        type: INIT_UI,
    };
}

export function toggleModal() {
    return {
        type: TOGGLE_MODAL,
    };
}
