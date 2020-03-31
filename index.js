const express = require("express");
const app = (module.exports = express());
const port = process.env.PORT || 8080;

const db = require("./utils/db.js");

app.use(express.static("./public"));

const { SESSION_SECRET: sessionSecret } = process.env.SESSION_SECRET
    ? process.env
    : require("./secrets.json");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// const csurf = require("csurf");
// app.use(csurf());

const cookieSession = require("cookie-session");
app.use(
    cookieSession({
        secret: sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14 // ~ 1.2 billion milliseconds = 14 days
    })
);

const compression = require("compression");
app.use(compression());

const {
    logRoute
    // makeCookiesSafe
    // ifLoggedIn
} = require("./utils/middleware.js");
app.use(logRoute);
// app.use(makeCookiesSafe);

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// if NOT LOGGED IN: serve index.html (stay where you are), else: redirect to /
app.get("/welcome", (req, res) => {
    if (!req.session.id) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/");
    }
});

// POST /register
app.post("/register", (req, res) => {
    const { first, last, email, psswd } = req.body;
    db.registerUser(first, last, email, psswd)
        .then(dbData => dbData.rows[0].id)
        .then(id => {
            Object.assign(req.session, { id, first, last, email });
            res.sendFile(__dirname + "/index.html");
            res.json({ success: true });
        })
        .catch(err => {
            console.log("error in POST /register:", err);
            err.constraint === "users_email_key"
                ? res.json({ err: "already registered" })
                : res.json({ err: "try again" });
        });
});

// if LOGGED IN: serve index.html, else: redirect to /welcome
app.get("*", (req, res) => {
    if (req.session.id) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, function() {
    console.log(`I'm listening on port: ${port}`);
});
