import React, { useState, useEffect, useRef } from 'react';
import socket from './socket';
import { useSelector } from 'react-redux';

export default function Chat() {
    const elemRef = useRef();
    const chatMessages = useSelector((state) => state && state.chatMessages);

    useEffect(() => {
        console.log('elemRef', elemRef);
        console.log('scrollTop', elemRef.current.scrollTop);
        console.log('scrollHeight', elemRef.current.scrollHeight);
        console.log('clientHeight', elemRef.current.clientHeight);
    }, []);

    const keyCheck = (e) => {
        // console.log('value', e.target.value);
        // console.log('key pressed', e.key);
        if (e.key === 'Enter') {
            // console.log('e.target.value', e.target.value);
            e.preventDefault();
            socket.emit('new chat msg', e.target.value);
            e.target.value = '';
        }
    };

    return (
        <div className='chat'>
            <p>Welcome to Chat</p>
            <div className='messages' ref={elemRef}>
                <p>Chat Messages will go here.</p>
            </div>
            <textarea
                placeholder='Add your message here...'
                onKeyDown={keyCheck}></textarea>
        </div>
    );
}
