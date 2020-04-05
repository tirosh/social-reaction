import React from 'react';
import axios from './net/axios';
import { Link } from 'react-router-dom';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async submit() {
        const { data } = await axios.post('/auth/login', {
            email: this.state.email,
            psswd: this.state.psswd
        });
        data.success
            ? this.setState(location.replace('/'))
            : this.setState({ error: data.err || 'Try again.' });
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className='error'>{this.state.error}</div>
                )}
                <input
                    name='email'
                    key='email'
                    onChange={e => this.handleChange(e)}
                    placeholder='email'
                />
                <input
                    name='psswd'
                    type='password'
                    key='psswd'
                    onChange={e => this.handleChange(e)}
                    placeholder='password'
                />
                <button onClick={() => this.submit()}>log in</button>
                <p>
                    or <Link to='/'>register</Link>
                </p>
                <p>
                    or <Link to='/reset'>reset password</Link>
                </p>
            </div>
        );
    }
}
