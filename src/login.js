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

            <form
                onSubmit={(e) => {
                    e.preventDefault;
                    submit;
                }}>
                <label>
                    Email:
                    <input name='email' type='email' onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input
                        name='psswd'
                        type='password'
                        onChange={handleChange}
                    />
                </label>
                <button onClick={submit}>log in</button>
            </form>
            <p>
                or <Link to='/welcome'>register</Link>
            </p>
            <p>
                or <Link to='/reset'>reset password</Link>
            </p>
        </div>
    );
}
