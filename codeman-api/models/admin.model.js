const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});


adminSchema.methods.isValidPassword = async function (newPassword) {
  try {
    console.log('this.password', this.password);
    console.log('newPassword', newPassword);


    return await newPassword === this.password;
  } catch (error) {
    throw new Error(error);
  }
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;