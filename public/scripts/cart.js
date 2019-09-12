// const foodModel = require("../models/food");
// const cartModel = require("../models/Cart");

const ironCart = (function() {
  "use strict";
  console.log("hello");

  function updateCart() {
    // nombre d'article dans le panier
    const cartCount = Number(
      document.getElementById("quantity-total").textContent
    );
    // sélection de la qantité d'un produit
    const valToAdd = Number(document.getElementById("main_qty").value);
    //addition de la quantité ajouté et de celle présente dans le panier
    const newQty = cartCount + valToAdd;
    const prodId = document.getElementById("prod_id").value;
    document.getElementById("quantity-total").textContent = newQty;
    updateDatabase(prodId, valToAdd);
  }

  // function totalPrice() {
  //   var priceElement = document.getElementsByClassName("price_cart");
  //   var totalQtyElement = document.getElementsByClassName("qty_cart");
  //   var priceValue = Number(priceElement.textContent.split("")[1]);
  //   var qtyValue = totalQtyElement.textContent.split("");
  // console.log(priceValue);
  // console.log(qtyValue[qtyValue.length - 1]);
  //   var total = priceValue * Number(qtyValue[qtyValue.length - 1]);
  //   console.log("total", total);
  //   return total;
  // }
  // console.log(totalPrice);
  // totalPrice();

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

window.addEventListener("DOMContentLoaded", ironCart.start);

// .populate
