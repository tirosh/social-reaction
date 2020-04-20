import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { socket } from '../socket';
import { formatDate } from '../helpers';
import User from './User';

export default function ChatGroup() {
    const elemRef = useRef();
    const messages = useSelector((state) => state.messages && state.messages);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [messages]);

    const keyCheck = (e) => {
        if (e.key === 'Enter') {
            console.log('e.target.value :', e.target.value);
            e.preventDefault();
            socket.emit('newPublicMessage', e.target.value);
            e.target.value = '';
        }
    };

    return (
        <div className='chat-group component'>
            <div className='chat-group tag'>
                <span>ChatGroup</span>
            </div>
            <div className='chat-group content'>
                <h1>Group Chat</h1>
                <div className='messages-container' ref={elemRef}>
                    {messages.public ? (
                        messages.public.map((msg) => (
                            <MessageContainer msg={msg} key={msg.id} />
                        ))
                    ) : (
                        <div className='no-messages'>
                            Apparently there is no important message at the
                            moment.
                        </div>
                    )}
                </div>
                <textarea
                    placeholder='Add your message here...'
                    onKeyDown={keyCheck}></textarea>
            </div>
        </div>
    );
}

function MessageContainer({ msg }) {
    return (
        <div className='message-container component'>
            <div className='message-container tag'>
                <span>MessageContainer</span>
            </div>
            <div className='message-container content'>
                <User
                    user={msg.sender}
                    key={msg.sender.id}
                    className='user component small'
                />
                <Message msg={msg} />
            </div>
        </div>
    );
}

function Message({ msg }) {
    return (
        <div className='message component'>
            <div className='message tag'>
                <span>Message</span>
            </div>
            <div className='message content'>
                <div>
                    <span className='message sender'>
                        {msg.sender.first} {msg.sender.last}
                    </span>
                    <span className='date'>{formatDate(msg.created_at)}</span>
                </div>
                <p>{msg.msg}</p>
            </div>
        </div>
    );
}
