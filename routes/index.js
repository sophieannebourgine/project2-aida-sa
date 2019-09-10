const express = require("express");
const router = new express.Router();
const Food = require("../models/food");
const User = require("../models/User");

//------ HOMEPAGE

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

//-----------AFFICHER LES PRODUITS

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

// router.get("/signup", (req, res) => {
//   res.render("signup");
// });

// router.get("auth/signin", (req, res) => {
//   res.render("signin");
// });

router.get("/prod-manage", (req, res) => {
  Food.find()
    .then(dbRes => {
      res.render("products_manage", { food: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/user", (req, res) => {
  // User.find()
  //   .then(dbRes => {
  res.render("user");
  //   })
  //   .catch(dbErr => console.log(dbErr));
});

router.get("/cart", (req, res) => {
  // User.find()
  //   .then(dbRes => {
  res.render("cart");
  //   })
  //   .catch(dbErr => console.log(dbErr));
});
module.exports = router;
