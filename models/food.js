const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ref: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["sweet", "salt", "drink"]
  },

  image: {
    type: String,
    default:
      "https://s1.qwant.com/thumbr/0x0/3/e/8b5fd9ae7e51dd55aa6fbf950c1ced02be5231151c4e0bfbd8178bb499dc61/default.png?u=http%3A%2F%2Fwww.visassimply.com%2Fwp-content%2Fthemes%2Fvisassimply%2Fimages%2Fdefault.png&q=0&b=1&p=0&a=1"
  }
});

productSchema.index({ ref: 1 }, { unique: true }); // ensure unique ref
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
