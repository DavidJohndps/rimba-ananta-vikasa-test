const { model, Schema } = require("mongoose");

const transactionSchema = new Schema(
  {
    customer_username: { type: String, required: true },
    product_id: { type: [String], required: true },
    qty: { type: [Number], required: true },
    total_discount: { type: Number, required: true },
    total_harga: { type: String, required: true },
    total_bayar: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Transactions", transactionSchema);
