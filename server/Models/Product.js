const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    isKg: { type: Boolean, required: true, default: 0 },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = model("Transactions", productSchema);
