const { request, response, static } = require("express");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const router = express.Router();
const server = express();
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const dbservice = require("./database");

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
server.use("/", router);

let user_id = null;

router.get("/home", (req, res) => {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.redirect("/index.html");
});

router.post("/login", async (req, res) => {
    try {
        const flag = await dbservice.getUserByUsername(req.body.username);
        if (!flag) {
            return res.send({ ERROR: "invalid Username" });
        } else {
            if (await bcrypt.compare(req.body.password, flag.password)) {
                grabbedUserId = await dbservice.getUserId(flag.username);
                req.login(grabbedUserId, (err) => {
                    user_id = flag.id;
                    console.log(user_id);
                    res.redirect("/home");
                });
            } else {
                res.send({ ERROR: "Username and password does not match" });
            }
        }
    } catch (err) {
        console.log(err);
    }
});

router.post("/signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPW = await bcrypt.hash(req.body.password, salt);
        const user = {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            password: hashPW,
        };
        await dbservice.addUser(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/user_data", async (req, res) => {
    try {
        if (user_id != null) {
            const loggedInUser = await dbservice.getUserById(user_id);
            res.send(loggedInUser);
        }
    } catch (err) {
        res.send(err);
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    user_id = null;
    res.redirect("/home");
});

passport.serializeUser((grabbedUserId, done) => {
    done(null, grabbedUserId);
});

passport.deserializeUser((grabbedUserId, done) => {
    done(null, grabbedUserId);
});

server.listen(PORT, (err) => {
    err ? console.log("PORT Error") : console.log(`Server started on ${PORT}`);
});

module.exports = server;
