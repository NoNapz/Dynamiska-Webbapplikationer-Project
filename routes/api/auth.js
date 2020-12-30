const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

var user_id = null;

router.get("/home", (req, res) => {
    // console.log(req.user);
    // console.log(req.isAuthenticated());
    // console.log('hello');
    res.redirect("/index.html");
});

router.post("/login", async (req, res) => {
    // console.log(req.body.username);
    try {
        const flag = await dbservice.getUserByUsername(req.body.username);
        if (!flag) {
            return res.send({ ERROR: "invalid Username" });
        } else {
            if (await bcrypt.compare(req.body.password, flag.password)) {
                grabbedUserId = await dbservice.getUserId(flag.username);
                req.login(grabbedUserId, (err) => {
                    user_id = flag.id;
                    // console.log(user_id);
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

router.get("/getUser", async (req, res) =>{
    try{
            console.log('User id: ' + user_id);
            const user = await dbservice.getUserById(user_id);
            console.log('user in auth: ' + user.username);
            return user;
    }catch(err){
        res.send('Error sending user: ' + err);
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

module.exports = router;