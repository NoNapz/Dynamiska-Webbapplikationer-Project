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
            `INSERT INTO users (username, email, name, password) VALUES (?,?,?,?)`, [data.username, data.email, data.name, data.password]
        );
        return user;
    } catch (err) {
        throw new Error("Error adding User to database: " + err);
    }
};

const getUserByUsername = async (data) => {
    try {
        const dbCon = await dbPromise();
        const user = await dbCon.get(
            "SELECT username, password, userID, status FROM users WHERE username = ?", [data]
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
            "SELECT userID FROM users WHERE username = ?", [data]
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
            "SELECT username, email, name, userType, userID FROM users WHERE username = ?", [data]
        );
        return user;
    } catch (err) {
        throw new Error("Error getting User with ID: " + err);
    }
};
const getFullUser = async(data)=>{
    try{
        const dbcon = await dbPromise();
        const user = await dbcon.get(
            "SELECT * FROM users WHERE username = ?", [data]
        )
        return user;
    }catch(err){
        throw new Error('Error: ' + err);
    }
}
const updateUser = async(data, username) =>{
    try{
        const dbcon = await dbPromise();
        const user = await dbcon.get(
            "UPDATE users SET username = ?, email = ?, name = ?, status = ?, userType = ? WHERE username = ?",
            [data.username, data.email, data.name, data.status, data.userType, username]
        );
        const post = await dbcon.get(
            "UPDATE post SET username = ? WHERE username = ?", [data.username, username]
        );
        const reply = await dbcon.get(
            "UPDATE reply SET username = ? WHERE username = ?", [data.username, username]
        );
        return user;
    }catch(err){
        throw new Error('Error: ' + err);
    }
}
/********************* POST ************************/

// Delete post by ID
const deletePostByID = async (data) =>{
    try {
        const dbcon = await dbPromise();
        await dbcon.get(
            `DELETE FROM likes WHERE replyID in (SELECT replyID FROM reply WHERE postID = ?)`, [data]
        );
        await dbcon.all(
            `DELETE FROM reply WHERE postID = ?`, [data]
        );
        await dbcon.get(
            `DELETE FROM likes WHERE postID = ?`, [data]
        );
        await dbcon.get(
            `DELETE FROM post WHERE postID = ?`, [data]
        );

    } catch (err) {
        throw new Error ('Error: ' + err);
    }
};


const updatePostByID = async(data)=>{
    try{
        const dbcon = await dbPromise();
        const updatePost = await dbcon.get(
            "UPDATE post SET title=?, body=?, category=? WHERE postID = ?", [data.postTitle, data.postBody, data.postCategory, data.postID]
        );
        return updatePost;
    }catch(err){
        throw new Error('Error: ' + err);
    }
}

// * Add product to database
const createPost = async (data) => {
    try {
        const dbCon = await dbPromise();
        const post = await dbCon.run(
            `INSERT INTO post (username, title, body, category) VALUES (?,?,?,?)`, [data.username, data.title, data.body, data.category]
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

// * Get post by id from database
const getPostByID = async (postID) => {
    try {
        const dbCon = await dbPromise();
        const post = await dbCon.get(
            "SELECT * FROM post WHERE postID = ?", [postID]
        );
        console.log('user: ' + JSON.stringify(post));
        return post;
    } catch (err) {
        throw new Error("Error getting Post by ID: " + err);
    }
};

const duplicate = async (id)=>{
    try {
        const dbcon = await dbPromise();
        console.log('duplicate ID?: ' + id);
        const duplicate = await dbcon.get(
            "UPDATE post SET isDuplicate = 1 where postID = ?", [id]
        );
        return duplicate;
    } catch (err) {
        throw new Error("Error marking as duplicate on post: " + id)
    }
}

const like = async (table, column, ID, userID) => {
    console.log('PostID: ' + ID);
    console.log('userID: ' + userID);
    console.log('table: ' + table);
    console.log('column: ' + column);
    
    try {
        const dbcon = await dbPromise();
        const makeLike = await dbcon.run(
            `INSERT INTO likes (userID, ${column}) VALUES (?, ?)`, [userID, ID]
        );
        const getLikes = await dbcon.all(
            `SELECT likeID, userID, ${column} FROM likes WHERE ${column} = ?`, [ID]
        );
        const likeAmount = getLikes.length;
        console.log(likeAmount);
        const updateLikes = await dbcon.all(
            `UPDATE ${table} SET likes = ? WHERE ${column} = ?`, [likeAmount, ID]
        )
        return makeLike;
    } catch (error) {
        throw new Error('Error adding to database: ' + error);
    }
}

const dislike = async (table, column, ID, userID) => {
    console.log('PostID: ' + ID);
    console.log('userID: ' + userID);
    console.log('table: ' + table);
    console.log('column: ' + column);

    try {
        const dbcon = await dbPromise();
        const deleteLike = dbcon.run(
            `DELETE FROM likes WHERE ${column} = ? AND userID = ?`, [ID, userID]
        );
        const getLikes = await dbcon.all(
            `SELECT likeID, userID, ${column} FROM likes WHERE ${column} = ?`, [ID]
        );
        const likeAmount = getLikes.length;
        console.log('Likeamount: ' +likeAmount);
        const updateLikes = await dbcon.all(
            `UPDATE ${table} SET likes = ? WHERE ${column} = ?`, [likeAmount, ID]
        );
        return deleteLike;
    } catch (error) {
        throw new Error('Error removing like from database: ' +error);
    }
}

/********************* REPLY **************************/

// Delete reply by postID
const deleteReply = async (data) =>{
    try{
        const dbcon = await dbPromise();
        await dbcon.get(
            `DELETE FROM reply WHERE replyID = ?`, [data]
        );
        await dbcon.get(
            `DELETE FROM likes WHERE replyID = ?`, [data]
        );
    } catch (err){
        throw new Error ('Error from database.js:' + err);
    }
}

const createReply = async (data) => {
    try {
        const dbCon = await dbPromise();
        const reply = await dbCon.run(
            `INSERT INTO reply (postID, username, reply) VALUES (?,?,?)`, [data.postID, data.username, data.reply]
        );
        return reply;
    } catch (err) {
        throw new Error("Error adding Reply to database: " + err);
    }
}

const getRepliesByPostID = async (data) => {
    try {
        const dbCon = await dbPromise();
        const replies = await dbCon.all(
            `SELECT * FROM reply WHERE postID like ?`, [data]
        );
        return replies;
    } catch (err) {
        throw new Error("Error getting shitaced XD from database: " + err);
    }
}

const getRepliesByID = async (replyID) => {
    try {
        const dbCon = await dbPromise();
        const reply = await dbCon.get("SELECT * FROM reply WHERE replyID = ?", [replyID]
        );
        return reply;
    } catch (err) {
        throw new Error("Error getting Reply by ID: " + err);
    }
};

const getReplies = async () => {
    try {
        const dbcon = await dbPromise();
        const replies = await dbcon.all(
            "SELECT * FROM reply ORDER BY replyID DESC"
        );
        return replies;
    } catch (err) {
        throw new Error('Error getting replies: ' + err);
    }
}

const editReply = async(data) => {
    try{
        console.log('Data in database: ' + JSON.stringify(data));
        const dbcon = await dbPromise();
        const editReply = await dbcon.get(
            "UPDATE reply SET reply = ? WHERE replyID = ?", [data.reply, data.replyID]
        );
        return editReply;    
    }catch(err){
        throw new Error('Error editing reply: ' + err);
    }
    
}

/**************** SORTING *****************/
const sortByUser = async (user)=>{
    try{
        const dbcon = await dbPromise();
        const getPosts = await dbcon.all(
            "SELECT * FROM post where username = ?",[user]
        )
        return getPosts
    }catch(err){
        throw new Error('Error: ' + err);
    }
}

const sortByCategory = async (category)=>{
    try{
        const dbcon = await dbPromise();
        const getPosts = await dbcon.all(
            "SELECT * FROM post where category = ?",[category]
        )
        return getPosts
    }catch(err){
        throw new Error('Error: ' + err);
    }
}



// * EXPORT
module.exports = {
    // * All user exports
    addUser: addUser,
    getUserByUsername: getUserByUsername,
    getUserId: getUserId,
    getUserData: getUserData,
    getFullUser: getFullUser,
    updateUser: updateUser,
    // * All Post exports
    like: like,
    dislike: dislike,
    createPost: createPost,
    getPosts: getPosts,
    getPostByID: getPostByID,
    deletePostByID: deletePostByID,
    updatePostByID: updatePostByID,
    duplicate: duplicate,
    // * All Reply exports
    editReply: editReply,
    createReply: createReply,
    getRepliesByPostID: getRepliesByPostID,
    getRepliesByID: getRepliesByID,
    getReplies: getReplies,
    deleteReply: deleteReply,
    // * Sorting Exports
    sortByUser: sortByUser,
    sortByCategory: sortByCategory
};
