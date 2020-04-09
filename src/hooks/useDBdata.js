import React, { useState, useEffect } from 'react';
import axios from '../net/axios';

export const useDBdata = (initUrl, initData) => {
    const [data, setData] = useState(initData);
    const [url, setUrl] = useState(initUrl);
    const [error, setError] = useState(false);

    useEffect(() => {
        let unmounted = false;
        (async () => {
            setError(false);
            try {
                const db = await axios.get(url);
                if (!unmounted) setData(db.data);
            } catch (error) {
                if (!unmounted) setError(true);
            }
        })();
        return () => {
            unmounted = true;
        };
    }, [url]);

    return [{ data, error }, setUrl];
};
