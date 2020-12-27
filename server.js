const { request, response, static } = require("express");
const express = require("express");
const server = express();
const PORT = process.env.port || 8000;
const bodyParser = require("body-parser");
const users = require("./routes/api/users.js");

//Body parse (MW)
server.use(express.json());
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/api/users", users);

server.get('/', (req, res) => {
    res.send('Oh, hello.');
});

server.listen(PORT, (err) => {
    err ? console.log("PORT Error") : console.log(`Server started on ${PORT}`);
});

module.exports = server;