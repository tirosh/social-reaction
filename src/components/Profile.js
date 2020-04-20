import React from 'react';
import { useSelector } from 'react-redux';
import BioEditor from './BioEditor';

export default function Profile({ updateProfile }) {
    const profile = useSelector((state) => state.profile && state.profile);

    return (
        <div className='profile component'>
            <div className='profile tag'>
                <span>Profile</span>
            </div>
            <div className='profile content'>
                <div>
                    <div className='profile image medium'>
                        <img
                            src={profile.img_url || '/img/lego.svg'}
                            alt={`${profile.first} ${profile.last}`}
                        />
                    </div>
                </div>
                <div>
                    <h3>
                        {profile.first} {profile.last}
                    </h3>
                    <BioEditor />
                </div>
            </div>
        </div>
    );
}
