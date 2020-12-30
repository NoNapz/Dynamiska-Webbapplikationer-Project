const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const router = express.Router();


router.post('/comment', async (req, res) => {
    // console.log(user_id);
    try {
        // user = await dbservice.getUserById();
        const topic = {
            // postsID: req.body.postsid,
            // userID: req.body.userid,
            body: req.body.body,
            title: req.body.title
        };
        await dbservice.createPost(topic);
        res.send(topic);
    } catch (err) {
        res.send('Error sending commment');
    }
});

router.get("/posts", async (request, response) => {
  try {
    const posts = await dbservice.getPosts();
    response.send(posts);
  } catch (err) {
    response.send(err);
  }
});



module.exports = router;