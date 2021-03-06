// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var mongo = require("mongodb");
var cookieParser = require("cookie-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var users = require("./routes/users");
var routes = require("./routes/index");
var roster = require("./routes/roster-routes");
var schedule = require("./routes/schedule-routes");
var blog = require("./routes/blog-routes");
var welcome = require("./routes/welcome-routes");
var announcements = require("./routes/announcement-routes");


var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));
app.use(cookieParser());

// -------------------------------------------------
// // MongoDB Configuration configuration ("mongodb://localhost/mundaneclub")
// mongoose.connect("mongodb://localhost/mundaneclub");
// //mongodb://joyoflife:juju2017jasper@ds113606.mlab.com:13606/mundaneclub
// var db = mongoose.connection;
// db.on("error", function(err) {
//   console.log("Mongoose Error: ", err);
// });
// db.once("open", function() {
//   console.log("Mongoose connection successful.");
// });

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://joyoflife:juju2017jasper@ds113606.mlab.com:13606/mundaneclub";

// Connect mongoose to our database
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.log(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});




// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// // -------------------------------------------------
console.log("server js ran");

app.get("/login", function(req, res) {
  console.log("yay!!!!");
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/user", function(req, res) {
  console.log('got the user from server js');
  res.sendFile(__dirname + "/public/index2.html");
});

app.use('/', routes);
app.use('/', users);
app.use('/', blog);
app.use('/', roster);
app.use('/', schedule);
app.use('/', announcements);
app.use('/', welcome);

// -------------------------------------------------
// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});



