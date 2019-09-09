const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Food = require("../models/food");
const uploader = require("./../config/cloudinary");

//--------- PRODUCTS ADD "ADD TO COLLECTION"
router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", uploader.single("image"), (req, res, next) => {
  const name = req.body.name;
  const ref = req.body.ref;
  // const sizes = req.body.sizes;
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
      return res.redirect("/cafe/all");
    })
    .catch(error => {
      console.log(error);
      res.render("products_add", {
        errorMessage: "Duplicate ref, please update form !"
      });
    });
});

module.exports = router;
