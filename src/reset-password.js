import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './net/axios';
import { useStatefulFields } from './hooks/useStatefulFields';

export default function ResetPassword() {
    const [step, setStep] = useState('start');
    const [error, setError] = useState('');
    const [values, handleChange] = useStatefulFields();

    const reset = async () => {
        const { data } = await axios.post('/auth/password/reset', values);
        setError('');
        data.success ? setStep('verify') : setError(data.err || 'Try again.');
    };

    const verify = async () => {
        const { data } = await axios.post(
            '/auth/password/reset/verify',
            values
        );
        setError('');
        data.success ? setStep('success') : setError(data.err || 'Try again.');
    };

    if (step == 'start') {
        return (
            <div>
                <h1>Reset Password</h1>
                <h3>
                    Please enter the email address with which you registered
                </h3>
                {error && <div className='error'>{error}</div>}
                <label>
                    Email:
                    <input name='email' type='email' onChange={handleChange} />
                </label>
                <button onClick={reset}>reset password</button>
                <p>
                    or <Link to='/login'>log in</Link>
                </p>
                <p>
                    or <Link to='/welcome'>register</Link>
                </p>
            </div>
        );
    } else if (step == 'verify') {
        return (
            <div>
                <h1>Reset Password</h1>
                <h3>An email was sent to you. Please enter:</h3>
                {error && <div className='error'>{error}</div>}
                <label>
                    Super secret:
                    <input name='secret' key='secret' onChange={handleChange} />
                </label>
                <label>
                    New password:
                    <input name='psswd' type='psswd' onChange={handleChange} />
                </label>
                <button onClick={verify}>submit</button>
                <p>
                    or <Link to='/login'>log in</Link>
                </p>
                <p>
                    or <Link to='/welcome'>register</Link>
                </p>
            </div>
        );
    } else if (step == 'success') {
        return (
            <div>
                <h1>Reset Password</h1>
                <h2>It is done.</h2>
                <p>
                    Please <Link to='/login'>log in</Link> with your new
                    password.
                </p>
            </div>
        );
    }
}
