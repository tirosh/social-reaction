import * as io from 'socket.io-client';
import { receiveLatestMessages } from './redux/actions/messageActions';
import { receivePublicMessage } from './redux/actions/messageActions';

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

        // socket.on(
        //     'receiveChatMessages',
        //     msgs => store.dispatch(
        //         chatMessages(msgs)
        //     )
        // );

        // socket.on(
        //     'chatMessage',
        //     msg => store.dispatch(
        //         chatMessage(msg)
        //     )
        // );
    }
};
