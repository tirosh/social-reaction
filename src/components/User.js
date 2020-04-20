import React from 'react';
import { Link } from 'react-router-dom';
import FriendButton from './FriendButton';

export default function User({ className, user, name, bio, button }) {
    return (
        <div className={className}>
            <div className='user tag'>
                <span>User</span>
            </div>
            <div className='user content'>
                <div>
                    <p>{name && `${user.first} ${user.last}`}</p>
                    <Link to={`/user/${user.id}`}>
                        <div className='image'>
                            <img
                                src={user.img_url || '/img/lego.svg'}
                                alt={`${user.first} ${user.last}`}
                            />
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
