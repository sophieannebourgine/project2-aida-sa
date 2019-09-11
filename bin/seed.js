const foodModel = require("../models/food");
const cloudinary = require("./../config/cloudinary");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/food", { useNewUrlParser: true });

const products = [
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  },
  {
    name: "",
    ref: "",
    descrption: "",
    price: "",
    stock: "",
    category: "", //sweet salt ou drink
    image: ""
  }
];

function insertProducts() {
  foodModel
    .insertMany(products)
    .then(dbRes => console.log(dbRes))
    .catch(dbErr => console.log(dbErr));
}

function deleteAllProducts() {
  foodModel
    .remove()
    .then(dbRes => console.log(dbRes))
    .catch(dbErr => console.log(dbErr));
}

// run this file ONCE with : node bin/seed.js
insertProducts(); // add all products
// deleteAllProducts(); // remove all products
