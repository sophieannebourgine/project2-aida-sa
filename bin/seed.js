const foodModel = require("../models/food");
const products = require("./products.json");

console.log(products);

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
insertProducts(products); // add all products
// deleteAllProducts(); // remove all products
