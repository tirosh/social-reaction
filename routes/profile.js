// ../routes/profile.js
const Router = require('express-promise-router');
const db = require('../db');
const conf = require('../config');
const s3 = require('../utils/s3');
// multer boilerplate ////////////////
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});
const uploader = multer({
    storage: diskStorage,
    limits: { fileSize: 2097152 },
});
//////////////////////////////////////

const router = new Router();
module.exports = router;

router.get('/user', async (req, res) => {
    try {
        const user = await db.getUser(req.session.email);
        res.sendFile(__dirname + '/index.html');
        res.json({ success: true, ...user });
    } catch (err) {
        console.log('ERROR in POST /profile/user:', err);
        res.json({ err: err });
    }
});

router.post(
    '/upload/image',
    uploader.single('file'),
    s3.upload,
    async (req, res) => {
        const imgUrl = conf.s3Url + req.file.filename;
        try {
            const image = await db.setImage(req.session.id, imgUrl);
            res.json(image);
        } catch (err) {
            console.log('ERROR in POST /profile/upload/image:', err);
            res.json({ err: err });
        }
    }
);

router.post('/upload/bio', async (req, res) => {
    if (!req.body.bio) return res.json({ err: 'Write something, or cancel.' });
    try {
        const bio = await db.setBio(req.session.id, req.body.bio);
        res.json(bio);
    } catch (err) {
        console.log('ERROR in POST /profile/upload/bio:', err);
        res.json({ err: err });
    }
});

router.get('/user/:id', async (req, res) => {
    if (parseInt(req.params.id) === req.session.id)
        return res.json({ redirect: true });
    try {
        const user = await db.getUserById(req.params.id);
        res.json({ success: true, ...user });
    } catch (err) {
        console.log('ERROR in POST /profile/user/:id:', err);
        res.json({ redirect: true });
    }
});

router.get('/users/:q', async (req, res) => {
    console.log('req.params', req.params);
    try {
        const people = await db.getUsersByName(req.params.q);
        // console.log('people', people);
        res.json({ success: true, people });
    } catch (err) {
        console.log('ERROR in POST /profile/users/:q:', err);
        res.json({ err: err });
    }
    // res.sendStatus(200);
});
