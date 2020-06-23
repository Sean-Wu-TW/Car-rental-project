const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var object = require('mongodb').ObjectID;
// Load User model
const Admin = require('../models/admin.model');
let Vehicle = require('../models/vehicle.model');
let Store = require('../models/store.model');
const adminController = require('../controllers/admin');
const { forwardAuthenticated, ensureAuthenticated } = require('../../config/auth');



//
router.route('/get').post( passportJWT, adminController.adminGetList);

router.route('/login').post( passportSignIn, adminController.adminLogin);

// Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true
  })(req, res, next);
});

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    Admin.findOne({ email: email }).then(admin => {
      if (admin) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newAdmin = new Admin({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/admin/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/admin/login');
});










// Operations to Vehicles

router.route('/vehicles/').get(ensureAuthenticated, (req, res) => {
  Vehicle.find()
    .then(vehicles => res.json(vehicles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/vehicles/add').post(ensureAuthenticated, (req, res) => {
  const vehicleType = req.body.vehicleType;
  const model = req.body.model;
  const make = req.body.make;
  const year = Number(req.body.year);
  const color = req.body.color;
  const mileage = Number(req.body.mileage);
  const VIN = req.body.VIN;
  const condition = req.body.condition;
  const serviceRecords = req.body.serviceRecords;
  const plate = req.body.plate;

  const info = {vehicleType, model, make, year, color, mileage, 
    VIN, condition, serviceRecords, plate
      }; 

  const isRented = Boolean(req.body.isRented);
  const startDate = Date.parse(req.body.startDate);
  const endDate = Date.parse(req.body.endDate);

  const basicInfo = info;
  const location = req.body.location;
  const price = Number(req.body.price);

  const rentalStatus = {
    isRented,
    startDate,
    endDate
  };

  const newVehicle = new Vehicle({
    basicInfo,
    location,
    price,
    rentalStatus,
  });
  
  newVehicle.save()
    .then(() => res.json('Vehicle added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/vehicles/update/:id').post(ensureAuthenticated ,(req, res) => {
  Vehicle.findById(req.params.id)
    .then(vehicle => {
      let vehicleType = req.body.vehicleType;
      let model = req.body.model;
      let make = req.body.make;
      let year = Number(req.body.year);
      let color = req.body.color;
      let mileage = Number(req.body.mileage);
      //let VIN = req.body.VIN;
      let condition = req.body.condition;
      let serviceRecords = req.body.serviceRecords;
      let plate = req.body.plate;

      const info = {vehicleType, model, make, year, color, mileage, condition, serviceRecords, plate
          }; 

      let isRented = Boolean(req.body.isRented);
      let startDate = Date.parse(req.body.startDate);
      let endDate = Date.parse(req.body.endDate);

      const rentalStatus = {
        isRented,
        startDate,
        endDate
      };

      vehicle.rentalStatus = rentalStatus;
      vehicle.basicInfo = info;
      vehicle.location = req.body.location;
      vehicle.price = Number(req.body.price);


      Vehicle.updateOne({"_id": object(req.params.id) }, { $set: vehicle })
        .then(() => res.json('Vehicle updated!' + vehicle))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/vehicles/:id').delete(ensureAuthenticated, (req, res) => {
  Vehicle.findByIdAndDelete(req.params.id)
    .then(() => res.json('Vehicle deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/vehicles/:id').get(ensureAuthenticated, (req, res) => {
  Vehicle.findById(req.params.id)
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(400).json('Error: ' + err));
});











// Stores Operation
router.route('/stores').get(ensureAuthenticated,(req, res) => {
  Store.find()
  .then(stores => res.json(stores))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/stores/add').post(ensureAuthenticated,(req, res) => {
    
  const storeName = req.body.storeName;
  const street = req.body.street;
  const city = req.body.city;
  const state = req.body.state;
  const zip = Number(req.body.zip);
  const vehicleCapacity = Number(req.body.vehicleCapacity);
  const currentVehicles = [];

  const storeAddress = { street, city, state, zip};

  const newStore = new Store({
      storeName,
      storeAddress,
      vehicleCapacity,
      currentVehicles
  });

  newStore.save()
  .then(() => res.json('Store added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/stores/:id').delete((req, res) => {
  Store.findByIdAndDelete(req.params.id)
      .then(() => res.json('Store deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/stores/:id').get((req, res) => {
    Store.findById(req.params.id)
      .then(store => res.json(store))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/stores/update/:id').post((req, res) => {
    Store.findById(req.params.id)
      .then(store => {
      let storeName = req.body.storeName;
  
      let street = req.body.street;
      let city = req.body.city;
      let state = req.body.state;
      let zip = Number(req.body.zip);
      let vehicleCapacity = Number(req.body.vehicleCapacity);
  
      let storeAddress = { street, city, state, zip};
  
      store.storeName = storeName
      store.storeAddress = storeAddress
      store.vehicleCapacity = vehicleCapacity
  
      Store.updateOne({"_id": object(req.params.id) }, { $set: store })
      .then(() => res.json('Store updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
      })
    .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
