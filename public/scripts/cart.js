// const foodModel = require("../models/food");
// const cartModel = require("../models/Cart");

const ironCart = (function() {
  "use strict";

  function updateCart() {
    // nombre d'article dans le panier
    const cartCount = Number(
      document.getElementById("quantity-total").textContent
    );
    // sélection de la qantité d'un produit
    const valToAdd = Number(document.getElementById("main_qty").value);
    //addition de la quantité ajouté et de celle présente dans le panier
    const prodId = document.getElementById("prod_id").value;
    document.getElementById("quantity-total").textContent =
      cartCount + valToAdd;
    updateDatabase(prodId, valToAdd);
  }

  function totalPrice() {
    var price = document.getElementsById("price_cart");
    var total_qty = document.getElementsById("qty_cart");
  }

  function updateDatabase(prodId, qty) {
    axios
      .patch("/cart", { prodId, qty })
      .then(APIRes => {
        console.log(APIRes);
      })
      .catch(APIErr => {
        console.error(APIErr);
      });
  }

  function start() {
    document.getElementById("btn_add_cart").onclick = updateCart;
  }
  return { start };
})();

// .populate
