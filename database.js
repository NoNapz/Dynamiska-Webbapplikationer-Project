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
        console.log(data);
        const dbCon = await dbPromise();
        const user = await dbCon.run(
            `INSERT INTO users (username, email, name, password) 
            VALUES (?,?,?,?)`,
            [data.username, data.email, data.name, data.password]
        );
        console.log('Worked');
        // return user;
    } catch (err) {
        throw new Error("Error adding User to database: " + err);
    }
};

const getUserByUsername = async (data) => {
    try {
        const dbCon = await dbPromise();
        const user = await dbCon.get(
            "SELECT username, password FROM users WHERE username = ?",
            [data]
        );
        return user;
    } catch (err) {
        throw new Error("Error getting User with Username: " + err);
    }
}

// * EXPORT
module.exports = {
    // * All user exports
    addUser: addUser,
    getUserByUsername: getUserByUsername,
    // * All comment exports
};