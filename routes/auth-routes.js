const router = require('express').Router();
const passport = require('passport');

//auth login route
router.get('/login', (req, res) => {
    res.render('login');
});

//auth logout
router.get('/logout', (req, res) => {
    //handle with Passport.js
    res.send('Loggin you out of the Google.')
})

//auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for Google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('you have reached the callback URI');
});


module.exports = router;