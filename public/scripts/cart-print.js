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
