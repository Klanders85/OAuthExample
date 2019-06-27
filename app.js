const express = require('express');
const app = express();

const mongoose = require('mongoose');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');


//set up view engine
app.set('view engine', 'ejs');

//set up routes
app.use('/auth', authRoutes);

//setup mongoDB
mongoose.connect(keys.mongoDB.workspaceLocation);
let db = mongoose.connection;

//routes
app.get('/', (req, res) => {
    res.render('home');
});


app.listen(3000, () => {
    console.log('app is awaiting requests on port 3000...');
});