import React from 'react';
import { Link } from 'react-router-dom';
import FriendButton from './FriendButton';

export default function User(props) {
    return (
        <div className={props.className}>
            <div className='user tag'>
                <span>User</span>
            </div>
            <div className='user content'>
                <p>
                    {props.user.first} {props.user.last}
                </p>
                <Link to={`/user/${props.user.id}`}>
                    <div className='image'>
                        <img src={props.user.img_url} />
                    </div>
                </Link>
                <FriendButton user={props.user} />
            </div>
        </div>
    );
}
