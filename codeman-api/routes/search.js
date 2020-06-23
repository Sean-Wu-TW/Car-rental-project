const router = require('express').Router();
let Store = require('../models/store.model');
var object = require('mongodb').ObjectID;
let Vehicle = require('../models/vehicle.model');


//search vehicle by its type
router.route('/vehicles/type').get((req, res) => {
  const type = req.body.type.toLowerCase();
  Vehicle.find({ "vehicleType": type })
    .then(vehicles => res.json(vehicles))
    .catch(err => res.status(400).json('Error: ' + err));
});

// query vehicles that are available
router.route('/vehicles/avail').post((req, res) => {
  Vehicle.find({ "rentalStatus.isRented": false })
    .then(vehicles => res.json(vehicles))
    .catch(err => res.status(400).json('Error: ' + err));
});

// query vehicles that have start date less than req.body.date
router.route('/vehicles/lessStartDate').post((req, res) => {
  const date = req.body.date;
  Vehicle.find({ "rentalStatus.startDate": { $lte: new Date(date) } })
    .then(vehicles => res.json(vehicles))
    .catch(err => res.status(400).json('Error: ' + err));
});

// query vehicles that have end date within 24 hours
router.route('/vehicles/endDateNow').post((req, res) => {
  Vehicle.find({ "rentalStatus.endDate": { $gte: new Date().getTime(), $lte: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)) } })
    .then(vehicles => res.json(vehicles))
    .catch(err => res.status(400).json('Error: ' + err));
});
// search store by its zipcode
router.route('/stores/zip').get((req, res) => {
  const zip = req.body.zip;
  Store.find({ "storeAddress.zip": Number(zip) })
    .then(stores => res.json(stores))
    .catch(err => res.status(400).json('Error: ' + err));
});

// search store by its storeName
router.route('/store').post((req, res) => {
  Store.find({"storeName": req.body.location.toLowerCase()})
    .then(store => res.json(store))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;