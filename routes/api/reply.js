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

router.get('/reply', async (req, res) => {
    console.log('postID: ' + req.body.postID);
    try{
        const replies = await dbservice.getRepliesByPostID(req.body.postID);
        res.send(replies);
        return replies;
        
    }catch(err){
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


module.exports = router;