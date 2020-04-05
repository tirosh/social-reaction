// ./routes/index.js
const auth = require('./auth');
const profile = require('./profile');
module.exports = app => {
    app.use('/auth', auth);
    app.use('/profile', profile);
};
