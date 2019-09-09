const express = require("express");
const router = new express.Router();
const Food = require("../models/food");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

//-----------AFFICHER LES PRODUITS

router.get("//:cat", (req, res) => {
  if (req.params.cat == "all") {
    Food.find()
      .then(dbRes => {
        res.render("products", { food: dbRes });
      })
      .catch(dbErr => console.log(dbErr));
  } else {
    Food.find({ category: req.params.cat })
      .then(dbRes => {
        res.render("products", { food: dbRes });
      })
      .then(dbErr => console.log(dbErr));
  }
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.get("/prod-manage", (req, res) => {
  Food.find()
    .then(dbRes => {
      res.render("products_manage", { food: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});

module.exports = router;
