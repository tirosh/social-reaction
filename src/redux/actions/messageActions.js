import { RECEIVE_LATEST_MESSAGES, RECEIVE_PUBLIC_MESSAGE } from '../types';

export function receiveLatestMessages(messages) {
    return {
        type: RECEIVE_LATEST_MESSAGES,
        payload: messages,
    };
}

export function receivePublicMessage(message) {
    return {
        type: RECEIVE_PUBLIC_MESSAGE,
        payload: message,
    };
}
