// src/hooks/useStatefulFields.js
import React, { useState } from 'react';

export function useStatefulFields(initValues = {}) {
    const [values, setValues] = useState(initValues);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return [values, handleChange];
}
