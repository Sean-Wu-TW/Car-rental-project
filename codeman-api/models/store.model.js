const mongoose = require('mongoose');
// let Vehicle = require('../models/vehicle.model').schema;
const Schema = mongoose.Schema;


const storeSchema = new Schema({
    storeName: { type: String, required: true, unique: true },
    storeAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: Number, required: true }
    },
    vehicleCapacity: { type: Number, required: true },
    currentVehicles: [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }]
});



const Store = mongoose.model('Store', storeSchema);

module.exports = Store;

