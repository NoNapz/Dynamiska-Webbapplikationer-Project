const { request, response, static } = require("express");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const topic = require('./routes/api/topic.js');
const comments = require('./routes/api/comments.js');
const auth = require("./routes/api/auth.js");
const server = express();
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Body parse (MW)
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(express.static(__dirname + "/public"));
server.use(
    session({
        secret: "Version2Test",
        resave: false,
        saveUninitialized: false
    })
);
server.use(passport.initialize());
server.use(passport.session());

server.use("/", auth);
server.use("/", topic);
server.use("/", comments);

server.listen(PORT, (err) => {
    err ? console.log("PORT Error") : console.log(`Server started on ${PORT}`);
});

module.exports = server;
