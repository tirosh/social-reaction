const express = require('express');
const app = (module.exports = express());
const port = process.env.PORT || 8080;

const db = require('./utils/db.js');
const ses = require('./utils/ses');
const cryptoRandomString = require('crypto-random-string');

app.use(express.static('./public'));

const { SESSION_SECRET: sessionSecret } = process.env.SESSION_SECRET
    ? process.env
    : require('./secrets.json');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cookieSession = require('cookie-session');
app.use(
    cookieSession({
        secret: sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14 // ~ 1.2 billion milliseconds = 14 days
    })
);

const csurf = require('csurf');
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie('_ctkn', req.csrfToken());
    next();
});

const compression = require('compression');
app.use(compression());

const { logRoute, makeCookiesSafe } = require('./utils/middleware.js');
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
    if (!req.session.id) {
        res.sendFile(__dirname + '/index.html');
    } else {
        res.redirect('/');
    }
});

// POST /register
app.post('/register', (req, res) => {
    const { first, last, email, psswd } = req.body;
    db.registerUser(first, last, email, psswd)
        .then(dbData => dbData.rows[0].id)
        .then(id => {
            Object.assign(req.session, { id, first, last, email });
            res.sendFile(__dirname + '/index.html');
            res.json({ success: true });
        })
        .catch(err => {
            console.log('error in POST /register:', err);
            err.constraint === 'users_email_key'
                ? res.json({ err: 'already registered' })
                : res.json({ err: 'try again' });
        });
});

// POST /login
app.post('/login', (req, res) => {
    const { email, psswd } = req.body;
    db.login(email, psswd)
        .then(dbData =>
            dbData === undefined
                ? Promise.reject(`User not found`)
                : dbData.rows[0]
        )
        .then(user => {
            Object.assign(req.session, user);
            res.sendFile(__dirname + '/index.html');
            res.json({ success: true });
        })
        .catch(err => {
            console.log('error in POST /login:', err);
            res.json({ err: err });
        });
});

// POST /user
app.post('/user', (req, res) => {
    db.getUser(req.session.email)
        .then(dbData =>
            dbData === undefined
                ? Promise.reject(`User not found`)
                : dbData.rows[0]
        )
        .then(user => {
            Object.assign(req.session, user);
            console.log('req.session', req.session);
            const { id, first, last, img_url } = req.session;
            res.sendFile(__dirname + '/index.html');
            res.json({ id, first, last, img_url });
        })
        .catch(err => {
            console.log('error in POST /login:', err);
            res.json({ err: err });
        });
});

// POST /reset/start
app.post('/reset/start', (req, res) => {
    const { email } = req.body;
    db.getUser(email)
        .then(dbData =>
            dbData.rows[0] === undefined
                ? Promise.reject(`Email is not registered.`)
                : cryptoRandomString({ length: 6 })
        )
        .then(secretCode =>
            db.setResetCode(email, secretCode).then(() => {
                // Temporarily disabled to avoid email spam.
                ////////////////////////////////////////////
                // ses.sendEmail(
                //     'mail@tillgrosch.com',
                //     'Email verification',
                //     `To verify your email address, please enter the following super secret code: ${secretCode}`
                // ).then(resp => {
                console.log('email has been sent.', resp);
                console.log('secretCode', secretCode);
                req.session.email = email;
                res.json({ success: true });
                // });
            })
        )
        .catch(err => {
            console.log('error in POST /reset/start:', err);
            res.json({ err: err });
        });
});

// POST /reset/verify ////////////////
app.post('/reset/verify', (req, res) => {
    const { secret, psswd } = req.body;
    db.getResetCode(req.session.email)
        .then(dbData =>
            dbData.rows[0].code !== secret
                ? Promise.reject(`You have entered the wrong secret.`)
                : db
                      .updatePsswd(req.session.email, psswd)
                      .then(() => res.json({ success: true }))
        )
        .catch(err => {
            console.log('error in POST /reset/verify:', err);
            res.json({ err: err });
        });
});

// GET /logout ///////////////////////
app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome');
});

// if LOGGED IN: serve index.html, else: redirect to /welcome
app.get('*', (req, res) => {
    if (req.session.id) {
        res.sendFile(__dirname + '/index.html');
    } else {
        res.redirect('/welcome');
    }
});

app.listen(port, function() {
    console.log(`I'm listening on port: ${port}`);
});
