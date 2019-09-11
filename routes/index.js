const express = require("express");
const router = new express.Router();
const foodModel = require("../models/food");
const User = require("../models/User");

//------ HOMEPAGE

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

//-----------AFFICHER LES PRODUITS PAR PAGE

router.get("/one-product/:id", (req, res) => {
  foodModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("one_product", { food: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});

//------------ADD TO CART

router.post("/one-product/:id", (req, res) => {
  foodModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("cart", { food: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});

//-------------- EDITER PRODUITS

router.get("/prod-manage", (req, res) => {
  foodModel
    .find()
    .then(dbRes => {
      res.render("products_manage", { food: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/product-edit/:id", (req, res) => {
  foodModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("product_edit", { food: dbRes });
    })
    .catch(dbErr => console.log(dbErr));
});

router.post("/prod-edit/:id", (req, res) => {
  const { name, ref, description, price, stock, category } = req.body;
  const editItem = {
    name,
    ref,
    description,
    price,
    stock,
    category
  };
  foodModel
    .findByIdAndUpdate(req.params.id, editItem)
    .then(dbRes => res.redirect("/prod-manage"))
    .catch(err => console.log(err));
});

//-------------- SUPPRIMER PRODUITS

router.get("/delete/:id", (req, res) => {
  foodModel
    .findByIdAndRemove(req.params.id)
    .then(dbRes => res.redirect("/prod-manage"))
    .catch(err => console.log(err));
});

//------------USER PROFILE PAGE

router.get("/user", (req, res) => {
  // User.find()
  //   .then(dbRes => {
  res.render("user");
  //   })
  //   .catch(dbErr => console.log(dbErr));
});

//------------CART PAGE

router.get("/cart", (req, res) => {
  // User.find()
  //   .then(dbRes => {
  res.render("cart");
  //   })
  //   .catch(dbErr => console.log(dbErr));
});

module.exports = router;
