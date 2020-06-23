const mongoose = require('mongoose');
// let Store = require('../models/store.model').schema;
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    basicInfo:{
        vehicleType: { type: String, required: true, trim: true},
        model: { type: String, required: true}, 
        make: { type: String, required: true}, 
        year: { type: Number, required: true, trim: true}, 
        color: { type: String, required: true, trim: true}, 
        mileage: {type: Number, required: true, trim: true},
        VIN:{type: String, required: true, unique: true, trim: true},
        condition:{type: String, required: true, trim: true},
        serviceRecords:[{ body: String, date: Date }],
        plate:{type: String, required: true},
        img:{type: String}
    },
    
    location:{type: Schema.Types.ObjectId, ref:'Store'},
    price:{type: Number, required: true},
    rentalStatus:{
        isRented:{type: Boolean},
        startDate: { type: Date},
        endDate: { type: Date}
    }
}, {
  timestamps: true,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;