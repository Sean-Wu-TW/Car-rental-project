const router = require('express').Router();
let Store = require('../models/store.model');
var object = require('mongodb').ObjectID;


router.route('/').get((req, res) => {
  Store.find()
    .then(stores => res.json(stores))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

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
});

router.route('/update/:id').post((req, res) => {
  Store.findById(req.params.id)
    .then(store => {
      if(req.body.storeName){store.storeName = req.body.storeName.toLowerCase()}
      if(req.body.street){store.storeAddress.street = req.body.street.toLowerCase()}
      if(req.body.city){store.storeAddress.city = req.body.city.toLowerCase()}
      if(req.body.state){store.storeAddress.state = req.body.state.toLowerCase()}
      if(req.body.zip){store.storeAddress.zip = Number(req.body.zip)}
      if(req.body.currentVehicles){store.currentVehicles = req.body.currentVehicles}
      if(req.body.vehicleCapacity){store.vehicleCapacity = Number(req.body.vehicleCapacity)}


      Store.updateOne({ "_id": object(req.params.id) }, { $set: store })
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