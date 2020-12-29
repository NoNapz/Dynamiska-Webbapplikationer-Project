const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { respone } = require('express');

const dbPromice = (async () =>{
    return open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
})();


const addUser = async (data) => {

    try{

        const dbcon = await dbPromice;
        console.log(data.username);
        const user = await dbcon.run(
            "INSERT INTO users (username, email, name, password) VALUES (?,?,?,?)", [data.username, data.email, data.name, data.password]);
            
            return user;

    }catch(err){
        throw new Error('Error: ' + err);
    }
};

const deleteUser = async (data) =>{
    try{
        const dbcon = await dbPromice;
        await dbcon.get('DELETE FROM users WHERE id = ?', [data.id]);
    }catch(err){
        return new Error('Error Deleting user: ' + err);
    }
}

const editUser = async (data, id) => {
    try{
        const dbcon = await dbPromice;
        await dbcon.get('UPDATE users SET username=?, email=?, name=?, password=? WHERE id=?', [data.username, data.email, data.name, data.password, id])
    }catch(err){
        throw new Error('Error updating user: ' + err);
    }
}

module.exports = {
    addUser: addUser,
    deleteUser: deleteUser,
    editUser: editUser
}