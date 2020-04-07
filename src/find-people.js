import React, { useState, useEffect } from 'react';
import axios from './net/axios';

export default function FindPeople() {
    const [search, setSearch] = useState('');
    const [people, setPeople] = useState([]);

    useEffect(() => {
        console.log('useEffect of country');
        console.log('people', people);
        let ignore;
        (async () => {
            const { data } = await axios.get(`/profile/users/${search}`);
            console.log('data', data);
            if (!ignore) {
                setPeople(data);
            }
        })();
        return () => {
            ignore = true;
            console.log('country clean up function');
        };
    }, [search]);

    const findPeople = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <p>please enter a name:</p>
            <input onChange={findPeople} placeholder='enter a name' />
            {[].map((user) => {
                return <div key={user.id}>{user.first}</div>;
            })}
        </div>
    );
}
