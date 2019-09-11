const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require("../models/User");
const Cart = require("../models/Cart");

//------ SIGN UP

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  if (firstname === "" || password === "") {
    res.render("signup", { msg: { text: "This email adress is already use" } });
    return;
  }
  User.findOne({ firstname: firstname }).then(user => {
    if (user !== null) {
      res.render("signup", { msg: { text: "Incorrect email or password" } });
      return;
    }
  });

  const salt = bcrypt.genSaltSync(bcryptSalt);
  console.log("----->", password);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({
    firstname,
    lastname,
    email,
    password: hashPass
  })
    .then(newUser => {
      console.log(newUser);
      console.log("newUser");
      console.log("----------");

      Cart.create({
        user_id: newUser._id,
        content: []
      })
        .then(newCart => {
          console.log("newCart");
          console.log(newCart);
          res.redirect("/");
        })
        .catch(cartErr => {
          console.log(cartErr);
        });
    })
    .catch(error => {
      console.log(error);
    });
});

//------ SIGN IN

router.get("/signin", (req, res, next) => {
  res.render("signin");
});

router.post("/signin", (req, res, next) => {
  const theEmail = req.body.email;
  const thePassword = req.body.password;

  if (theEmail === "" || thePassword === "") {
    res.render("signin", {
      msg: { text: "Please enter both, username and password to sign up." }
    });
    return;
  }

  User.findOne({ email: theEmail })
    .then(user => {
      if (!user) {
        res.render("signin", {
          msg: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;

        res.redirect("/");
      } else {
        res.render("signin", { msg: { text: "Incorrect password" } });
      }
    })
    .catch(error => {
      next(error);
    });
});

//----- LOG OUT

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    // can't access session here
    res.redirect("/auth/signin");
  });
});

module.exports = router;
