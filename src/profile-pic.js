// profilepic.js
import React from 'react';

const ProfilePic = ({ first, last, imgUrl, onClick }) => (
    <div className='user profile image small'>
        <img
            src={imgUrl || '/img/lego.svg'}
            alt={`${first} ${last}`}
            onClick={onClick}
        />
    </div>
);

export default ProfilePic;
