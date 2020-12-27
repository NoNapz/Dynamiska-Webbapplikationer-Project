const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const router = express.Router();
const bcrypt = require("bcrypt");

// * Sign up and Hashing password
router.post("/", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPW = await bcrypt.hash(req.body.password, salt);
        const user = {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            password: hashPW
        };
        await dbservice.addUser(user);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;
