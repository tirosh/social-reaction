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

router.post('/password/reset', async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.json({
            err: `We can't check nothing. Please enter an email address.`
        });
    try {
        await db.getUser(email);
        const secretCode = await cryptoRandomString({ length: 6 });
        await db.setPsswdResetCode(email, secretCode);
        // Temporarily disabled to avoid email spam.
        ////////////////////////////////////////////
        // const resp = await ses.sendEmail(
        //     'mail@tillgrosch.com',
        //     'Email verification',
        //     `To verify your email address, please enter the following super secret code: ${secretCode}`
        // );
        // console.log('email has been sent.', resp);
        console.log('secretCode', secretCode);
        req.session.email = email;
        res.json({ success: true });
    } catch (err) {
        console.log('ERROR in POST /password/reset:', err);
        res.json({ err: err });
    }
});

router.post('/password/reset/verify', async (req, res) => {
    const { secret, psswd } = req.body;
    if (!secret || !psswd)
        return res.json({
            err: 'Please enter the secret and your new password.'
        });
    try {
        const code = await db.getPsswdResetCode(req.session.email);
        if (code !== secret)
            return res.json({ err: 'You have entered the wrong secret.' });
        await db.updatePsswd(req.session.email, psswd);
        res.json({ success: true });
    } catch (err) {
        console.log('ERROR in POST /password/reset/verify:', err);
        res.json({ err: err });
    }
});

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/welcome');
});
