const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const router = express.Router();

// * GET REPLY BY ID
router.get('/reply/:replyID', async (req, res) => {
    try {
        const reply = await dbservice.getRepliesByID(req.params.replyID);
        res.send(reply);
    } catch (err) {
        console.log('GETTING REPLY BY ID <- /reply/id/:id <- reply.js: ' + err);
    }
});

// * GET REPLY BY POST ID
router.get('/reply/post/:postID', async (req, res) => {
    const paramID = req.params.postID;
    try {
        const replies = await dbservice.getRepliesByPostID(paramID);
        res.send(replies);
    } catch (err) {
        console.log('GETTING REPLIES BY POST ID <- /reply/post/:postID <- reply.js: ' + err);
    }
});

// * ADD REPLY
router.post('/reply/add', async (req, res) => {
    try {
        const reply = {
            postID: req.body.postID,
            username: USER_NAME,
            reply: req.body.reply,
        };
        await dbservice.createReply(reply);
        res.send(reply);
        console.log(USER_NAME + ' MADE REPLY:\n' + reply.reply);
    } catch (err) {
        console.log('POSTING COMMENT <- /reply/add <- reply.js: ' + err);
    }
});

// * REMOVE REPLY
router.delete("/reply/remove/:replyID", async (req, res) => {
    const replyID = req.params.replyID;
    try {
        await dbservice.deleteReply(replyID);
        res.send();
        console.log(USER_NAME + " - REMOVED REPLY: " + replyID);
    } catch (err) {
        console.log('REMOVING REPLY <- /reply/remove/:replyID <- reply.js: ' + err);
    }
});

// * EDIT REPLY
router.put("/reply/edit/:replyID", async (req, res) => {
    try {
        const replyID = req.params.replyID;
        await dbservice.editReply(req.body)
        res.send();
        console.log(USER_NAME + " - EDITED REPLY: " + replyID);
    } catch (err) {
        console.log("EDIT REPLY <- /reply/edit/:replyID <- reply.js: " + err);
    }
});

// * LIKING REPLY
router.post("/reply/like/:replyID", async (req, res) => {
    try {
        const replyID = req.params.replyID;
        const table = "reply";
        const column = "replyID";
        await dbservice.like(table, column, replyID, req.body.userID);
        res.send();
        console.log(USER_NAME + " - LIKED REPLY: " + replyID);
    } catch (err) {
        console.log("ADDING LIKE TO REPLY <- /reply/like/:id <- reply.js: " + err);
    }
});

// * DISLIKING REPLY
router.delete('/reply/dislike/:replyID', async (req, res) => {
    try {
        const replyID = req.params.replyID;
        const table = 'reply';
        const column = 'replyID';
        await dbservice.dislike(table, column, replyID, req.body.userID);
        res.send()
        console.log(USER_NAME + " - DISLIKED REPLY: " + replyID);
    } catch (err) {
        console.log("REMOVING LIKE FROM REPLY <- /reply/dislike/:id <- reply.js: " + err);
    }
});

module.exports = router;