import React, { useState, useEffect } from 'react';
import axios from './net/axios';

export default function FindPeople() {
    const [error, setError] = useState('');
    const [latest, setLatest] = useState(true);
    const [search, setSearch] = useState('');
    const [people, setPeople] = useState([]);

    useEffect(() => {
        search === '' ? setLatest(true) : setLatest(false);
        let ignore;
        (async () => {
            const { data } = await axios.get(`/profile/users/${search}`);
            if (!ignore) {
                Array.isArray(data.people)
                    ? setPeople(data.people)
                    : setPeople([]);
            }
            data.err ? setError(data.err) : setError('');
        })();
        return () => {
            ignore = true;
        };
    }, [search]);

    const findPeople = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <h1>Find People</h1>
            <h3>Are you looking for someone in particular?</h3>
            <input onChange={findPeople} placeholder='Enter name' />
            {latest && <h3>Or checkout who just joined!</h3>}
            {error && <div className='error'>{error}</div>}
            {people.map((user) => {
                return (
                    <div key={user.id}>
                        <p>
                            {user.first} {user.last}
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
