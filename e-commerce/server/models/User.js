const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const cardScehema = mongoose.Schema({
  cardName: { type: String },
  cardNumber: { type: String },
  ccv: { type: String },
  cardLastDate: { type: String },
});

const addressScehema = mongoose.Schema({
  addressName: { type: String },
  phone: { type: String },
  country: { type: String },
  city: { type: String },
  district: { type: String },
  street: { type: String },
  postalCode: { type: String },
});

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },

  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  basket: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],

  addresses: [addressScehema],
  card: [cardScehema],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
