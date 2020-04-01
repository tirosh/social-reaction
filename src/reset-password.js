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
                <div>
                    <h1>Reset Password</h1>
                    <h2>
                        Please enter the email address with which you registered
                    </h2>
                    {this.state.error && (
                        <div className='error'>{this.state.error}</div>
                    )}
                    <input
                        name='email'
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
                </div>
            );
        } else if (step == 'verify') {
            return (
                <div>
                    <h1>Reset Password</h1>
                    <h2>
                        An email was sent to you. Please enter the key here:
                    </h2>
                    {this.state.error && (
                        <div className='error'>{this.state.error}</div>
                    )}
                    <input
                        name='key'
                        onChange={e => this.handleChange(e)}
                        placeholder='super secret code'
                    />
                    <h2>Enter your new password here:</h2>
                    <input
                        name='psswd'
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
    reset() {
        axios
            .post('/reset/start', { email: this.state.email })
            .then(({ data }) => {
                if (data.success) {
                    this.setState({ step: 'verify' });
                } else {
                    this.setState({ error: data.err || 'Try again.' });
                }
            });
    }
    verify() {
        axios
            .post('/reset/verify', {
                key: this.state.key,
                psswd: this.state.psswd
            })
            .then(({ data }) => {
                console.log('hello?', data);
                if (data.success) {
                    console.log('data.success', data.success);
                    this.setState({ step: 'success' });
                } else if (data.err) {
                    this.setState({ error: data.err || 'Try again.' });
                }
            });
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
    }
    render() {
        return <div>{this.getCurrentDisplay()}</div>;
    }
}
