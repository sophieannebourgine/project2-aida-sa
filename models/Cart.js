const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  label: {
    user_id: Schema.Types.ObjectId,
    content: [
      {
        prodId: {
          type: Schema.Types.ObjectId,
          ref: "Product"
        },
        qty: Number
      }
    ]
  }
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
