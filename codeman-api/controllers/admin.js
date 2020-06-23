var JWT = require('jsonwebtoken');
var User = require('../models/user')
var JWT = require('jsonwebtoken');
var { JWS_SECRET } = require('../configuration')
var jwtDecode = require('jwt-decode');
var mongoose = require('mongoose');
const Admin = require('../models/admin.model');
const Vehicle = require('../models/vehicle.model');
const Store = require('../models/store.model');
const Return = require('../models/return');
var object = require('mongodb').ObjectID;



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
adminSignToken = (admin) => {
  console.log("this is adminSignToken", admin)
  return JWT.sign({
    iss: 'CodemanRental',
    sub: admin.id,
    iat: new Date().getTime(), //current time
    exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
  }, JWS_SECRET);
}


module.exports = {

  // returns all the admins
  adminGetList: (req, res) => {
    Admin.find()
      .then(admins => res.json(admins))
      .catch(err => res.status(400).json('Error: ' + err));
  },

  adminLogin: (req, res) => {
    var token = adminSignToken(req.user);
    console.log('Successful login!');
    res.status(200).json({ token });
  },

  getInfo: async (req, res, next) => {
    console.log(req.body)
    var admin_id = jwtDecode(req.body.jwt_token)
    console.log("admin_id", admin_id)

    // var admin = await Admin.findById(object(admin_id));
    // res.status(200).json({ admin });
  },


  adminSignUp: (req, res) => {
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
    }
    else {
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
              if (err) { throw err };
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
  },
  adminLogOut: (req, res) => {
    // not implemented
  },
  getVehicles: (req, res) => {
    Vehicle.find()
      .then(vehicles => res.json(vehicles))
      .catch(err => res.status(400).json('Error: ' + err));
  },
  addVehicles: (req, res) => {
    const vehicleType = req.body.vehicleType.toLowerCase();
    const model = req.body.model.toLowerCase();
    const make = req.body.make.toLowerCase();
    const year = Number(req.body.year);
    const color = req.body.color.toLowerCase();
    const mileage = Number(req.body.mileage);
    const VIN = req.body.VIN;
    const condition = req.body.condition.toLowerCase();
    const serviceRecords = req.body.serviceRecords;
    const plate = req.body.plate;
    const img = req.body.img;

    const info = {
      vehicleType, model, make, year, color, mileage,
      VIN, condition, serviceRecords, plate, img
    };

    const isRented = Boolean(req.body.isRented);
    const startDate = Date.parse(req.body.startDate);
    const endDate = Date.parse(req.body.endDate);

    const basicInfo = info;
    // find location

    let location = req.body.location.toLowerCase();
    // buggy
    //var storeid = await Store.find({ "storeName": location }).select("_id").exec();
    const price = Number(req.body.price);

    const rentalStatus = {
      isRented,
      startDate,
      endDate,
    };

    const newVehicle = new Vehicle({
      basicInfo,
      location,
      price,
      rentalStatus,
    });


    Store.updateOne(
      { "storeName": req.body.location.toLowerCase() },
      { $addToSet: { "currentVehicles": object(newVehicle._id) } }).exec();

    newVehicle.save()
      .then(() => res.json("Vehicle added."))
      .catch((err) => res.status(400).json("Error: " + err));
  },
  updateVehicle: (req, res) => {
    Vehicle.findById(req.params.id)
      .then(vehicle => {
        if (req.body.vehicleType) { vehicle.basicInfo.vehicleType = req.body.vehicleType.toLowerCase(); }
        if (req.body.model) { vehicle.basicInfo.model = req.body.model.toLowerCase(); }
        if (req.body.make) { vehicle.basicInfo.make = req.body.make.toLowerCase(); }
        if (req.body.year) { vehicle.basicInfo.year = Number(req.body.year); }
        if (req.body.color) { vehicle.basicInfo.color = req.body.color.toLowerCase(); }
        if (req.body.mileage) { vehicle.basicInfo.mileage = Number(req.body.mileage); }
        //if(req.body.VIN){vehicle.basicInfo.VIN = req.body.VIN;}
        if (req.body.condition) { vehicle.basicInfo.condition = req.body.condition.toLowerCase(); }
        if (req.body.serviceRecords) { vehicle.basicInfo.serviceRecords = req.body.serviceRecords; }
        //buggy
        if (req.body.location) { vehicle.location = req.body.location.toLowerCase(); }
        //
        if (req.body.price) { vehicle.price = Number(req.body.price); }

        if (req.body.plate) { vehicle.basicInfo.plate = req.body.plate; }
        if (req.body.isRented) { vehicle.rentalStatus.isRented = Boolean(req.body.isRented); }
        if (req.body.startDate) { vehicle.rentalStatus.startDate = Date.parse(req.body.startDate); }
        if (req.body.endDate) { vehicle.rentalStatus.endDate = Date.parse(req.body.endDate); }


        Vehicle.updateOne({ "_id": object(req.params.id) }, { $set: vehicle })
          .then(() => {
            res.json('Vehicle updated!');
          })
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  },
  deleteVehicle: (req, res) => {
    Store.updateOne(
      { "currentVehicles": req.body.id },
      { $pullAll: { "currentVehicles": [object(req.body.id)] } }).exec()

    Vehicle.findByIdAndDelete(req.body.id)
      .then(() => res.json('Vehicle deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));

  },
  peekVehicle: (req, res) => {
    Vehicle.findById(req.body.id)
      .then(vehicle => res.json(vehicle))
      .catch(err => res.status(400).json('Error: ' + err));
  },
  getStores: (req, res) => {
    Store.find()
      .then(stores => res.json(stores))
      .catch(err => res.status(400).json('Error: ' + err));
  },
  addStore: (req, res) => {

    const storeName = req.body.storeName.toLowerCase();
    const street = req.body.street.toLowerCase();
    const city = req.body.city.toLowerCase();
    const state = req.body.state.toLowerCase();
    const zip = Number(req.body.zip);
    const vehicleCapacity = Number(req.body.vehicleCapacity);
    const currentVehicles = [];

    const storeAddress = { street, city, state, zip };

    const newStore = new Store({
      storeName,
      storeAddress,
      vehicleCapacity,
      currentVehicles
    });

    newStore.save()
      .then(() => res.json('Store added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  },
  deleteStore: (req, res) => {
    Store.findByIdAndDelete(req.body.id)
      .then(() => res.json('Store deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  },
  //chekck a storeby it's id
  peekStore: (req, res) => {
    Store.findById(req.body.id)
      .then(store => res.json(store))
      .catch(err => res.status(400).json('Error: ' + err));
  },
  // updates store by id
  updateStore: (req, res) => {
    Store.findById(req.params.id)
      .then(store => {
        if (req.body.storeName) { store.storeName = req.body.storeName.toLowerCase() }
        if (req.body.street) { store.storeAddress.street = req.body.street.toLowerCase() }
        if (req.body.city) { store.storeAddress.city = req.body.city.toLowerCase() }
        if (req.body.state) { store.storeAddress.state = req.body.state.toLowerCase() }
        if (req.body.zip) { store.storeAddress.zip = Number(req.body.zip) }
        if (req.body.currentVehicles) { store.currentVehicles = req.body.currentVehicles }
        if (req.body.vehicleCapacity) { store.vehicleCapacity = Number(req.body.vehicleCapacity) }


        Store.updateOne({ "_id": object(req.params.id) }, { $set: store })
          .then(() => res.json('Store updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  },
  // returns returned cars
  returnCars: (req, res) => {
    Return.find()
      .then(returns => res.json(returns))
      .catch(err => res.status(400).json('Error: ' + err));
  },

  //reassignVehicle to location
  reassignVehicle: (req, res) => {
    var location = req.body.location;
    Store.updateOne(
      { currentVehicles: req.params.id },
      { $pullAll: { currentVehicles: [object(req.params.id)] } }
    ).exec();
  
    Vehicle.findById(req.params.id)
      .then(vehicle => {
        Store.updateOne(
          { "storeName": location.toLowerCase() },
          { $addToSet: { "currentVehicles":object(req.params.id) } }).exec()
  
        Vehicle.updateOne({ "_id": object(req.params.id) }, { $set: { "location": location.toLowerCase() } })
          .then(() => res.json('Vehicle updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
}