const express = require('express');
const app = (exports = express());
const port = process.env.PORT || 8080;
const server = require('http').Server(app);
const db = require('./db');
const io = require('socket.io')(server, { origins: 'localhost:8080' });

const { SESSION_SECRET: sessionSecret } = process.env.SESSION_SECRET
    ? process.env
    : require('./secrets.json');
const cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14, // ~ 1.2 billion milliseconds = 14 days
});

const csurf = require('csurf');
const bodyParser = require('body-parser');
const {
    logRoute,
    makeCookiesSafe,
    logErrors,
    clientErrorHandler,
    errorHandler,
} = require('./utils/middleware');

const compression = require('compression');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const people = require('./routes/people');

app.use(express.static('./public'));
app.use(bodyParser.json());

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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
            target: 'http://localhost:8081/',
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
app.use('/people', people);

app.post('/bounce', (req, res) => res.sendStatus(200));

// if LOGGED IN: serve index.html, else: redirect to /welcome
app.get('*', (req, res) => {
    req.session.id
        ? res.sendFile(__dirname + '/index.html')
        : res.redirect('/welcome');
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

server.listen(port, function () {
    console.log(`I'm listening on port: ${port}`);
});

let onlineUsers = {};
io.on('connection', function (socket) {
    console.log(`socket with the id ${socket.id} is now connected`);

    if (!socket.request.session.id) {
        return socket.disconnect(true);
    }

    const id = socket.request.session.id;
    onlineUsers[socket.id] = id;

    db.getLatestMessages(10).then((data) => {
        // console.log('data', data);
        io.sockets.emit('chatMessages', data);
        io.sockets.sockets[socket.id].emit('latestMessages', data);
    });

    socket.on('newChatMsg', (newMsg) => {
        console.log('This is a message:', newMsg, 'user:', id);
    });
    // /* ... */
    // console.log(`socket with the id ${socket.id} is now connected`);

    // socket.on('thanks', function (data) {
    //     console.log(data);
    // });

    // socket.emit('welcome', {
    //     message: 'Welome. It is nice to see you',
    // });
    socket.on('disconnect', function () {
        // runs when a user disconnects - ie logs off or closes browser/tab
        delete onlineUsers[socket.id]; // remove user from onlineUsers who just left
        // before we emit userLeft, we need to confirm that the user is really gone
        // ie if the user had 7 tabs open and they closed only 1, don't fire userLeft because the user hasn't actually left! only fire userLeft when the user closed all 7 tabs!
        // emit userLeft here
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});
