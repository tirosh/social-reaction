// ./routes/auth.js
const Router = require('express-promise-router');
const db = require('../db');
const cryptoRandomString = require('crypto-random-string');
const ses = require('../utils/ses');
const { hash, compare } = require('../utils/bc');

// express-promise-router with same API as express router
// except it allows to use async functions as route handlers
const router = new Router();
module.exports = router;

// POST /register
router.post('/register', async (req, res, next) => {
    const { first, last, email, psswd } = req.body;
    if (!first || !last || !email || !psswd)
        return res.json({ err: 'Please fill in all fields.' });
    try {
        const hashdPsswd = await hash(psswd);
        req.session.id = await db.registerUser(first, last, email, hashdPsswd);
        req.session.email = email;
        res.sendFile(__dirname + '/index.html');
        res.json({ success: true });
    } catch (err) {
        console.log('ERROR in POST /register:', err);
        err.constraint === 'users_email_key'
            ? res.json({ err: 'Email is already registered.' })
            : res.json({
                  err: 'Uh, err, something went wrong! Please try again.'
              });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    const { email, psswd } = req.body;
    if (!email || !psswd)
        return res.json({ err: 'We need email and password to log you in.' });
    try {
        const hashdPsswd = await db.getPsswd(email);
        const match = await compare(psswd, hashdPsswd);
        if (!match) return res.json({ err: 'Wrong password.' });
        req.session.id = await db.getId(email);
        req.session.email = email;
        res.sendFile(__dirname + '/index.html');
        res.json({ success: true });
    } catch (err) {
        console.log('ERROR in POST /login:', err);
        res.json({ err: err });
    }
});

// POST /reset/start
router.post('/password/reset', (req, res) => {
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
                // console.log('email has been sent.', resp);
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
router.post('/password/reset/verify', (req, res) => {
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
router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome');
});
