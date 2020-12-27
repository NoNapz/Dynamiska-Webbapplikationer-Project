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
        const users = await dbCon.run(
            `INSERT INTO users (username, email, name, password) VALUES (?,?,?,?)`,
            [data.username, data.email, data.name, data.password]
        );
        return users;
    } catch (err) {
        throw new Error("Error adding User to database: " + err);
    }
};

// * EXPORT
module.exports = {
    // * All user exports
    addUser: addUser,
    // * All comment exports
};