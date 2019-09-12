// const btnBasket = document.getElementById("fa-shopping-cart");
// const addToCart = document.getElementById("btn_add_cart");
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

// const cartBtn = document.getElementById("checkout");
// const cartDetails = document.getElementById("cart-details");
// const recapCart = document.getElementById("cart-small-summary");
//  // evt.preventDefault();
//  // console.log("recap cart");
//  // console.log(recapCart)
//  if (localStorage.getItem("currentCart")){
//    var checkedOutCart = JSON.parse(localStorage.getItem("currentCart"));
//    var cartProducts = checkedOutCart.productsInKart;
//    recapCart.innerHTML = [nb items : ${checkedOutCart.nbItems} | ${checkedOutCart.totalPrice} €]
//    cartDetails.innerHTML = "";
//    cartProducts.forEach(food => {
//      cartDetails.innerHTML +=`
//      <div class="one-product-cart">
//          <div class="product-img">
//            <img src="${food.image}" alt="what a nice pair of kicks">
//          </div>
//          <div>
//            <p class="product-name">${food.name}</p>
//            <p class="product-size">Size: ${food.ref}</p>
//            <label for="product-qty">Quantity</label>
//            <div class ="product-qty" id = "product-qty">
//              <input type="number" value="${food.stock}">
//            </div>
//            <p class="product-price">Total: ${Number(food.price)*Number(food.stock)} €</p>
//          </div>
//          </div>`
//    });
//  }
