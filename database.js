const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { response } = require("express");

//* DATABASE DRIVER
const dbPromise = async () => {
    return open({
        filename: "./database.sqlite",
        driver: sqlite3.Database,
    });
};
/**************** USER ****************/
// * ADD USER TO DB
const addUser = async (data) => {
    try {
        const dbCon = await dbPromise();
        const user = await dbCon.run(
            `INSERT INTO users (username, email, name, password) 
            VALUES (?,?,?,?)`,
            [data.username, data.email, data.name, data.password]
        );
        console.log("Worked");
        return user;
    } catch (err) {
        throw new Error("Error adding User to database: " + err);
    }
};

const getUserByUsername = async (data) => {
    try {
        const dbCon = await dbPromise();
        const user = await dbCon.get(
            "SELECT username, password, id FROM users WHERE username = ?",
            [data]
        );
        return user;
    } catch (err) {
        throw new Error("Error getting User with Username: " + err);
    }
};

const getUserId = async (data) => {
    try {
        const dbCon = await dbPromise();
        const user = await dbCon.get(
            "SELECT id FROM users WHERE username = ?",
            [data]
        );
        return user;
    } catch (err) {
        throw new Error("Error getting User with ID: " + err);
    }
};

const getUserData = async (data) => {
    try {
        const dbCon = await dbPromise();
        const user = await dbCon.get(
            "SELECT username, email, name, userType, id FROM users WHERE username = ?",
            [data]
        );
        return user;
    } catch (err) {
        throw new Error("Error getting User with ID: " + err);
    }
};

/********************* POST ************************/

// * Add product to database
const createPost = async (data) => {
    try {
        const dbCon = await dbPromise();
        const post = await dbCon.run(
            `INSERT INTO post (username, title, body) VALUES (?,?,?)`,
            [data.username, data.title, data.body]
        );
        return post;
    } catch (err) {
        throw new Error("Error adding Post to database: " + err);
    }
};

// * Get all products from database
const getPosts = async () => {
    try {
        const dbCon = await dbPromise();
        const posts = await dbCon.all(
            "SELECT * FROM post ORDER BY postID DESC"
        );
        return posts;
    } catch (err) {
        throw new Error("Error getting Comments from database: " + err);
    }
};

// * Get product by id from database
const getPostByID = async (postID) => {
  try {
    const dbCon = await dbPromise();
    const post = await dbCon.get(
      "SELECT * FROM post WHERE postID = ?",
      [postID]
    );
    return post;
  } catch (err) {
    throw new Error("Error getting Post by ID: " + err);
  }
};

const likePost = async (data) => {
    try {
        const dbCon = await dbPromise();
        const like = await dbCon.run(
          `INSERT INTO likePost (username, postID) VALUES (?,?)
            `,
          [data.username, data.postID]
        //   WHERE NOT EXIST (SELECT * FROM likePost WHERE username = ? and postID = ?)
        );
        return like;
    } catch (err) {
        throw new Error("Error adding like to Post: " + err);
    }
};

const addPostLikes = async (postID) => {
    try {
        const dbCon = await dbPromise();
        const addLike = await dbCon.get(
            `UPDATE post SET likes = likes + 1 WHERE postID = ?`,
            [postID]
        );
        return addLike;
    } catch (err) {

    }
};

/********************* REPLY **************************/
const createReply = async (data) =>{
    try {
        console.log('postID: ' + data.postID);
        const dbCon = await dbPromise();
        const reply = await dbCon.run(
            `INSERT INTO reply (postID, username, reply) VALUES (?,?,?)`,
            [data.postID, data.username, data.reply]
        );
        return reply;
    } catch (err) {
        throw new Error("Error adding Post to database: " + err);
    }
}

const getRepliesByPostID = async (data) =>{
    console.log('Data: ' + data);
    try {
        const dbCon = await dbPromise();
        const replies = await dbCon.get(
            `SELECT *  FROM reply WHERE postID like ?`, [data]
        );
        console.log(replies);
        return replies;
    } catch (err) {
        throw new Error("Error getting shitaced XD from database: " + err);
    }
}

const getReplies = async ()=>{
    try {
        const dbcon = await dbPromise();
        const replies = await dbcon.all(
            "SELECT * FROM reply ORDER BY replyID DESC"
        );
        return replies;
    } catch(err){
        console.log('Fuck you: ' + err);
    }
}
// * EXPORT
module.exports = {
    // * All user exports
    addUser: addUser,
    getUserByUsername: getUserByUsername,
    getUserId: getUserId,
    getUserData: getUserData,
    // * All Post exports
    createPost: createPost,
    getPosts: getPosts,
    getPostByID: getPostByID,
    likePost: likePost,
    addPostLikes: addPostLikes,
    // * All Reply exports
    createReply: createReply,
    getRepliesByPostID: getRepliesByPostID,
    getReplies : getReplies
};
