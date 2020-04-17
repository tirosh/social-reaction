// src/hooks/useAuthSubmit.js
import React, { useState } from 'react';
import axios from '../net/axios';

export function useAuthSubmit(url, values) {
    const [error, setError] = useState('');

    const submit = async () => {
        const { data } = await axios.post(url, values);
        return data.success
            ? location.replace('/')
            : setError(data.err || 'Try again.');
    };

    return [submit, error];
}
