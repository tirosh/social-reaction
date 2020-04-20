import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersLatest, getUsersByName } from '../redux/actions/userActions';
import User from './User';

export default function FindPeople() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const foundUsers = useSelector(
        (state) => state.users.foundUsers && state.users.foundUsers
    );

    useEffect(() => {
        dispatch(getUsersLatest());
    }, []);

    const handleChange = (e) => {
        setQuery(e.target.value);
        dispatch(getUsersByName(e.target.value));
    };

    return (
        <div className='find-people component'>
            <div className='find-people tag'>
                <span>FindPeople</span>
            </div>
            <div className='find-people content'>
                <h1>Find People</h1>
                <h3>Are you looking for someone in particular?</h3>
                <input onChange={handleChange} placeholder='Enter name' />
                {!query && <h3>Or checkout who just joined!</h3>}
                <div className='people'>
                    {foundUsers &&
                        foundUsers.map((person) => (
                            <User
                                user={person}
                                key={person.id}
                                className='user component medium'
                                button={'FriendButton'}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
