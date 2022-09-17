const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    ktp: { type: String, required: true },
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Users", userSchema);
