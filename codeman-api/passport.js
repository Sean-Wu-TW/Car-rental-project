var passport = require('passport');
var JwTstrategy = require('passport-jwt').Strategy;
var LocalStorage = require('passport-local').Strategy;
var { ExtractJwt } = require('passport-jwt');
var { JWS_SECRET } = require('./configuration');
var User = require('./models/user');
var Admin = require('./models/admin.model');



//JSON WEB TOKENS STRATEGY
passport.use('jwt', new JwTstrategy({
    jwtFromRequest: ExtractJwt.fromBodyField('jwt_token'),
    secretOrKey: JWS_SECRET
}, async (payload, done) => {
    try {
        console.log("payload: ", payload)
        // Find the user specified in token
        // payload.sub = user ID in our mongoDB
        var user = await User.findById(payload.sub);

        console.log("user: ", user)

        //If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        //otherwise, return the user 
        done(null, user);

        //req.user
    } catch (error) {
        done(error, false);
    }
}));


// LOCAL STRATEGY for user
passport.use('user', new LocalStorage({
    usernameField: 'email'

}, async (email, password, done) => {
    try {
        console.log('I am here', email);
        console.log('email', email);

        //Find the user given the email
        var user = await User.findOne({ "email": email });

        console.log('user', user);
        //if not, handler it
        if (!user) {
            return done(null, false);
        }
        //check if the password is correct
        var isMatch = await user.isValidPassword(password);

        console.log('isMatch', isMatch);
        //if not, handle it
        if (!isMatch) {
            return done(null, false);
        }
        //Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}))

// LOCAL STRATEGY for admin
passport.use('admin', new LocalStorage({
    usernameField: 'email'
}, async (email, password, done) => {
    try {

        //Find the user given the email
        var admin = await Admin.findOne({ "email": email });

        //if not, handler it
        if (!admin) {
            return done(null, false);
        }
        //check if the password is correct
        var isMatch = await admin.isValidPassword(password);

        console.log('isMatch', isMatch);
        //if not, handle it
        if (!isMatch) {
            return done(null, false);
        }
        //Otherwise, return the admin
        console.log('admin', admin);
        done(null, admin);
    } catch (error) {
        done(error, false);
    }
}))
