const router = require("express").Router();
let Vehicle = require("../models/vehicle.model");
let Store = require("../models/store.model");
var object = require("mongodb").ObjectID;

router.route("/").get((req, res) => {
  // Query parameters
  const pickUp = req.query.pickUp ?? null;
  const startTime = req.query.startTime ?? null;
  const endTime = req.query.endTime ?? null;
  const vehicleType = req.query.vehicleType ?? null;

  // TODO: filter results based on query parameters

  // TODO: Add pickup location to Vehicle model?

  Vehicle.find()
    .then((vehicles) => res.json(vehicles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
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

  const info = {
    vehicleType,
    model,
    make,
    year,
    color,
    mileage,
    VIN,
    condition,
    serviceRecords,
    plate,
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
    endDate,
  };

  const newVehicle = new Vehicle({
    basicInfo,
    location,
    price,
    rentalStatus,
  });

  newVehicle
    .save()
    .then(() => res.json("Vehicle added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").put((req, res) => {
  Vehicle.findById(req.params.id)
    .then((vehicle) => {
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

      const info = {
        vehicleType,
        model,
        make,
        year,
        color,
        mileage,
        condition,
        serviceRecords,
        plate,
      };

      let isRented = Boolean(req.body.isRented);
      let startDate = Date.parse(req.body.startDate);
      let endDate = Date.parse(req.body.endDate);

      const rentalStatus = {
        isRented,
        startDate,
        endDate,
      };

      vehicle.rentalStatus = rentalStatus;
      vehicle.basicInfo = info;
      vehicle.location = req.body.location;
      vehicle.price = Number(req.body.price);

      Vehicle.updateOne({ _id: object(req.params.id) }, { $set: vehicle })
        .then(() => res.json("Vehicle updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Vehicle.findByIdAndDelete({ _id: object(req.params.id) }, function (
    err,
    response
  ) {
    if (err) throw err;
    Store.delete(
      { currentVehicles: req.params.id },
      { $pullAll: { currentVehicles: object(req.params.id) } }
        .then(() => res.json("Vehicle deleted."))
        .catch((err) => res.status(400).json("Error: " + err))
    );
  });
});

router.route("/:id").get((req, res) => {
  Vehicle.findById(req.params.id)
    .then((vehicle) => res.json(vehicle))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
