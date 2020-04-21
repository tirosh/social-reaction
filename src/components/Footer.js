import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import User from './User';

export default function Footer() {
    const usersOnline = useSelector(
        (state) => state.users.usersOnline && state.users.usersOnline
    );
    return (
        <div className='footer component'>
            <div className='tag'>
                <span>Footer</span>
            </div>
            {usersOnline && <h3>People online</h3>}
            <div className='content'>
                {usersOnline &&
                    usersOnline.map((person) => (
                        <User
                            user={person}
                            key={person.id}
                            className='user component small'
                        />
                    ))}
            </div>
        </div>
    );
}
