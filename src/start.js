import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reducer from './redux/reducer.js';

import Welcome from './welcome';
import App from './app';

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem = (
    <Provider store={store}>
        <App />
    </Provider>
);
if (location.pathname == '/welcome') elem = <Welcome />;

ReactDOM.render(elem, document.querySelector('main'));
