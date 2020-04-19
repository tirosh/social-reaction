import React from 'react';
import { Link } from 'react-router-dom';
import { useStatefulFields } from '../hooks/useStatefulFields';
import { useAuthSubmit } from '../hooks/useAuthSubmit';

export default function Registration() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit('/auth/register', values);

    return (
        <div className='registration component'>
            <div className='tag'>
                <span>Registration Component</span>
            </div>
            <div className='content'>
                {error && <div className='error'>{error}</div>}
                <label>
                    First:
                    <input name='first' onChange={handleChange} />
                </label>
                <label>
                    Last:
                    <input name='last' onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input name='email' type='email' onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input
                        name='psswd'
                        type='password'
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') submit();
                        }}
                    />
                </label>
                <button onClick={submit}>register</button>
                <p>
                    or <Link to='/login'>log in</Link>
                </p>
            </div>
        </div>
    );
}
