const { request, response, static } = require("express");
const express = require("express");
const session = require("express-session");
const router = express.Router();
const server = express();
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dbservice = require("./database");

//Body parse (MW)
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(__dirname + '/public'));
server.use(session({ secret: "ssshhhhh",
resave: false,
saveUninitialized: false }));

let sess;

router.get('/', (req, res) => {
    sess = req.session;
    if (sess.username) {
        return res.redirect('/index.html');
    }
    res.sendFile('index.html');
});

router.post('/login', async (req, res) => {
    try {
        sess = req.session;
        sess.username = req.body.username;
        const flag = await dbservice.getUserByUsername(req.body.username);
        if (!flag) {
            return res.send({ ERROR: 'invalid Username' });
        } else {
            if (await bcrypt.compare(req.body.password, flag.password)) {
                res.redirect('/index.html');
            } else {
                res.send({ ERROR: 'Username and password does not match' });
            }
        }
    }
    catch(err) {
        console.log(err);
        res.send(err, 'xD');
    }
});

router.post("/signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPW = await bcrypt.hash(req.body.password, salt);
        const user = {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            password: hashPW,
        };
        await dbservice.addUser(user);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        // res.status(500).send(err);
    }
});

router.get('/getUser', async (req, res)=>{
    try{
        
    }catch(err){

    }
})




// router.get("/home", (req, res) => {
//     sess = req.session;
//     if (sess.username) {
//         res.write(`<h1>Hello ${sess.username} </h1><br>`);
//         res.end("<a href=" + "/logout" + ">Logout</a>");
//     } else {
//         res.write("<h1>Please login first.</h1>");
//         res.end("<a href=" + "/" + ">Login</a>");
//     }
// });

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

server.use('/', router);

server.listen(PORT, (err) => {
    err ? console.log("PORT Error") : console.log(`Server started on ${PORT}`);
});


module.exports = server;