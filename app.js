const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', function(){
    console.log('Connected to database '+config.database);
});

const app = express();

const users = require('./routes/users');

const port = 3000;

// cors middleware to connect between frontend and backend
app.use(cors());

// Set Static folder (Angular 2 files)
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.json());

app.use('/users', users); // any thing with url /users/something

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// route to the index
app.get('/', function(req, res){
    res.send('Invalid Endpoint');
});

app.listen(port, function(){
    console.log("Server started at port: "+port);
});