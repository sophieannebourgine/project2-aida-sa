require("dotenv").config();
require("./config/mongodb"); // database initial setup
require("./utils/helpers-hbs"); // utils for hbs templates

// base dependencies
const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require("cookie-parser");

// initial config
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 160000000 }, // in millisec
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    saveUninitialized: true,
    resave: true
  })
);

app.locals.site_url = process.env.SITE_URL;
// used in front end to perform ajax request (var instead of hardcoded)

// CUSTOM MIDDLEWARE
// check if user is logged in...
// usecases : conditional display in hbs templates
// WARNING: this function must be declared AFTER the session setup
// WARNING: this function must be declared BEFORE app.use(router(s))
function checkloginStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null;
  // access this value @ {{user}} or {{user.prop}} in .hbs
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  res.locals.isAdmin =
    res.locals.isLoggedIn && req.session.currentUser.role === "admin";
  // access this value @ {{isLoggedIn}} in .hbs
  next(); // continue to the requested route
}

function eraseSessionMessage() {
  var count = 0; // initialize counter in parent scope and use it in inner function
  return function(req, res, next) {
    if (req.session.msg) {
      // only increment if session contains msg
      if (count) {
        // if count greater than 0
        count = 0; // reset counter
        req.session.msg = null; // reset message
      }
      ++count; // increment counter
    }
    next(); // continue to the requested route
  };
}

function setCurrentUser(req, res, next) {
  if (req.session.currentUser) {
    res.locals.user = req.session.currentUser;
  }
  res.locals.user = null;
  next();
}
app.use(setCurrentUser);
app.use(checkloginStatus);
app.use(eraseSessionMessage());

hbs.registerHelper("total", function(foods) {
  let total = 0;
  foods.forEach(food => {
    total += food.prodId.price * food.qty;
  });
  return total;
});

// Getting/Using router(s)

const basePageRouter = require("./routes/index");
app.use("/", basePageRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const productsAddRouter = require("./routes/dashboard_food");
app.use("/products", productsAddRouter);

const listener = app.listen(process.env.PORT, () => {
  console.log(`app started at ${process.env.SITE_URL}:${process.env.PORT}`);
});
