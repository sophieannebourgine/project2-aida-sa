const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Food = require("../models/food");
const uploader = require("./../config/cloudinary");

// AFFICHER TOUS LES PRODUITS

router.get("/", (req, res) => {
  Food.find()
    .then()
    .catch();
  res.render("all products");
  console.log("ici");
});

//AFFICHER PRODUIT SELON CATEGORIE

router.get("/:cat", (req, res) => {
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

//--------- PRODUCTS ADD "ADD TO COLLECTION"
router.post("/", uploader.single("image"), (req, res, next) => {
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

  if (req.file) {
    newItem.image = req.file.secure_url;
  } else {
    console.log("Problem");
  }

  Food.create(newItem)
    .then(() => {
      return res.redirect("/all");
    })
    .catch(error => {
      console.log(error);
      res.render("products_add", {
        errorMessage: "Duplicate ref, please update form !"
      });
    });
});

module.exports = router;
