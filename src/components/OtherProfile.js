import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../redux/actions/userActions';
import User from './User';

export default function OtherProfile(props) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile && state.profile);
    const user = useSelector(
        (state) => state.users.currentUser && state.users.currentUser
    );

    useEffect(() => {
        dispatch(getUserById(props.match.params.id));
    }, []);

    useEffect(() => {
        if (user && profile) {
            if (user.id === profile.id) props.history.push('/');
        }
    }, [user, profile]);

    return (
        <div className='other-profile component'>
            <div className='other-profile tag'>
                <span>OtherProfile</span>
            </div>
            <div className='other-profile content'>
                <h2>Other Profile</h2>
                {user && (
                    <User
                        user={user}
                        className='user component large'
                        bio={true}
                        button={'FriendButton'}
                    />
                )}
            </div>
        </div>
    );
}
