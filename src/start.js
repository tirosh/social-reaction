import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Welcome from './welcome';
import App from './app';

let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);
if (location.pathname == '/welcome') elem = <Welcome />;

ReactDOM.render(elem, document.querySelector('main'));
