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
        console.log('user :', user);
        if (user && user.id === profile.id) props.history.push('/');
    }, [user]);

    return (
        <>
            <h2>OtherProfile</h2>
            {user && <User user={user} className='user component medium' />}
        </>
    );
}
