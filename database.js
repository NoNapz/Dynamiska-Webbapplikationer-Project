const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { respone } = require('express');

const dbPromice = (async () =>{
    return open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
});


const addUser = async (data) => {
       
    try{
        console.log(data);
        const dbcon = await dbPromice;
        const user = await dbcon.run(
            "INSERT INTO users (username, email, name, password) VALUES (?,?,?,?)", [data.username, data.email, data.name, data.password]);
            return user;

    }catch(err){
        throw new Error('Error: ' + err);
    }
}


module.exports = {
    addUser: addUser
}