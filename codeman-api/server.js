require("dotenv").config();
var express = require("express");
var morgan = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();
const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

console.log("uri: ", process.env.ATLAS_URI);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes

//user routes
app.use("/users", require("./routes/users"));
app.use("/stores", require("./routes/stores"));
app.use("/vehicles", require("./routes/vehicles"));
app.use("/admin", require("./routes/admin"));
app.use("/search", require("./routes/search"));

// For health check
app.route("/").get((req, res) => {
  res.status(200).json({ status: "OK" });
});

//starts the server
app.listen(port, function () {
  console.log("Codeman-api server listening at port: ", port);
});
