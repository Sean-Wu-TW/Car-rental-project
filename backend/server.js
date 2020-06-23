require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');


mongoose.set('useFindAndModify', false);

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

// Passport Config
require('../config/passport')(passport);



// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.use(cors());
app.use(express.json());


console.log("uri: ", process.env.ATLAS_URI);

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


// Routes
const storesRouter = require('./routes/stores');

const vehiclesRouter = require('./routes/vehicles');
const adminRouter = require('./routes/admin');

app.use('/', require('./index.js'));
app.use('/stores', storesRouter);

app.use('/vehicles', vehiclesRouter);
app.use('/admin', adminRouter);

//TEST for userProfile page
app.get('/getUserInfo', function (req, res) {
  var userInfo = {
    name: "Peter",
    bio: "my name is Peter",
    img: "https://bootdey.com/img/Content/avatar/avatar7.png"
  };
  res.json(userInfo);
});
// end of test user profile page

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


