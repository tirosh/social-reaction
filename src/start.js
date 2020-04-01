import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';

let elem = (
    <div>
        <img src='logo.png' alt='Logo' />
        <a href='/logout'>log out</a>
    </div>
);

if (location.pathname == '/welcome') {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector('main'));
