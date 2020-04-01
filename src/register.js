import React from 'react';
import axios from './net/axios';
import { Link } from 'react-router-dom';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post('/register', {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                psswd: this.state.psswd
            })
            .then(({ data }) => {
                console.log('data.success', data.success);
                if (data.success) {
                    location.replace('/');
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    handleChange({ target }) {
        //this[target.name] = target.value;
        this.setState({
            [target.name]: target.value
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <div className='error'>Ooops!</div>}
                <input
                    name='first'
                    onChange={e => this.handleChange(e)}
                    placeholder='first'
                />
                <input
                    name='last'
                    onChange={e => this.handleChange(e)}
                    placeholder='last'
                />
                <input
                    name='email'
                    onChange={e => this.handleChange(e)}
                    placeholder='email'
                />
                <input
                    name='psswd'
                    onChange={e => this.handleChange(e)}
                    placeholder='password'
                />
                <button onClick={() => this.submit()}>register</button>
                <p>
                    or <Link to='/login'>log in</Link>
                </p>
            </div>
        );
    }
}
