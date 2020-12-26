const express = require('express');

const server = express();
const port = 8000;

server.get('/', (req,res) => {
    res.send('Hello Retards');
});

server.listen(port,()=>{
    console.log("listen to port " + port)
});