import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersLatest, getUsersByName } from '../redux/actions/userActions';

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
        <div>
            <h1>Find People</h1>
            <h3>Are you looking for someone in particular?</h3>
            <input onChange={handleChange} placeholder='Enter name' />
            {!query && <h3>Or checkout who just joined!</h3>}
            {/* {data.err && <div className='error'>{data.err}</div>} */}
            {/* {error && (
                <div className='error'>Uh, err, something went wrong ...</div>
            )} */}
            {foundUsers &&
                foundUsers.map((user) => {
                    return (
                        <div key={user.id}>
                            <p>
                                <Link to={`/user/${user.id}`}>
                                    {user.first} {user.last}
                                </Link>
                            </p>
                            <div className='user profile image medium'>
                                <img
                                    src={user.img_url || '/img/lego.svg'}
                                    alt={`${user.first} ${user.last}`}
                                />
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
