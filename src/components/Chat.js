import React, { useEffect, useRef } from 'react';
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
            socket.emit('newPublicMessage', e.target.value);
            e.target.value = '';
        }
    };

    return (
        <div className='chat'>
            <h1>Welcome to Chat</h1>
            <div className='messages' ref={elemRef}>
                {messages.public &&
                    messages.public.map((message) => (
                        <div key={message.msg_id} className='message-container'>
                            <div className='user-image'>
                                <Link to={`/user/${message.sender_id}`}>
                                    <img src={message.img_url} />
                                </Link>
                            </div>
                            <div className='message'>
                                <p className='name'>
                                    <Link to={`/user/${message.sender_id}`}>
                                        {message.first} {message.last}
                                    </Link>
                                </p>
                                <p>{message.msg}</p>
                                <p className='date'>
                                    {formatDate(message.created_at)}
                                </p>
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

function formatDate(ISOstring) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        day: 'numeric',
        hour: 'numeric',
        dayPeriod: 'short',
        minute: 'numeric',
        hour12: false,
    }).format(new Date(ISOstring));
}
