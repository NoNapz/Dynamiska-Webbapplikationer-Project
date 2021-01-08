const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { response } = require("express");

// * DATABASE DRIVER
const dbPromise = async () => {
    return open({
        filename: "./database.sqlite",
        driver: sqlite3.Database,
    });
};

//*~~~~~~~~~~~~ USER DATABASE CALLS ~~~~~~~~~~~~*//
// * GET USER DATA
const getUserData = async (data) => {
    try {
        const dbCon = await dbPromise();
        const user = await dbCon.get(
            "SELECT username, email, name, status, userType, userID FROM users WHERE username = ?", [data]
        );
        return user;
    } catch (err) {
        throw new Error('GETTING USER DATA <- getUserData <- Database.js: ' + err);
    }
};

// * ADDING USER
const addUser = async (user) => {
    try {
        const dbCon = await dbPromise();
        await dbCon.run(
            `INSERT INTO users (username, email, name, password) VALUES (?,?,?,?)`, [user.username, user.email, user.name, user.password]
        );
    } catch (err) {
        throw new Error('ADDING USER <- addUser <- Database.js: ' + err);
    }
};

// * UPDATE USER
const updateUser = async(data, username) =>{
    try{
        const dbcon = await dbPromise();
        await dbcon.get(
            "UPDATE users SET username = ?, email = ?, name = ?, status = ?, userType = ? WHERE username = ?",
            [data.username, data.email, data.name, data.status, data.userType, username]
        );
        await dbcon.get(
            "UPDATE post SET username = ? WHERE username = ?", [data.username, username]
        );
        await dbcon.get(
            "UPDATE reply SET username = ? WHERE username = ?", [data.username, username]
        );
    }catch(err){
        throw new Error('UPDATING USER <- updateUser <- Database.js: ' + err);
    }
};

// * GETTING USER FOR LOGIN BY USERNAME
const loginByUsername = async (username) => {
    try {
        const dbCon = await dbPromise();
        const user = await dbCon.get(
            "SELECT username, password, userID, status FROM users WHERE username = ?", [username]
        );
        return user;
    } catch (err) {
        throw new Error('GETTING USER BY USERNAME <- getUserByUsername <- Database.js: ' + err);
    }
};
//*~~~~~~~~~~~~ USER DATABASE CALLS END ~~~~~~~~~~~~*//

//*~~~~~~~~~~~~ POSTS DATABASE CALLS ~~~~~~~~~~~~*//
// * GETTING ALL POSTS
const getPosts = async () => {
    try {
        const dbCon = await dbPromise();
        const posts = await dbCon.all(
            "SELECT * FROM post ORDER BY postID DESC"
        );
        return posts;
    } catch (err) {
        throw new Error('GET POSTS <- get Posts <- database.js: ' + err);
    }
};

// * GETTING POST BY ID
const getPostByID = async (postID) => {
    try {
        const dbCon = await dbPromise();
        const post = await dbCon.get(
            "SELECT * FROM post WHERE postID = ?", [postID]
        );
        return post;
    } catch (err) {
        throw new Error('GETTING POST BY ID <- getPostByID <- database.js: ' + err);
    }
};

// * CREATE POST
const createPost = async (post) => {
    try {
        const dbCon = await dbPromise();
        await dbCon.run(
            `INSERT INTO post (username, title, body, category) VALUES (?,?,?,?)`, [post.username, post.title, post.body, post.category]
        );
    } catch (err) {
        throw new Error('CREATING POST <- createPost <- database.js: ' + err);
    }
};

//* DELETE POST BY ID
const deletePostByID = async (postID) =>{
    try {
        const dbcon = await dbPromise();
        await dbcon.get(
            `DELETE FROM likes WHERE replyID in (SELECT replyID FROM reply WHERE postID = ?)`, [postID]
        );
        await dbcon.all(
            `DELETE FROM reply WHERE postID = ?`, [postID]
        );
        await dbcon.get(
            `DELETE FROM likes WHERE postID = ?`, [postID]
        );
        await dbcon.get(
            `DELETE FROM post WHERE postID = ?`, [postID]
        );
    } catch (err) {
        throw new Error ('DELETE POST BY ID <- deletePostByID <- database.js: ' + err);
    }
};

//* UPDATE POST BY ID
const updatePostByID = async(data)=>{
    try{
        const dbcon = await dbPromise();
        await dbcon.get(
            "UPDATE post SET title=?, body=?, category=? WHERE postID = ?", [data.postTitle, data.postBody, data.postCategory, data.postID]
        );
    }catch(err){
        throw new Error('UPDATING POST BY ID <- updatePostByID <- database.js: ' + err);
    }
};

// * MARK POST AS DUPLICATE
const duplicate = async (postID)=>{
    try {
        const dbcon = await dbPromise();
        await dbcon.get(
            "UPDATE post SET isDuplicate = 1 where postID = ?", [postID]
        );
    } catch (err) {
        throw new Error('MARKING AS DUPLICATE <- duplicate <- database.js: ' + err)
    }
};
//*~~~~~~~~~~~~ POSTS DATABASE CALLS END ~~~~~~~~~~~~*//

//*~~~~~~~~~~~~ REPLY DATABASE CALLS ~~~~~~~~~~~~*//
// * GET REPLY BY REPLY ID
const getRepliesByID = async (replyID) => {
    try {
        const dbCon = await dbPromise();
        const reply = await dbCon.get("SELECT * FROM reply WHERE replyID = ?", [replyID]);
        return reply;
    } catch (err) {
        throw new Error('GETTING REPLY BY REPLY ID <- getRepliesByID <- database.js: ' + err);
    }
};

// * GET REPLIES BY POST ID
const getRepliesByPostID = async (postID) => {
    try {
        const dbCon = await dbPromise();
        const replies = await dbCon.all(
            `SELECT * FROM reply WHERE postID like ?`, [postID]
        );
        return replies;
    } catch (err) {
        throw new Error("GETTING REPLIES BY POST ID <- getRepliesByPostID <- database.js: " + err);
    }
};

// * CREATE REPLY
const createReply = async (data) => {
    try {
        const dbCon = await dbPromise();
        await dbCon.run(
            `INSERT INTO reply (postID, username, reply) VALUES (?,?,?)`, [data.postID, data.username, data.reply]
        );
    } catch (err) {
        throw new Error("CREATING REPLY <- createReply <- database.js: " + err);
    }
};

// * DELETE REPLY 
const deleteReply = async (replyID) =>{
    try{
        const dbcon = await dbPromise();
        await dbcon.get(
            `DELETE FROM reply WHERE replyID = ?`, [replyID]
        );
        await dbcon.get(
            `DELETE FROM likes WHERE replyID = ?`, [replyID]
        );
    } catch (err){
        throw new Error ('DELETE REPLY <- deleteReply <- database.js: ' + err);
    }
};

// * EDIT REPLY
const editReply = async(data) => {
    try{
        const dbcon = await dbPromise();
        await dbcon.get(
            "UPDATE reply SET reply = ? WHERE replyID = ?", [data.reply, data.replyID]
        );  
    }catch(err){
        throw new Error('EDITING REPLY <- editReply <- database.js: ' + err);
    }
    
};
//*~~~~~~~~~~~~ REPLY DATABASE CALLS END ~~~~~~~~~~~~*//

//*~~~~~~~~~~~~ LIKES DATABASE CALLS ~~~~~~~~~~~~*//
// * ADDING LIKE TO POST / REPLY
const like = async (table, column, ID, userID) => {
    try {
        const dbcon = await dbPromise();
        await dbcon.run(
            `INSERT INTO likes (userID, ${column}) VALUES (?, ?)`, [userID, ID]
        );
        const getLikes = await dbcon.all(
            `SELECT likeID, userID, ${column} FROM likes WHERE ${column} = ?`, [ID]
        );
        const likeAmount = getLikes.length;
        await dbcon.all(
            `UPDATE ${table} SET likes = ? WHERE ${column} = ?`, [likeAmount, ID]
        )
        return getLikes;
    } catch (err) {
        throw new Error('ADDING LIKE TO POST / REPLY <- like <- database.js: ' + err);
    }
};

// * REMOVE LIKE FROM POST / REPLY
const dislike = async (table, column, ID, userID) => {
    try {
        const dbcon = await dbPromise();
        await dbcon.run(
            `DELETE FROM likes WHERE ${column} = ? AND userID = ?`, [ID, userID]
        );
        const getLikes = await dbcon.all(
            `SELECT likeID, userID, ${column} FROM likes WHERE ${column} = ?`, [ID]
        );
        const likeAmount = getLikes.length;
        await dbcon.all(
            `UPDATE ${table} SET likes = ? WHERE ${column} = ?`, [likeAmount, ID]
        );
        return getLikes;
    } catch (err) {
        throw new Error('DELETE LIKE FROM POST / REPLY <- dislike <- database.js: ' +err);
    }
};
//*~~~~~~~~~~~~ LIKES DATABASE CALLS END ~~~~~~~~~~~~*//

//*~~~~~~~~~~~~ SORTING DATABASE CALLS ~~~~~~~~~~~~*//
// * SORT POST BY USER
const sortByUser = async (username)=>{
    try{
        const dbcon = await dbPromise();
        const getPosts = await dbcon.all(
            "SELECT * FROM post where username = ?", [username]
        )
        return getPosts
    }catch(err){
        throw new Error('SORTING BY USER <- sortByUser <- database.js: ' + err);
    }
};

// * SORT POST BY CATEGORY
const sortByCategory = async (category)=>{
    try{
        const dbcon = await dbPromise();
        const getPosts = await dbcon.all(
            "SELECT * FROM post where category = ?", [category]
        )
        return getPosts
    }catch(err){
        throw new Error('SORTING BY CATEGORY <- sortByCategory <- database.js: ' + err);
    }
};
//*~~~~~~~~~~~~ SORTING DATABASE CALLS END ~~~~~~~~~~~~*//

// * EXPORT
module.exports = {
    // * All user exports
    getUserData: getUserData,
    addUser: addUser,
    updateUser: updateUser,
    loginByUsername: loginByUsername,
    // * All Post exports
    getPosts: getPosts,
    getPostByID: getPostByID,
    createPost: createPost,
    deletePostByID: deletePostByID,
    updatePostByID: updatePostByID,
    duplicate: duplicate,
    // * All Reply exports
    getRepliesByID: getRepliesByID,
    getRepliesByPostID: getRepliesByPostID,
    createReply: createReply,
    deleteReply: deleteReply,
    editReply: editReply,
    // * Like exports
    like: like,
    dislike: dislike,
    // * Sorting exports
    sortByUser: sortByUser,
    sortByCategory: sortByCategory,
};
