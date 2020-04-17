import { RECEIVE_LATEST_MESSAGES } from '../types';

export function receiveLatestMessages(messages) {
    return {
        type: RECEIVE_LATEST_MESSAGES,
        payload: messages,
    };
}
