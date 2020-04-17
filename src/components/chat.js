import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { socket } from '../socket';

export default function Chat() {
    const elemRef = useRef();
    const messages = useSelector((state) => state.messages && state.messages);

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [messages]);

    const keyCheck = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            socket.emit('newChatMsg', e.target.value);
            e.target.value = '';
        }
    };

    return (
        <div className='chat'>
            <h1>Welcome to Chat</h1>
            <div className='messages' ref={elemRef}>
                {messages.public &&
                    messages.public.map((message) => (
                        <div key={message.id} className='message-container'>
                            <div className='user-image'>
                                <Link to={`/user/${message.sender_id}`}>
                                    <img src={message.img_url} />
                                </Link>
                            </div>
                            <div className='message'>
                                <span className='name'>
                                    {message.first} {message.last}
                                </span>
                                <span className='date'>
                                    {message.created_at}
                                </span>
                                <p>{message.msg}</p>
                            </div>
                            {/* <div className='buttons'>
                                <button
                                    onClick={() =>
                                        dispatch(props.handleClick(person.id))
                                    }>
                                    {person.accepted
                                        ? 'End Friendship'
                                        : 'Accept Friend Request'}
                                </button>
                            </div> */}
                        </div>
                    ))}
                {!messages.public && (
                    <div className='no-messages'>
                        Apparently there is no important message at the moment.
                    </div>
                )}
            </div>
            <textarea
                placeholder='Add your message here...'
                onKeyDown={keyCheck}></textarea>
        </div>
    );
}
