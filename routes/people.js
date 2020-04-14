// ../routes/people.js
const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();
module.exports = router;

router.get('/user/:id', async (req, res) => {
    if (parseInt(req.params.id) === req.session.id)
        return res.json({ redirect: true });
    try {
        const user = await db.getUserById(req.params.id);
        res.json({ success: true, ...user });
    } catch (err) {
        console.log('ERROR in GET /people/user/:id:', err);
        res.json({ redirect: true });
    }
});

router.get('/users', async (req, res) => {
    try {
        const people = await db.getUsersLatest(3);
        res.json({ success: true, people });
    } catch (err) {
        console.log('ERROR in GET /people/users/:q:', err);
        res.json({ err: err });
    }
});

router.get('/users/:q', async (req, res) => {
    try {
        const people = await db.getUsersByName(req.params.q);
        res.json({ success: true, people });
    } catch (err) {
        console.log('ERROR in GET /people/users/:q:', err);
        res.json({ err: err });
    }
});

router.get('/friend/:id', async (req, res) => {
    try {
        const friend = await db.getFriend(req.session.id, req.params.id);
        res.json({ friend });
    } catch (err) {
        console.log('ERROR in GET /people/friend/:id:', err);
        res.json({ err: err });
    }
});

router.post('/request-friend', async (req, res) => {
    try {
        const friend = await db.requestFriend(req.session.id, req.body.id);
        res.json({ friend });
    } catch (err) {
        console.log('ERROR in POST /people/request-friend:', err);
        res.json({ err: err });
    }
});

router.post('/add-friend', async (req, res) => {
    try {
        const friend = await db.addFriend(req.session.id, req.body.id);
        res.json({ friend });
    } catch (err) {
        console.log('ERROR in POST /add-friend:', err);
        res.json({ err: err });
    }
});

router.post('/cancel-friend', async (req, res) => {
    try {
        const friend = await db.cancelFriend(req.session.id, req.body.id);
        res.json({ friend });
    } catch (err) {
        console.log('ERROR in POST /people/cancel-friend:', err);
        res.json({ err: err });
    }
});

router.get('/friends-wannabes', async (req, res) => {
    try {
        [friends, wannabes] = await Promise.all([
            db.getFriends(req.session.id),
            db.getWannabes(req.session.id),
        ]);
        console.log('friends', friends);
        console.log('wannabes', wannabes);
        res.sendStatus(200);
        // res.json({ friend });
    } catch (err) {
        console.log('ERROR in GET /people/friends-wannabes:', err);
        res.json({ err: err });
    }
});
