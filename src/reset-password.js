import React from 'react';
import axios from './net/axios';
import { Link } from 'react-router-dom';

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'start'
        };
    }
    getCurrentDisplay() {
        const step = this.state.step;
        if (step == 'start') {
            return (
                <>
                    <h1>Reset Password</h1>
                    <h2>
                        Please enter the email address with which you registered
                    </h2>
                    {this.state.error && (
                        <div className='error'>{this.state.error}</div>
                    )}
                    <input
                        name='email'
                        key='email'
                        onChange={e => this.handleChange(e)}
                        placeholder='email'
                    />
                    <button onClick={() => this.reset()}>reset password</button>
                    <p>
                        or <Link to='/login'>log in</Link>
                    </p>
                    <p>
                        or <Link to='/'>register</Link>
                    </p>
                </>
            );
        } else if (step == 'verify') {
            return (
                <>
                    <h1>Reset Password</h1>
                    <h2>
                        An email was sent to you. Please enter the secret here:
                    </h2>
                    {this.state.error && (
                        <div className='error'>{this.state.error}</div>
                    )}
                    <input
                        name='secret'
                        key='secret'
                        onChange={e => this.handleChange(e)}
                        placeholder='super secret code'
                    />
                    <h2>Enter your new password here:</h2>
                    <input
                        name='psswd'
                        key='psswd'
                        onChange={e => this.handleChange(e)}
                        placeholder='password'
                    />
                    <button onClick={() => this.verify()}>submit</button>
                    <p>
                        or <Link to='/login'>log in</Link>
                    </p>
                    <p>
                        or <Link to='/'>register</Link>
                    </p>
                </>
            );
        } else if (step == 'success') {
            return (
                <>
                    <h1>Reset Password</h1>
                    <h2>It is done.</h2>
                    <p>
                        Please <Link to='/login'>log in</Link> with your new
                        password.
                    </p>
                </>
            );
        }
    }
    async reset() {
        const { data } = await axios.post('/auth/password/reset', {
            email: this.state.email
        });
        data.success
            ? this.setState({ step: 'verify', error: null })
            : this.setState({ error: data.err || 'Try again.' });
    }
    async verify() {
        const { data } = await axios.post('/auth/password/reset/verify', {
            secret: this.state.secret,
            psswd: this.state.psswd
        });
        data.success
            ? this.setState({ step: 'success', error: null })
            : this.setState({ error: data.err || 'Try again.' });
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}
