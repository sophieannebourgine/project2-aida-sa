const express = require("express");
const router = new express.Router();
const foodModel = require("../models/food");
const userModel = require("../models/User");
const cartModel = require("../models/Cart");

//------ HOMEPAGE

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

//-----------AFFICHER LES PRODUITS PAR PAGE

router.get("/one-product/:id", (req, res) => {
  foodModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("one_product", { food: dbRes, scripts: ["cart.js"] });
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

router.patch("/cart", (req, res) => {
  const userID = req.session.currentUser._id;
  cartModel
    .updateOne({ user_id: userID }, { $push: { content: req.body } })
    .then(dbRes => {
      console.log("here", dbRes);
    })
    .catch(err => {
      console.log(err);
    });
  res.send("it's ok");
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
  // console.log(res.locals.user);
  res.render("user");
});

// router.get("/user", (req, res) => {
//   userModel
//     .find()
//     .then(dbRes => {
//       res.render("user", { user: dbRes });
//     })
//     .catch(dbErr => console.log(dbErr));
// });

// router.get("/user/:id", (req, res) => {
//   userModel
//     .findById(req.params.id)
//     .then(dbRes => {
//       res.render("user", { user: dbRes });
//     })
//     .catch(dbErr => console.log(dbErr));
// });

router.post("/user", (req, res) => {
  console.log(req.session.currentUser);
  const { firstname, lastname, email, role } = req.body;
  const editUser = {
    firstname,
    lastname,
    email
  };
  userModel
    .findByIdAndUpdate(req.session.currentUser._id, editUser, {
      new: true
    })
    .then(dbRes => {
      req.session.currentUser = dbRes;
      res.locals.user = dbRes;
      res.redirect("/user");
    })
    .catch(err => console.log(err));
});
//------------CART PAGE

router.get("/cart", (req, res) => {
  const userID = req.session.currentUser._id;
  cartModel
    .findOne({ user_id: userID })
    .populate("content.prodId")
    .then(dbRes => {
      res.render("cart", { foods: dbRes.content, scripts: ["cart.js"] });
    })
    .catch(err => {
      console.log(err);
    });
});

<<<<<<< HEAD
//--------------CART VALIDATED PAGE
=======
>>>>>>> 6d8ca14229fe6d5ebe1617ce193d2b87d6d257a8
router.get(["/order-validated"], (req, res) => {
  res.render("order-validated");
});

module.exports = router;
