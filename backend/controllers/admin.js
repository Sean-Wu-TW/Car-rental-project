const Admin = require('../models/admin.model');

var JWT = require('jsonwebtoken');
var User = require('../models/user')


var { JWS_SECRET } = require('../configuration')
var jwtDecode = require('jwt-decode');



//function to generate token using JWT library with secret from configuration/index.js file
signToken = (user) => {
    console.log(user)
    return JWT.sign({
        iss: 'CodemanRental',
        sub: user.id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
    }, JWS_SECRET);
}


module.exports = {


    // handle signup action
    signUp: async (req, res, next) => {

        // get user's input Email & Paswword from request body
        var { email, firstname, lastname, password, resaddre, city, license_state, license_number, card_number, card_holder } = req.body;


        // console.log(req.body);
        // check if there is a user with the same email
        var foundUser = await User.findOne({ "email": email });

        if (foundUser) {
            return res.status(403).json({ error: 'Email is already existed' });
        }

        //manully assgin membership start time and end time
        var membershipStarts = new Date();
        var membershipEnds = new Date(membershipStarts.getFullYear(), membershipStarts.getMonth(), membershipStarts.getDay());
        //create a new user
        var newUser = new User({
            email: email,
            resaddre: resaddre,
            firstname: firstname,
            lastname: lastname,
            password: password,
            resaddre: resaddre,
            city: city,
            driver_license: { license_state, license_number },
            credit_card: { card_number, card_holder },
            membership: {
                valid: true,
                starts: membershipStarts,
                ends: membershipEnds
            },
            reservations: []
        });

        await newUser.save();


        //Generate the token
        var token = signToken(newUser);
        //Respond with token
        res.status(200).json({ token });
    },



    //handle signIn
    signIn: async (req, res, next) => {
        //generate token
        var token = signToken(req.user)
        console.log('Successful login!');
        res.status(200).json({ token });
    },



    secret: async (req, res, next) => {


        var user_id = jwtDecode(req.body.jwt_token)
        var user = await User.findById(user_id.sub);
        res.json({ user });
    },



    reservations: async (req, res, next) => {

        var user_id = jwtDecode(req.body.jwt_token)
        var user = await User.findById(user_id.sub);

        // var reservations = user

        console.log(user)

        res.status(200);
    },


    //handle getprofile
    getProfile: async (req, res, next) => {

        var { email } = req.body;
        var getUserProfile = await User.findOne({ "email": email });

    }

}