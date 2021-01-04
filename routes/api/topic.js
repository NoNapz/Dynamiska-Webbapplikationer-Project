const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const { route } = require("./reply");
const router = express.Router();

// * Post a topic.
router.post('/post', async (req, res) => {
    try {
        const topic = {
            username: USER_NAME,
            title: req.body.title,
            body: req.body.body,
            category: req.body.category
        };
        console.log(topic);
        await dbservice.createPost(topic);
        return topic;
    } catch (err) {
        res.send('Error sending commment');
    }
});

// * Get post by id
router.get("/post/:id", async (req, res) => {
  const paramID = req.params.id;
  try {
    const found = await dbservice.getPostByID(paramID);
    if (found) {
      res.send(found);
      return found;
    } else {
      res
        .status(400)
        .send({ ERROR: `Post with ID: ${paramID} does not exist.` });
    }
  } catch (err) {
    res.send(err);
  }
});

// * Get posts, get them all
router.get("/posts", async (req, res) => {
    try {
        const posts = await dbservice.getPosts();
        res.send(posts);
    } catch (err) {
        res.send(err);
    }
});

// * LIKE POST
router.post("/postlike/:id", async (req, res) => {
  const paramID = req.params.id;
  try {
    const addLike = {
      username: USER_NAME,
      postID: paramID
    };
    console.log(addLike);
    await dbservice.likePost(addLike);
    return addLike;
  } catch (err) {
    res.send(err);
  }
});

router.get("/postdislike/:id", async (req, res) =>{
  const paramID = req.params.id;
  try{
    const dislike = {
      username : USER_NAME,
      postID : paramID
    };
    console.log(dislike);
    await dbservice.removePostLike(dislike);
    return dislike;
  }catch(err){
    console.log('Error: ' + err);
  }
});

router.delete("/removePost/:id", async (req, res) =>{
  const found = req.params.id;
  console.log(found);
  try{
    await dbservice.deletePostByID(found);
  }catch(err) {
    console.log('Error from topic.js: ' + err);
  }
});

router.put("/updatePostByID/:id", async (req, res) =>{
  const found = req.body.postID;
  console.log('found: ' + found);

  try{
    await dbservice.updatePostByID(req.body);
  }catch(err){  
    console.log('Error updating post: ' + err);
  }
});

router.get('/userPost', async (req, res) => {
  try {
    const username = USER_NAME;
    const userPosts = await dbservice.sortByUser(username);
    res.send(userPosts);
    console.log(username + " viewing their posts");
    return userPosts;
  } catch(err) {
    console.log("Error finding user posts: " + err);
  }

});

router.get('/sortByCategory/:category', async (req, res) =>{
  try{
    const sortByCategory = req.params.category;
    const categoryPosts = await dbservice.sortByCategory(sortByCategory);
    res.send(categoryPosts);
    console.log(USER_NAME + ' sorted posts by: ' + sortByCategory);
    return categoryPosts;
  }catch(err){
    throw new Error('Error: ' + err);
  }
})


module.exports = router;