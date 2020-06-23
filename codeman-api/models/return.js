var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var returnScheme = new Schema({
    userID: { type: String, required: true },
    vehicle_id: { type: String, required: true },
    reservation_id: String,
    rentalFee: Number,
    latefee: Number
});




var Return = mongoose.model('return', returnScheme);
module.exports = Return;