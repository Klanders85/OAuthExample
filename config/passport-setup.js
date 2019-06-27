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
            //check if user already exists in the DB
            User.findOne({
                googleId: profile.id
            }).then((currentUser) => {
                if (currentUser) {
                    //already has a profile stored
                    console.log("Welcome back " + currentUser.userName + "!");
                } else {
                    //create a new user and store in DB
                    new User({
                        googleId: profile.id,
                        userName: profile.displayName
                    }).save().then((newUser) => {
                        console.log("New user " + newUser + " created");
                    });
                }
            });
        }
    )
);