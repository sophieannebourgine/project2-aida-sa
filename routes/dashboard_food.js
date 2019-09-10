const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const foodModel = require("../models/food");
const cloudinary = require("./../config/cloudinary");

//AFFICHER TOUS LES PRODUITS ET SELON CATEGORIES

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.get("/:cat", (req, res) => {
  if (req.params.cat == "all") {
    foodModel
      .find()
      .then(dbRes => {
        res.render("products", { food: dbRes });
      })
      .catch(dbErr => console.log(dbErr));
  } else {
    foodModel
      .find({ category: req.params.cat })
      .then(dbRes => {
        res.render("products", { food: dbRes });
      })
      .then(dbErr => console.log(dbErr));
  }
});

//--------- PRODUCTS "ADD TO COLLECTION"

router.post("/prod-add", cloudinary.single("image"), (req, res) => {
  const name = req.body.name;
  const ref = req.body.ref;
  const description = req.body.description;
  const price = req.body.price;
  const category = req.body.category;

  if (!name || !ref || !price) {
    res.render("products_add", {
      errorMessage: "Name, Ref. and Price are required !"
    });
    return;
  }

  const newItem = {
    name,
    ref,
    description,
    price,
    category
  };
  if (req.file) newItem.image = req.file.secure_url;

  foodModel
    .create(newItem)
    .then(() => {
      return res.redirect("/products/all");
    })
    .catch(error => {
      console.log(error);
      res.render("products_add", {
        errorMessage: "Duplicate ref, please update form !"
      });
    });
});

module.exports = router;
