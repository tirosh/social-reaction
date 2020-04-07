const express = require('express');
const app = (exports = express());
const port = process.env.PORT || 8080;
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const { SESSION_SECRET: sessionSecret } = process.env.SESSION_SECRET
    ? process.env
    : require('./secrets.json');
const bodyParser = require('body-parser');
const {
    logRoute,
    makeCookiesSafe,
    logErrors,
    clientErrorHandler,
    errorHandler
} = require('./utils/middleware');
const compression = require('compression');
const auth = require('./routes/auth');
const profile = require('./routes/profile');

app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(
    cookieSession({
        secret: sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14 // ~ 1.2 billion milliseconds = 14 days
    })
);
app.use(csurf());
app.use((req, res, next) => {
    res.cookie('_ctkn', req.csrfToken());
    next();
});
app.use(compression());
app.use(logRoute);
app.use(makeCookiesSafe);
if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// if NOT LOGGED IN: serve index.html (stay where you are), else: redirect to /
app.get('/welcome', (req, res) => {
    !req.session.id
        ? res.sendFile(__dirname + '/index.html')
        : res.redirect('/');
});

app.use('/auth', auth);
app.use('/profile', profile);

// if LOGGED IN: serve index.html, else: redirect to /welcome
app.get('*', (req, res) => {
    req.session.id
        ? res.sendFile(__dirname + '/index.html')
        : res.redirect('/welcome');
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(port, function() {
    console.log(`I'm listening on port: ${port}`);
});
