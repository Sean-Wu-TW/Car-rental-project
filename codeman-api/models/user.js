var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;


//create a schema

var userScheme = new Schema({
    password: { type: String, required: true, trim: true },

    email: { type: String, required: true, trim: true },

    resaddre: { type: String, required: true, trim: true },

    driver_license: {
        license_state: { type: String, required: true, trim: true },
        license_number: { type: String, required: true, trim: true }
    },
    credit_card: {
        card_number: { type: String, required: true, trim: true },
        card_holder: { type: String, required: true, trim: true }
    },
    membership: {
        valid: { type: Boolean, required: true },
        aotuSubscription: { type: Boolean, require: true },
        starts: { type: Date, required: true },
        ends: { type: Date, required: true },
    },
    feeOwned: { type: Number, required: true },
    reservations: { type: Object }
});


//hash password before store into our database
userScheme.pre('save', async function (next) {
    try {
        //generate a salt
        var salt = await bcrypt.genSalt(10);
        //generate a password hash(salt + hash)
        var passwordHash = await bcrypt.hash(this.password, salt);
        //re-assign hashed version over original, plain text password
        this.password = passwordHash;

        next();
    } catch (error) {
        next(error);
    }
});


userScheme.methods.isValidPassword = async function (newPassword) {
    try {
        console.log('this.password', this.password);
        console.log('newPassword', newPassword);
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}

//create a model
var User = mongoose.model('user', userScheme);
// Export the model
module.exports = User;
