const { request, response } = require("express");
const express = require("express");
const dbservice = require("../../database");
const { route } = require("./reply");
const router = express.Router();

// * GETTING ALL POSTS
router.get("/post", async (req, res) => {
  try {
    const posts = await dbservice.getPosts();
    res.send(posts);
  } catch (err) {
    console.log('GETTING ALL POSTS <- /posts <- post.js: ' + err);
  }
});

// * GET POST BY ID
router.get("/post/:id", async (req, res) => {
  const paramID = req.params.id;
  try {
    const post = await dbservice.getPostByID(paramID);
    res.send(post);
    return post;
  } catch (err) {
    console.log('GETTING POST BY ID <- /post/:id <- post.js: ' + err)
  }
});

// * CREATE POST
router.post('/post/add', async (req, res) => {
  try {
    const post = {
      username: USER_NAME,
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    };
    await dbservice.createPost(post);
    res.send(post);
    console.log(USER_NAME + " - CREATED POST:\n" + post.title);
  } catch (err) {
    console.log('CREATING POST <- /post/add <- post.js: ' + err)
  }
});

// * REMOVE POST
router.delete("/post/remove/:id", async (req, res) => {
  const postID = req.params.id;
  try {
    await dbservice.deletePostByID(postID);
    res.send();
    console.log(USER_NAME + " - REMOVED POST: " + postID);
  } catch (err) {
    console.log('REMOVING POST <- /post/remove/:id <- post.js: ' + err);
  }
});

// * UPDATE POST
router.put("/post/update/:id", async (req, res) => {
  const postID = req.body.postID;
  try {
    await dbservice.updatePostByID(req.body);
    res.send();
    console.log(USER_NAME + ": UPDATED POST: " + postID);
  } catch (err) {
    console.log('UPDATING POST <- /post/update/:id <- post.js: ' + err);
  }
});

// * MARK POST AS DUPLICATE
router.put('/post/duplicate/:postID', async (req, res) => {
  try {
    const postID = req.params.postID;
    await dbservice.duplicate(postID);
    res.send();
    console.log('POST: ' + postID + ' - MARKED AS DUPLICATE');
  } catch (err) {
    console.log('MARKING AS DUPLICATE <- /post/duplicate/:postID <- post.js: ' + err);
  }
});

// * LIKE POST
router.post('/post/like/:id', async (req, res) => {
  try {
    const postID = req.params.id;
    const table = 'post';
    const column = 'postID';
    await dbservice.like(table, column, postID, req.body.userID);
    res.send();
    console.log(USER_NAME + " - LIKED POST: " + postID);
  } catch (error) {
    console.log('LIKING POST <- /post/like/:id <- post.js: ' + error);
  }
});

// * DISLIKE POST
router.delete('/post/dislike/:id', async (req, res) => {
  try {
    const postID = req.params.id;
    const table = 'post';
    const column = 'postID';
    await dbservice.dislike(table, column, postID, req.body.userID);
    res.send();
    console.log(USER_NAME + " - DISLIKED POST: " + postID);
  } catch (error) {
    console.log('DISLIKING POST <- /post/dislike/:id <- post.js: ' + error);
  }
});

// * SHOWING USERS POSTS
router.get('/sort/user/:user', async (req, res) => {
  try {
    const user = req.params.user;
    const userPosts = await dbservice.sortByUser(user);
    res.send(userPosts);
    console.log(user + "  - VIEWS: OWN POSTS");
  } catch (err) {
    console.log('SORTING POST BY USER <- /sort/user/:user <- post.js: ' + err);
  }
});

// * SHOWING POST BY CATEGORY
router.get('/sort/category/:category', async (req, res) => {
  try {
    const sortByCategory = req.params.category;
    console.log(sortByCategory);
    const categoryPosts = await dbservice.sortByCategory(sortByCategory);
    res.send(categoryPosts);
    console.log(USER_NAME + ' VIEWS: ' + sortByCategory);
  } catch (err) {
    console.log('SORTING POST BY CATEGORY <- /sort/category/:category <- post.js: ' + err);
  }
});

module.exports = router;