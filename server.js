const { request, response, static } = require("express");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const post = require('./routes/api/post.js');
const comments = require('./routes/api/reply.js');
const auth = require("./routes/api/auth.js");
const server = express();
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");


// * Body-parser, Cookie-parser, Session.
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.static(__dirname + "/public"));
server.use(
    session({
        secret: "ThisIsTheLegendarySession",
        resave: false,
        saveUninitialized: false
    })
);

// * Storing logged in session user in a global variable (MW).
USER_NAME = null;
server.use(function (req, res, next) {
    USER_NAME = req.session.user;
    next();
});

// * INITIALIZE AND USE PASSPORT.
server.use(passport.initialize());
server.use(passport.session());

// * ROUTING OUR ROUTES TO USE /
server.use("/", auth);
server.use("/", post);
server.use("/", comments);

// * LISTENS TO PORT
server.listen(PORT, (err) => {
    err ? console.log("PORT Error") : console.log(`Server started on ${PORT}`);
});

module.exports = server;
