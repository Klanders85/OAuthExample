const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');


//set up view engine
app.set('view engine', 'ejs');

//set up cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//init Passport
app.use(passport.initialize());
app.use(passport.session());

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