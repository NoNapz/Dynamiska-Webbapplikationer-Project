const express = require('express');
const router = require('express').Router();
const dbservice = require('./database');
const bcrypt = require('bcrypt');


// const validateUser = (fullname) =>{
//     regex = /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/;
//     return regex.test(fullname);
// }

const validateEmail = (email) =>{
    regex = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}



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
        // console.log(user);
        const us = await dbservice.addUser(user);
        res.send(user);
    }catch(err){
        res.send(err);
    }
})























module.exports = router;