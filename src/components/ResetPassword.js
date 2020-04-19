import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../net/axios';
import { useStatefulFields } from '../hooks/useStatefulFields';

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

    return (
        <div className='reset component'>
            <div className='tag'>
                <span>Login Component</span>
            </div>
            <div className='content'>
                {step == 'start' ? (
                    <>
                        <h1>Reset Password</h1>
                        {error && <div className='error'>{error}</div>}
                        <h3>
                            Please enter the email address with which you
                            registered
                        </h3>
                        <label>
                            Email:
                            <input
                                name='email'
                                type='email'
                                onChange={handleChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') submit();
                                }}
                            />
                        </label>
                        <button onClick={reset}>reset password</button>
                        <p>
                            or <Link to='/login'>log in</Link>
                        </p>
                        <p>
                            or <Link to='/welcome'>register</Link>
                        </p>
                    </>
                ) : step == 'verify' ? (
                    <>
                        <h1>Reset Password</h1>
                        {error && <div className='error'>{error}</div>}
                        <h3>An email was sent to you. Please enter:</h3>
                        <label>
                            Super secret:
                            <input
                                name='secret'
                                key='secret'
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            New password:
                            <input
                                name='psswd'
                                type='password'
                                onChange={handleChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') submit();
                                }}
                            />
                        </label>
                        <button onClick={verify}>submit</button>
                        <p>
                            or <Link to='/login'>log in</Link>
                        </p>
                        <p>
                            or <Link to='/welcome'>register</Link>
                        </p>
                    </>
                ) : step == 'success' ? (
                    <>
                        <h1>Reset Password</h1>
                        <h2>It is done.</h2>
                        <p>
                            Please <Link to='/login'>log in</Link> with your new
                            password.
                        </p>
                    </>
                ) : (
                    'Uhh, err, something went wrong.'
                )}
            </div>
        </div>
    );
}
