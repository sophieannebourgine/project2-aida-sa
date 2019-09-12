// const foodModel = require("../models/food");
// const cartModel = require("../models/Cart");

function getCartInfoFromDB() {
  axios
    .post("/auth/cartInfos")
    .then(serverResp => {
      console.log(serverResp);
      let qty = 0;
      for (let i = 0; i < serverResp.data.content.length; i++) {
        qty += serverResp.data.content[i].qty;
      }
      document.getElementById("quantity-total").textContent = qty;
    })
    .then(Err => console.log(Err));
}

getCartInfoFromDB();

// window.addEventListener("DOMContentLoaded", ironCart.start);

// .populate
