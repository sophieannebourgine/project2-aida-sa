const express = require("express");
const router = new express.Router();
const Food = require("../models/food");

//------ HOMEPAGE

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

//-----------AFFICHER LES PRODUITS

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/prod-add", (req, res) => {
  res.render("products_add");
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

module.exports = router;
