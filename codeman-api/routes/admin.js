const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const adminController = require('../controllers/admin');
var passportJWT = passport.authenticate('admin-jwt', { session: false });
var passportSignIn = passport.authenticate('admin', { session: false });


// Admin
router.route('/get').post(passportJWT, adminController.adminGetList);
router.route('/login').post(passportSignIn, adminController.adminLogin);
router.route('/info').post(passportJWT, adminController.getInfo);
router.route('/register').post(passportSignIn, adminController.adminSignUp);
router.route('/logout').post(passportJWT, adminController.adminLogOut);

// Operations to Vehicles
router.route('/vehicles').post(passportJWT, adminController.getVehicles);
router.route('/vehicles/add').post(passportJWT, adminController.addVehicles);
router.route('/vehicles/update').post(passportJWT, adminController.updateVehicle);
router.route('/vehicles/delete').post(passportJWT, adminController.deleteVehicle);
router.route('/vehicles/peek').post(passportJWT, adminController.peekVehicle);
router.route('/vehicles/reassign').post(passportJWT, adminController.reassignVehicle);

// Store Op
router.route('/stores').post(passportJWT, adminController.getStores);
router.route('/stores/add').post(passportJWT, adminController.addStore);
router.route('/stores').post(passportJWT, adminController.getStores);
router.route('/stores/delete').post(passportJWT, adminController.deleteStore);
router.route('/stores/peek').post(passportJWT, adminController.peekStore);
router.route('/stores/update').post(passportJWT, adminController.updateStore);

// Car list
router.route('/returnCars').post(passportJWT, adminController.returnCars);


module.exports = router;
