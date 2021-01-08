const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");

// * CHECK IF AUTHENTICATED - REDIRECT
router.get("/home", (req, res) => {
    console.log(req.isAuthenticated());
    res.redirect("/index.html");
});

// * GET SPECIFIC USER
router.get("/user_data/:username", async (req, res) => {
    try{
        let username = req.params.username;
        const user =  await dbservice.getUserData(username);
        res.send(user);
        return user;
    }catch(err){
        console.log('ERROR FINDING USER <- /user_data/:username <- auth.js: ' + err);
    }
});

// * SIGN UP USER - PASSWORD BCRYPT
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
        console.log('USER CREATED:\n' + user);
        res.redirect("/home");
    } catch (err) {
        console.log('CANT SIGNUP <- /signup <- auth.js: ' + err)
    }
});

// * UPDATE USER
router.put("/user_data/:username", async (req, res) =>{
    try {
        await dbservice.updateUser(req.body, req.params.username);
        res.send();
    } catch(err) {
        console.log('UPDATNG USER <- /user_data/:username <- auth.js: ' + err)
    }
});

// * LOGIN - PASSWORD BCRYPT MATCH - SESSION START
router.post("/login", async (req, res) => {
    try {
        const user = await dbservice.loginByUsername(req.body.username);
        if (!user) {
            console.log('User does not exist.')
        } else {
            if (await bcrypt.compare(req.body.password, user.password)) {
                if (user.status == 'Active'){
                    const grabbedUserId = user.userID;
                    req.login(grabbedUserId, (err) => {
                        req.session.user = user.username;
                        console.log('LOGGED IN: ' + user.username + ' -- SESSION STARTED');
                        res.redirect("/home");
                    });
                }else{
                    console.log(user.username + ' - BANNED');
                }
            }
        }
    } catch (err) {
        console.log('CANT LOGIN <- /login <- auth.js: ' +err);
    }
});

// * LOGGIN IN USER DATA
router.get("/user_data", async (req, res) => {
    try {
        if (USER_NAME != null) {
            const loggedInUser = await dbservice.getUserData(USER_NAME);
            res.send(loggedInUser);
        }
    } catch (err) {
        console.log('USER DATA <- /user_data <- auth.js: ' + err)
    }
});

//* LOGOUT - KILL SESSION
router.get("/logout", (req, res) => {
    console.log("LOGGED OUT: " + USER_NAME + " -- SESSION ENDED");
    req.logout();
    req.session.destroy();
    console.log(req.isAuthenticated());
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