import React, { useState } from 'react';
import { useDBdata } from './hooks/useDBdata';

function FindPeople() {
    const [query, setQuery] = useState('');
    const [{ data, error }, getData] = useDBdata('/profile/users/', {
        people: [],
    });

    const handleChange = (e) => {
        setQuery(e.target.value);
        getData(`/profile/users/${e.target.value}`);
    };

    return (
        <div>
            <h1>Find People</h1>
            <h3>Are you looking for someone in particular?</h3>
            <input onChange={handleChange} placeholder='Enter name' />
            {query === '' && <h3>Or checkout who just joined!</h3>}
            {data.err && <div className='error'>{data.err}</div>}
            {error && <div>Uh, err, something went wrong ...</div>}
            {data.people &&
                data.people.map((user) => {
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

export default FindPeople;
