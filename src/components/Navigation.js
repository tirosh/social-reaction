import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfilePic from './ProfilePic';

export default function Navigation() {
    const first = useSelector(
        (state) => state.profile.first && state.profile.first
    );

    return (
        <div className='nav component'>
            <div className='nav tag'>
                <span>Navigation</span>
            </div>
            <div className='nav content'>
                <div>
                    <NavLink to='/' activeClassName='selected'>
                        {first && first.charAt()}
                    </NavLink>
                </div>
                <div className='nav links'>
                    <NavLink to='/friends' activeClassName='selected'>
                        friends
                    </NavLink>
                    <NavLink to='/users' activeClassName='selected'>
                        find people
                    </NavLink>{' '}
                    <NavLink to='/chat' activeClassName='selected'>
                        chat
                    </NavLink>{' '}
                    <a href='/auth/logout'>log out</a>
                </div>
                <ProfilePic />
            </div>
        </div>
    );
}
