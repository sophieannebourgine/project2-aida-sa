const ironCart = (function() {
  "use strict";

  var productList;

  function appendProduct(infos) {
    // step 1 : create all row elements
    const row = document.createElement("div");
    const image = document.createElement("span");
    const name = document.createElement("span");
    const ref = document.createElement("span");
    const price = document.createElement("span");
    const quantityLabel = document.createElement("span");
    const quantity = document.createElement("input");
    const quantityTotal = document.createElement("span");

    const priceTotal = document.createElement("span");
    const button = document.createElement("button");
    const qty = 1;
    // step 2 : setup row's elements
    quantity.type = "number";
    row.className = "row product";
    label.className = "label";
    label.textContent = infos.name;
    price.className = "unit-price";
    price.textContent = infos.price;
    quantityLabel.className = "quantity";
    quantityLabel.textContent = "QUANTITY";
    quantity.className = "input quantity";
    quantity.value = quantity;
    quantity.min = 0;
    quantity.oninput = updateRowPrice;
    quantityTotal.className = "total-quantity";

    priceTotal.className = "total-price";
    quantityTotal.textContent = `$${quantity * infos.quantity}`;

    priceTotal.textContent = `$${quantity * infos.price}`;
    button.className = "btn delete";
    button.textContent = "delete";
    button.onclick = deleteProduct;
    // step 3 : add extra markup
    price.innerHTML = `<span class="currency">$</span><span class="val">${infos.price}</span>`;
    // build a product row
    row.appendChild(image);
    row.appendChild(name);
    row.appendChild(ref);
    row.appendChild(price);
    row.appendChild(quantityLabel);
    row.appendChild(quantity);
    row.appendChild(quantityTotal);
    row.appendChild(priceTotal);
    row.appendChild(button);
    productList.appendChild(row);
  }

  function updateCart() {
    const cartCount = Number(
      document.getElementById("quantity-total").textContent
    );
    const valToAdd = Number(document.getElementById("main_category").value);
    const newQty = cartCount + valToAdd;
    const prodId = document.getElementById("prod_id").value;
    document.getElementById("quantity-total").textContent = newQty;
    updateDatabase(prodId, newQty);
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

  function createProduct(evt) {
    evt.preventDefault(); // prevents page refresh on form submission
    const nameElement = document.getElementById("product_stock");
    //   const stockElement = document.getElementById("new_product_quantity");
    const refElement = document.getElementById("product_ref");

    const priceElement = document.getElementById("product_price");

    if (productList.children[0].className === "empty-cart")
      productList.innerHTML = "";

    appendProduct({
      name: nameElement.value,
      price: Number(priceElement.value)
    });
    updateTotalPrice();
  }

  function deleteProduct(evt) {
    const target = evt.target || evt.srcElement;
    target.parentElement.remove();
    if (productList.children.length === 0)
      productList.innerHTML = '<span class="empty-list">No products yet</span>';
    updateTotalPrice();
  }

  function updateTotalPrice() {
    const totalEl = document.getElementById("price_total");
    const rowTotalEls = [...document.querySelectorAll(".row .total-price")];

    totalEl.textContent = rowTotalEls.reduce(
      (acc, el) => acc + Number(el.textContent.slice(1)),
      0
    );
  }

  function updateTotalQuantity() {
    const totalEl = document.getElementById("quantity_total");
    const rowTotalEls = [...document.querySelectorAll(".row .total-quantity")];

    totalEl.textContent = rowTotalEls.reduce(
      (acc, el) => acc + Number(el.textContent.slice(1)),
      0
    );
  }

  function updateRowPrice(e) {
    const quantity = e.target || e.srcElement;
    const priceEl = quantity.parentElement.querySelector(".unit-price");
    const totalEl = quantity.nextElementSibling;
    const priceU = Number(priceEl.textContent.slice(1));
    totalEl.textContent = `$${priceU * quantity.value}`;
    updateTotalPrice();
  }

  function start() {
    // there is only one 'load' event per document
    productList = document.getElementById("list_products");
    document.getElementById("btn_add_cart").onclick = updateCart;
  }

  return { start };
})();

window.addEventListener("DOMContentLoaded", ironCart.start);
