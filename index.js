const express = require('express');

const axios = require('axios');

const port = 8005;
// const db=require('./config/mongoose');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./config/mongoose');

const app = express();
var expressLayouts = require('express-ejs-layouts');
app.use(express.static('assets'));

var bodyParser = require('body-parser')


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressLayouts);








app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routes'));


app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);
    
})