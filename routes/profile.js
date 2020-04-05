// ../routes/user.js
const Router = require('express-promise-router');
const db = require('../db');
const conf = require('../config');
const s3 = require('../utils/s3');
// multer boilerplate ////////////////
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: { fileSize: 2097152 }
});
//////////////////////////////////////

const router = new Router();
module.exports = router;

// POST /user
router.get('/user', async (req, res) => {
    try {
        const user = await db.getUser(req.session.email);
        res.sendFile(__dirname + '/index.html');
        res.json({ success: true, ...user });
    } catch (err) {
        console.log('ERROR in POST /user:', err);
        res.json({ err: err });
    }
});

// POST /upload/profile/image
router.post('/upload/image', uploader.single('file'), s3.upload, (req, res) => {
    let imgUrl = conf.s3Url + req.file.filename;
    db.setImage(req.session.id, imgUrl)
        .then(image => {
            // console.log('image', image);
            res.json(image.rows[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});

// POST /upload/profile/bio
router.post('/upload/bio', (req, res) => {
    console.log('req.body', req.body);
    if (!req.body.bio) return res.json({ err: 'Write something, or cancel.' });
    db.setBio(req.session.id, req.body.bio)
        .then(bio => {
            // console.log('image', image);
            res.json(bio.rows[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
});
