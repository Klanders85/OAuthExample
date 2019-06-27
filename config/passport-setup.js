const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');

passport.use(
    new GoogleStrategy(
        {
            //options for the Google strategy
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        (accessToken, refreshToken, profile, done) => {
            //passport callback function

            //create a new user to store in DB
            new User({
                googleId: profile.id,
                userName: profile.displayName
            }).save().then((newUser) => {
                console.log("New user " + newUser + " created");
            });
        }
    )
);