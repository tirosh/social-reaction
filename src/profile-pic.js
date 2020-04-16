// profilepic.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from './redux/actions/uiActions';

const ProfilePic = () => {
    const user = useSelector((state) => state.user && state.user);
    const dispatch = useDispatch();

    return (
        <div className='user profile image small'>
            <img
                src={user.img_url || '/img/lego.svg'}
                alt={`${user.first} ${user.last}`}
                onClick={() => dispatch(toggleModal())}
            />
        </div>
    );
};

export default ProfilePic;
