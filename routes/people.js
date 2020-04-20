// ../routes/people.js
const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();
module.exports = router;

router.get('/user/:id', async (req, res) => {
    try {
        const user = await db.getUserById(req.session.id, req.params.id);
        res.json({ user });
    } catch (err) {
        console.log('ERROR in GET /people/user/:id:', err);
        res.json({ redirect: true });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await db.getUsersLatest(req.session.id, 3);
        res.json({ users });
    } catch (err) {
        console.log('ERROR in GET /people/users/:q:', err);
        res.json({ err: err });
    }
});

router.get('/users/:q', async (req, res) => {
    try {
        const users = await db.getUsersByName(req.session.id, req.params.q);
        // console.log('people :', people);
        res.json({ users });
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
        await db.requestFriend(req.session.id, req.body.id);
        const friendsWannabes = await db.getFriendsWannabes(req.session.id);
        res.json(friendsWannabes);
    } catch (err) {
        console.log('ERROR in POST /people/request-friend:', err);
        res.json({ err: err });
    }
});

router.post('/add-friend', async (req, res) => {
    try {
        await db.addFriend(req.session.id, req.body.id);
        const friendsWannabes = await db.getFriendsWannabes(req.session.id);
        res.json(friendsWannabes);
    } catch (err) {
        console.log('ERROR in POST /add-friend:', err);
        res.json({ err: err });
    }
});

router.post('/cancel-friend', async (req, res) => {
    try {
        await db.cancelFriend(req.session.id, req.body.id);
        const friendsWannabes = await db.getFriendsWannabes(req.session.id);
        res.json(friendsWannabes);
    } catch (err) {
        console.log('ERROR in POST /people/cancel-friend:', err);
        res.json({ err: err });
    }
});

router.get('/friends-wannabes', async (req, res) => {
    try {
        const friendsWannabes = await db.getFriendsWannabes(req.session.id);
        res.json(friendsWannabes);
    } catch (err) {
        console.log('ERROR in GET /people/friends-wannabes:', err);
        res.json({ err: err });
    }
});
