const router = require('express').Router();
let Users = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth = require('../routes/auth');


router.route('/register').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const residence_addr = req.body.residence_addr;
  const license_state = req.body.license_state;
  const license_number = req.body.license_number;
  const card_number = req.body.card_number;
  const expire_date = req.body.expire_date;
  const card_holder = req.body.card_holder;

  const driver_license = {license_state, license_number};
  const credit_card = {card_number, expire_date, card_holder};

  const newUser = new Users({
    username,
    password,
    email,
    residence_addr,
    driver_license,
    credit_card
    //driver_license:{license_state, license_number},
    //credit_card:{card_number, expire_date, card_holder}
  });

  newUser.save()
  .then(() => res.json('New user created.'))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/updateProfile').put((req, res) => {
  Users.findOneAndUpdate({'username': req.body.username}, 
                        {$set: {'password': req.body.password,
                                'email': req.body.email, 
                                'residence_addr': req.body.residence_addr,
                                'driver_license.$.license_state': req.body.license_state,
                                'driver_license.$.license_number': req.body.license_number,
                                'credit_card.$.card_number': req.body.card_number,
                                'credit_card.$.expire_date': req.body.expire_date,
                                'credit_card.$.card_holder': req.body.card_holder }},
                        function(error, result){
                          if(error) {res.status(500); }
                          else { res.json('Profile is updated.'); }
                         } );
});


router.route('/login').post(async(req,res  ) => {
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password){
    return res.status(400).json({msg: 'Please enter all fields'});
  }
  try{
    let user = await Users.findOne({username});
    if(!user){
      return res.status(400).json({message: 'User not exist.'})
    }
    if(user.password != password){
      return res.status(400).json({message: 'Password not correct.'})
    }
  const jwtKey = 'secret_key';
  const jwtExpire = 3600;
  const token = jwt.sign({username}, jwtKey, {expiresIn: jwtExpire},
                          (error, token) => {
                            if(error) throw error;
                            res.json({
                              token
                            })
                          });
  } //end try
  catch{
    res.status(500).json({message: 'Invalid request.'})
  }
});

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;