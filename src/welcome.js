// src/welcome.js
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Registration from './registration';
import Login from './login';
import ResetPassword from './reset-password';

export default function Welcome() {
    return (
        <BrowserRouter>
            <div className='welcome'>
                <div className='image'>
                    <img
                        src='/img/1280px-Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg'
                        alt='Louis Pasteur'
                    />
                </div>
                <div className='form'>
                    <div className='headline'>welcome to immunity</div>
                    <Route exact path='/welcome' component={Registration} />
                    <Route path='/login' component={Login} />
                    <Route path='/reset' component={ResetPassword} />
                </div>
                <img className='logo' src='/img/logo.png' alt='logo' />
            </div>
        </BrowserRouter>
    );
}
