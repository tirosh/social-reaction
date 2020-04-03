import React from 'react';
import BioEditor from './bio-editor';

export default function Profile({ first, last, imgUrl, bio, updateProfile }) {
    console.log('bio in Profile:', bio);
    return (
        <>
            <h2>Profile function component</h2>
            <div className='user profile image medium'>
                <img src={imgUrl || '/img/lego.svg'} alt={first} />
            </div>
            <div>
                <h3>
                    {first} {last}
                </h3>
                <BioEditor bio={bio} updateProfile={updateProfile} />
            </div>
        </>
    );
}
