import * as io from 'socket.io-client';
import {
    receiveLatestMessages,
    receivePublicMessage,
} from './redux/actions/messageActions';
import {
    receiveOnlineUsers,
    receiveUserJoined,
    receiveUserLeft,
} from './redux/actions/userActions';

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on('latestMessages', (latestMessages) => {
            console.log('latestMessages', latestMessages);
            store.dispatch(receiveLatestMessages(latestMessages));
        });

        socket.on('publicMessage', (publicMessage) => {
            console.log('publicMessage', publicMessage);
            store.dispatch(receivePublicMessage(publicMessage));
        });

        socket.on('onlineUsers', (onlineUsers) => {
            console.log('onlineUsers', onlineUsers);
            store.dispatch(receiveOnlineUsers(onlineUsers));
        });

        socket.on('userJoined', (userJoined) => {
            console.log('userJoined', userJoined);
            store.dispatch(receiveUserJoined(userJoined));
        });

        socket.on('userLeft', (users) => {
            console.log('userLeft', users);
            store.dispatch(receiveUserLeft(users));
        });
    }
};
