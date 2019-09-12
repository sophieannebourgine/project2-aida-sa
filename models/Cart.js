const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  content: [
    {
      prodId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      qty: Number
    }
  ]
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
