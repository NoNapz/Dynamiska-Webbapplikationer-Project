// const { request, response } = require("express");
// const express = require("express");
// const dbservice = require("../../database");
// const router = express.Router();
// const bcrypt = require("bcrypt");

// // * Sign up and Hashing password
// router.post("/signup", async (req, res) => {
//     try {
//         const salt = await bcrypt.genSalt(10)
//         const hashPW = await bcrypt.hash(req.body.password, salt);
//         const user = {
//             username: req.body.username,
//             email: req.body.email,
//             name: req.body.name,
//             password: hashPW
//         };
//         await dbservice.addUser(user);
//     } catch(err) {
//         res.status(500).send(err);
//     }
// });


// router.post('/login', async(req, res) =>{
//     try{
//         const flag = await dbservice.getUserByUsername(req.body.username);
//         if(!flag){
//             return res.send({ERROR: 'invalid Username'});
//         }else{
//             if(await bcrypt.compare(req.body.password, flag.password)){
//                 res.send({SUCCESS: `Logged in as ${flag.username}`});
//             }else{
//                 res.send({ERROR: 'Username and password does not match'});
//             }   
//         }
//     }
//     catch(err){
//         res.send('xD');
//     }
// });

// module.exports = router;
