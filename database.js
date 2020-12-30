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

// TOPIC

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
            "SELECT * FROM post ORDER BY postID ASC"
        );
        return posts;
    } catch (err) {
        throw new Error("Error getting Comments from database: " + err);
    }
};

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
};
