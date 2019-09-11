const ironCart = (function() {
  "use strict";

  function updateCart() {
    const cartCount = Number(
      document.getElementById("quantity-total").textContent
    );
    const valToAdd = Number(document.getElementById("main_category").value);
    const newQty = cartCount + valToAdd;
    const prodId = document.getElementById("main_category").value;
    document.getElementById("quantity-total").textContent = newQty;
    updateDatabase(prodId, newQty);
  }

  // cartCount.ironCart.push({ content, prodId, qty });
  // let CartStored = localStorage.getItem("cartCount");
  // if (CartStored == null) {
  //   localStorage.setItem("cartCount", JSON.stringify(cartCount));
  // } else {
  //   const obj = JSON.parse(CartStored);
  //   obj.nbItems += 1;
  //   obj.totalPrice += cartCount.totalPrice;
  //   obj.ironCart.push(cartCount.ironCart[0]);
  //   localStorage.setItem("cartCount", JSON.stringify(obj));
  // }

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

// const btnBasket = document.getElementById("fa-shopping-cart");
// const addToCart = document.getElementById("add-to-cart");
// const elementQty = document.getElementById("product-qty");
// const cartBtn = document.getElementById("checkout");
// addToCart.onclick = evt => {
//   // const elementQty = document.getElementById ("product-qty");
//   var currentCart = {
//     nbItems: 0,
//     totalPrice: 0,
//     productsInKart: []
//   };
//   evt.preventDefault();
//   const elementRef = document.getElementById("product-ref");
//   const elementPrice = document.getElementById("product-price");
//   const productSize = document.getElementById("main-size");
//   const productId = document.getElementById("one-product");
//   const productName = document.getElementById("product-name");
//   const productImg = document.getElementById("product-img");
//   currentCart.nbItems += 1;
//   currentCart.totalPrice += Number(elementPrice.innerHTML.replace(" €", ""));

// };
