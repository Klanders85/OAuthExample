const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');


//set up view engine
app.set('view engine', 'ejs');

//set up routes
app.use('/auth', authRoutes);

//routes
app.get('/', (req, res) => {
    res.render('home');
});


app.listen(3000, () => {
    console.log('app is awaiting requests on port 3000...');
});