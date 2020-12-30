const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

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
                    req.session.user = flag.username;
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
        return user;
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/user_data", async (req, res) => {
    try {
        if (USER_NAME != null) {
            const loggedInUser = await dbservice.getUserData(USER_NAME);
            res.send(loggedInUser);
        }
    } catch (err) {
        res.send(err);
    }
});

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    USER_NAME = null;
    res.redirect("/index.html");
});

passport.serializeUser((grabbedUserId, done) => {
    done(null, grabbedUserId);
});

passport.deserializeUser((grabbedUserId, done) => {
    done(null, grabbedUserId);
});

module.exports = router;