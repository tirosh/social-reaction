import React from 'react';
import { useSelector } from 'react-redux';
import BioEditor from './BioEditor';

export default function Profile({ updateProfile }) {
    const user = useSelector((state) => state.user && state.user);

    return (
        <div className='profile component'>
            <div className='tag'>
                <span>Profile Component</span>
            </div>
            <div className='content'>
                <h2>Profile</h2>
                <div className='user profile image medium'>
                    <img
                        src={user.img_url || '/img/lego.svg'}
                        alt={`${user.first} ${user.last}`}
                    />
                </div>
                <div>
                    <h3>
                        {user.first} {user.last}
                    </h3>
                    <BioEditor bio={user.bio} updateProfile={updateProfile} />
                </div>
            </div>
        </div>
    );
}
