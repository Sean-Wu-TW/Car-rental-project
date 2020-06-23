const router = require("express").Router();
let Vehicle = require("../models/vehicle.model");
let Store = require("../models/store.model");
var object = require("mongodb").ObjectID;

router.route("/").get((req, res) => {
  // Query parameters
  const pickUp = req.query.pickUp ? req.query.pickUp : null;
  const startTime = req.query.startTime ? req.query.startTime : null;
  const endTime = req.query.endTime ? req.query.endTime : null;
  const vehicleType = req.query.vehicleType ? req.query.vehicleType : null;

  // TODO: filter results based on query parameters

  // TODO: Add pickup location to Vehicle model?

  Vehicle.find()
    .then((vehicles) => res.json(vehicles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route('/add').post((req, res) => {
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

});
router.route("/:id").put((req, res) => {
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
      if (req.body.location) { vehicle.location = req.body.location.toLowerCase(); }
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
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Store.updateOne(
    { currentVehicles: req.params.id },
    { $pullAll: { currentVehicles: [object(req.params.id)] } }
  ).exec();

  Vehicle.findByIdAndDelete(req.params.id)
    .then(() => res.json("Vehicle deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Vehicle.findById(req.params.id)
    .then((vehicle) => res.json(vehicle))
    .catch((err) => res.status(400).json("Error: " + err));
});



router.route("/re/:id").post((req, res) => {
  var location = req.body.location;
  Store.updateOne(
    { currentVehicles: req.params.id },
    { $pullAll: { currentVehicles: [object(req.params.id)] } }
  ).exec();

  Vehicle.findById(req.params.id)
    .then(vehicle => {
      Store.updateOne(
        { "storeName": location.toLowerCase() },
        { $addToSet: { "currentVehicles": object(req.params.id) } }).exec()

      Vehicle.updateOne({ "_id": object(req.params.id) }, { $set: { "location": location.toLowerCase() } })
        .then(() => res.json('Vehicle updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
