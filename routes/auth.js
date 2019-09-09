const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const User = require("../models/User");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  if (firstname === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }
  User.findOne({ firstname: firstname }).then(user => {
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists!"
      });
      return;
    }
  });

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.create({
    firstname,
    lastname,
    email,
    password: hashPass
  })
    .then(() => {
      res.redirect("/");
    })
    .catch(error => {
      console.log(error);
    });
});

//signin

router.get("/signin", (req, res, next) => {
  res.render("auth/signin");
});

router.post("/signin", (req, res, next) => {
  const theEmail = req.body.email;
  const thePassword = req.body.password;

  if (theEmail === "" || thePassword === "") {
    res.render("auth/signin", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ email: theEmail })
    .then(user => {
      if (!user) {
        res.render("auth/signin", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("auth/signin", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(err => {
    // can't access session here
    res.redirect("/signin");
  });
});

module.exports = router;
