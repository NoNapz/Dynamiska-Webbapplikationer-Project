const port = 8000;
const express = require('express');
const app = express();
const router = require('./routes');
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.use('/', router);

app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server listening to ${port}`);
    }
})