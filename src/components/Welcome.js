// src/welcome.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import ResetPassword from './ResetPassword';

export default function Welcome() {
    return (
        <Router>
            <div className='welcome component'>
                <div className='tag'>
                    <span>Welcome Component</span>
                </div>
                <div className='headline'>Social Network</div>
                <Route exact path='/welcome' component={Registration} />
                <Route path='/login' component={Login} />
                <Route path='/reset' component={ResetPassword} />
            </div>
        </Router>
    );
}
