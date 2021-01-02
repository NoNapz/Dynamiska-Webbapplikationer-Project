const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const router = express.Router();


router.post('/reply', async (req, res) => {
    try {
        console.log('postID: ' + req.body.postID);
        const reply = {
            postID: req.body.postID,
            username: USER_NAME,
            reply: req.body.reply,
        };
        await dbservice.createReply(reply);
        return reply;
    } catch (err) {
        res.send('Error sending commment' + err);
    }
});

router.get('/reply/:postID', async (req, res) => {
    const paramID = req.params.postID;
    try {
        const replies = await dbservice.getRepliesByPostID(paramID);
        res.send(replies);
        return replies;
    } catch (err) {
        console.log('Problem getting replies: ' + err);
    }
});

router.get("/replies", async (req, res) => {
    try {
        const replies = await dbservice.getReplies();
        res.send(replies);
    } catch (err) {
        res.send(err);
    }
});

router.post("/replylike/:id", async (req, res) => {
    const paramID = req.params.id;
    try {
        const addLike = {
            username: USER_NAME,
            replyID: paramID,
        };
        console.log(addLike);
        await dbservice.likeReply(addLike);
        return addLike;
    } catch (err) {
        res.send(err);
    }
});

router.get("/replydislike/:id", async (req, res) => {
    const paramID = req.params.id;
    try {
        const dislike = {
            username: USER_NAME,
            replyID: paramID,
        };
        console.log(dislike);
        await dbservice.removeReplyLike(dislike);
        return dislike;
    } catch (err) {
        console.log("Error: " + err);
    }
});

module.exports = router;