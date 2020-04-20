import React from 'react';
import { Link } from 'react-router-dom';
import FriendButton from './FriendButton';

export default function User({ className, user, bio, button }) {
    return (
        <div className={className}>
            <div className='user tag'>
                <span>User</span>
            </div>
            <div className='user content'>
                <div>
                    <p>
                        {user.first} {user.last}
                    </p>
                    <Link to={`/user/${user.id}`}>
                        <div className='image'>
                            <img src={user.img_url} />
                        </div>
                    </Link>
                </div>
                <div>
                    {bio && <p className='bio'>{user.bio}</p>}
                    {button === 'FriendButton' && <FriendButton user={user} />}
                </div>
            </div>
        </div>
    );
}
