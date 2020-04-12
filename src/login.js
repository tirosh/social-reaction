import React from 'react';
import { Link } from 'react-router-dom';
import { useStatefulFields } from './hooks/useStatefulFields';
import { useAuthSubmit } from './hooks/useAuthSubmit';

export default function Login() {
    const [values, handleChange] = useStatefulFields();
    const [submit, error] = useAuthSubmit('/auth/login', values);

    return (
        <div>
            {error && <div className='error'>{error}</div>}
            <label>
                Email:
                <input name='email' type='email' onChange={handleChange} />
            </label>
            <label>
                Password:
                <input name='psswd' type='password' onChange={handleChange} />
            </label>
            <button onClick={submit}>log in</button>
            <p>
                or <Link to='/welcome'>register</Link>
            </p>
            <p>
                or <Link to='/reset'>reset password</Link>
            </p>
        </div>
    );
}
