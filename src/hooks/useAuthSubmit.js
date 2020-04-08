// src/hooks/useAuthSubmit.js
import React, { useState } from 'react';
import axios from '../net/axios';

export function useAuthSubmit(url, values) {
    const [error, setError] = useState('');

    const submit = async () => {
        const { data } = await axios.post(url, values);
        data.success
            ? location.replace('/')
            : setError({ error: data.err || 'Try again.' });
    };

    return [submit, error];
}
