const express = require('express');
const router = require('express').Router();
const dbservice = require('./database');
const bcrypt = require('bcrypt');


const validateUser = (name) =>{
    regex = /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/;
    return regex.test(name);
}

const validateEmail = (email) =>{
    regex = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

router.put('/update', async (req, res) =>{
    const salt = await bcrypt.genSalt(10);
    const hashp = await bcrypt.hash(req.body.password, salt);
    const id = req.body.id;
    const updatedUser = {
        username : req.body.username,
        email: req.body.email,
        name : req.body.name,
        password: hashp
    }
    try{
        const us = await dbservice.editUser(updatedUser, id);
        res.send('User updated: ' + updatedUser);
    }catch(err){
        res.send('Problems updating user: ' + err);
    }
})
router.delete('/confirm', async (req, res) => {
    try{
        const us = await dbservice.deleteUser(req.body);
        res.send('user deleted.');
    }catch(err){
        res.send('Error deleting user: ' + err);
    }

});
router.post('/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashp = await bcrypt.hash(req.body.password, salt);
    const user = {
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        password: hashp
    }
    try{
        const nameValid = validateUser(user.name);
        console.log(nameValid);
        if(!user.username || !user.email || !user.name){
            res.send('Please enter valid credentials');
        }else{
            if(nameValid){
                const us = await dbservice.addUser(user);
                res.send(user);
            }else{
                res.send('Please enter a valid name/email')
            }
        }
    }catch(err){
        res.send('Error: ' + err);
    }
})























module.exports = router;