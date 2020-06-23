var JWT = require("jsonwebtoken");
var User = require("../models/user");
var Return = require("../models/return");
var Vehicle = require("../models/vehicle.model");
var ObjectID = require("mongodb").ObjectID;

var { JWS_SECRET } = require("../configuration");
var jwtDecode = require("jwt-decode");

//function to generate token using JWT library with secret from configuration/index.js file
//function to generate token using JWT library with secret from configuration/index.js file
signToken = (user) => {
  console.log(user)
  return JWT.sign({
      iss: 'CodemanRental',
      sub: user.id,
      iat: new Date().getTime(), //current time
      exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
  }, JWS_SECRET);
}


module.exports = {
  // handle signup action
  signUp: async (req, res, next) => {

      // get user's input Email & Paswword from request body
      var { email, firstname, lastname, password, resaddre, city, license_state, license_number, card_number, card_holder, zip } = req.body;


      // console.log(req.body);
      // check if there is a user with the same email
      var foundUser = await User.findOne({ "email": email });

      if (foundUser) {
          return res.status(403).json({ error: 'Email is already existed' });
      }

      //manully assgin membership start time and end time
      var membershipStarts = new Date();
      var membershipEnds = new Date(membershipStarts.getFullYear(), membershipStarts.getMonth() + 6, membershipStarts.getDay());
      //create a new user
      var newUser = new User({
          email: email,
          firstname: firstname,
          lastname: lastname,
          password: password,
          resaddre: resaddre,
          city: city,
          zip: zip,
          driver_license: { license_state, license_number },
          credit_card: { card_number, card_holder },
          membership: {
              valid: true,
              starts: membershipStarts,
              ends: membershipEnds
          },
          feeOwned: 0,
          reservations: {}
      });

      await newUser.save();

      //Generate the token
      var token = signToken(newUser);

      //Respond with token
      res.status(200).json({ token });
  },

  //handle signIn
  signIn: async (req, res, next) => {
      //generate token
      var token = signToken(req.user)
      console.log('Successful login!');
      res.status(200).json({ token });
  },

  /** 
   *  handle user request for profile
   * client should send data{
   *      jwt_token:""   
   *   
   * }
   * */

  getProfile: async (req, res, next) => {

      console.log(req.body.jwt_token)

      var user_id = jwtDecode(req.body.jwt_token)
      console.log("user_id: ", user_id)

      var user = await User.findById(user_id.sub);

      console.log("user: ", user)
      res.status(200).json({ user });
  },

  /** 
   * 
   * hander user reserve car request
   * client should send post request with data{
   *      jwt_token:"",
   *      car_id:"",
   *      start_year:"",
   *      start_month:"",
   *      start_date:"",
   *      start_hour:""
   *   
   *     
   *   
   * }
   * */
  reserveCar: async (req, res, next) => {

      //decode jwttoken&get user id
      var jwt = jwtDecode(req.body.jwt_token)
      var vehicleID = req.body.car_id;
      var userID = jwt.sub;
      var reservationStarts = new Date(req.body.start_year, req.body.start_month - 1, req.body.start_date, req.body.start_hour);
      var rentHours = req.body.hours;
      console.log(reservationStarts)




      var vehicle = await Vehicle.findById(vehicleID);
      console.log("vehicle: ", vehicle)
      // get user carId
      var objectId = new ObjectID();
      var reservation = {
          reservationID: objectId,
          details: {
              starts: reservationStarts,
              rentHours: rentHours,
              vehicle: vehicle,
              createAt: new Date()
          }
      }

      // console.log("This is reservation: ", reservation)

      //add reservation to to user's reservation list
      await User.findByIdAndUpdate(userID,
          { $push: { reservations: reservation } },
          { safe: true, upsert: true }
      );


      //update vehicle's status
      await Vehicle.findByIdAndUpdate(vehicleID,
          { $set: { "rentalStatus.isRented": true } },
          { safe: true, upsert: true }
      );

      res.status(200).json({ Message: "Success" });


  },




  /*
      halder user's  reservation action
      need client to data {
              jwt_token:"",
              reservation_id:""
      }
  */
  cancleReservation: async (req, res, next) => {

      var user_id = jwtDecode(req.body.jwt_token)
      var user = await User.findById(user_id.sub)
      var reservations = user.reservations;
      var reservation_starts, reservation_create;

      console.log(reservations)
      reservations.forEach(reservation => {
          if (reservation.reservationID.equals(req.body.reservation_id)) {
              reservation_starts = reservation.details.starts;
              reservation_create = reservation.details.createAt;

          }

      });

      const diffhours = Math.abs(reservation_starts - reservation_create) / 36e5;



      if (diffhours < 24) {
          return res.status(403).json({ error: 'Cancellation should be make 24 hours before reservation starts' });
      }

      await User.update(
          { _id: ObjectID(user_id.sub) },
          { $pull: { reservations: { reservationID: ObjectID(req.body.reservation_id) } } }
      );
      res.status(200).json({ Message: "Cancellation made successful" });

  },




  /*
  halder user's  get all reservation action
  need client to data {
          jwt_token:""
          reservation_id:""
  }
*/
  completeReservation: async (req, res, next) => {

      var jwt = jwtDecode(req.body.jwt_token)
      var userID = jwt.sub;
      var reservation_id = req.body.reservation_id;

      var reservation = await User.findById(userID, {
          reservations: {
              $elemMatch: {
                  "reservationID": ObjectID(reservation_id)
              }
          }
      })

      var rentalHours = reservation.reservations[0].details.rentHours;
      var vehicle_id = reservation.reservations[0].details.vehicle._id;
      var price = reservation.reservations[0].details.vehicle.price;
      var reservation_ends = reservation.reservations[0].details.starts;
      reservation_ends.setTime(reservation_ends.getTime() + (rentalHours * 60 * 60 * 1000));

      var current = new Date();
      const exceedHours = (current - reservation_ends) / 36e5;
      var lateFee = 0;

      var rentalFee = rentalHours * price;
      if (exceedHours > 0) {
          lateFee = Math.round(exceedHours * price);
      }

      console.log("lateFee: ", lateFee)
      console.log("vehicle_id: ", vehicle_id)

      //1.push info about reservation  into return list wait for admin's review for later fee
      var newReturn = new Return({
          userID: userID,
          vehicle_id: vehicle_id,
          reservation_id: reservation_id,
          rentalFee: rentalFee,
          latefee: lateFee
      });
      newReturn.save();

      //2.update vehicle rental status
      await Vehicle.findByIdAndUpdate(vehicle_id,
          { $set: { "rentalStatus.isRented": false } },
          { safe: true, upsert: true }
      );

      //3.remove from user's reservation list
      await User.updateOne(
          { _id: ObjectID(userID) },
          { $pull: { reservations: { reservationID: ObjectID(reservation_id) } } }
      );


      res.status(200).json({ Message: "Return completed" });
  },



  /*
      halder user's  get all reservation action
      need client to data {
              jwt_token:""
      }
  */
  getMyReservationList: async (req, res, next) => {

      var user_id = jwtDecode(req.body.jwt_token)
      var user = await User.findById(user_id.sub);

      if (!user) {
          return res.status(404);
      }
      res.status(200).json(user.reservations);
  }










}
