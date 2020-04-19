import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <div className='nav component'>
        <div className='nav tag'>
            <span>Navigation Component</span>
        </div>
        <div className='nav content'>
            <div>
                <NavLink to='/' activeClassName='selected'>
                    S
                </NavLink>
            </div>
            <div>
                <NavLink to='/friends' activeClassName='selected'>
                    friends
                </NavLink>
            </div>
            <div>
                <NavLink to='/users' activeClassName='selected'>
                    find people
                </NavLink>{' '}
            </div>
            <div>
                <NavLink to='/chat' activeClassName='selected'>
                    chat
                </NavLink>{' '}
            </div>
            <div>
                <a href='/auth/logout'>log out</a>
            </div>
        </div>
    </div>
);

export default Navigation;
