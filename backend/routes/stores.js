const router = require('express').Router();
let Store = require('../models/store.model');
var object = require('mongodb').ObjectID;


router.route('/').get((req, res) => {
    Store.find()
    .then(stores => res.json(stores))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    
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

router.route('/update/:id').post((req, res) => {
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

router.route('/:id').delete((req, res) => {
  Store.findByIdAndDelete(req.params.id)
      .then(() => res.json('Store deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/:id').get((req, res) => {
    Store.findById(req.params.id)
      .then(store => res.json(store))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;