const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const router = express.Router();

router.post('/post', async (req, res) => {
    try {
        const topic = {
          username: USER_NAME,
          title: req.body.title,
          body: req.body.body
        };
        console.log(topic);
        await dbservice.createPost(topic);
        return topic;
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