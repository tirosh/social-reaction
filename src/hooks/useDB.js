import React, { useState, useEffect } from 'react';
import axios from '../net/axios';

export const useDBset = (
    initReq = { url: '/bounce', values: {} },
    initData = {}
) => {
    const [data, setData] = useState(initData);
    const [req, setReq] = useState(initReq);
    const [error, setError] = useState(false);

    useEffect(() => {
        let skip = false;
        (async () => {
            setError(false);
            try {
                const db = await axios.post(req.url, req.values);
                if (!skip) setData(db.data);
            } catch (error) {
                if (!skip) setError(true);
            }
        })();
        return () => {
            skip = true;
        };
    }, [req]);
    return [{ data, error }, setReq];
};

export const useDBget = (initUrl = '/', initData = {}) => {
    const [data, setData] = useState(initData);
    const [url, setUrl] = useState(initUrl);
    const [error, setError] = useState(false);

    useEffect(() => {
        let skip = false;
        (async () => {
            setError(false);
            try {
                const db = await axios.get(url);
                if (!skip) setData(db.data);
            } catch (error) {
                if (!skip) setError(true);
            }
        })();
        return () => {
            skip = true;
        };
    }, [url]);
    return [{ data, error }, setUrl];
};
