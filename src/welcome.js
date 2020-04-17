// src/welcome.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './registration';
import Login from './login';
import ResetPassword from './reset-password';

export default function Welcome() {
    return (
        <Router>
            <div className='welcome'>
                <div className='form'>
                    <div className='headline'>Social Network</div>
                    <Route exact path='/welcome' component={Registration} />
                    <Route path='/login' component={Login} />
                    <Route path='/reset' component={ResetPassword} />
                </div>
            </div>
        </Router>
    );
}
