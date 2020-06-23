var express = require('express');
var router = require('express-promise-router')();
var UserController = require('../controllers/users');
var { validateBody, schemas } = require('../helpers/routeHelper');
var passport = require('passport');
var passportConf = require('../passport');
var passportUserSignIn = passport.authenticate('user', { session: false });
var passportJWT = passport.authenticate('jwt', { session: false });



//user auth system
router.route('/signup').post(validateBody(schemas.signupAuthSchema), UserController.signUp);
router.route('/login').post(validateBody(schemas.loginAuthSchema), passportUserSignIn, UserController.signIn);




//user operations
router.route('/myprofile').post(passportJWT, UserController.getProfile);

router.route('/vehicles/reserve').post(passportJWT, UserController.reserveCar);
router.route('/vehicle/cancle').post(passportJWT, UserController.cancleReservation);
router.route('/myprofile/reservations').post(passportJWT, UserController.getMyReservationList);
router.route('/myprofile/complete').post(passportJWT, UserController.completeReservation);











module.exports = router;
